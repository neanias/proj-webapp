import sys
import os
import json
import string

# Natural Language Toolkit Packages
from nltk import CFG, ChartParser, Tree
from nltk.tokenize import word_tokenize
from nltk.parse.generate import generate

def parse_blazon(blazon):
    blazon = blazon.lower()
    to_discard = set(string.punctuation)
    to_discard.remove("&")
    blazon = ''.join(c for c in blazon if c not in to_discard)
    # Convert raw data to tokens to be parsed
    tokens = word_tokenize(blazon)

    # Replace instances of '1st', '2nd', etc with their non abbreviated forms
    for (index, item) in enumerate(tokens):
        if (item in abbr_to_full):
            tokens[index] = abbr_to_full[item]
        elif (item == "&"):
            tokens[index] = "and"

    # Sanitise tokens
    tokens = disambiguate_colours(tokens)
    tokens = reorder(tokens)

    # Construct grammar and parser
    with open('app/parser_cfg.txt') as f:
        raw_cfg = f.read()

    parser_grammar = CFG.fromstring(raw_cfg)
    parser = ChartParser(parser_grammar)

    # Parse data into tree
    output_data = None
    for tree in parser.parse(tokens):
        output_data = tree

    if (output_data is None):
        print("Error: Parse failed, please check input is of correct format.")
    else:
	# Convert Tree to dict to prepare it for JSON serialisation
        output_data = tree_to_dict(output_data)
        # If a tincture is in the top level of the dictionary, change its name to "field"
        if ("tincture" in output_data.keys()):
            output_data["field"] = output_data["tincture"]
            output_data.pop("tincture")
        # Convert dict to JSON
        return (output_data)
    

def generate_blazons(grammarfile, n, depth = None):
    bs = []
    with open(grammarfile) as g:
        raw_cfg = g.read()
    parser_grammar = CFG.fromstring(raw_cfg)
    for blazon in generate(parser_grammar, n = n, depth = depth):
        bwords = blazon
        field = bwords[0]
        z =  ((isColour(field) and not any(map(isColour, bwords[1:]))) or
             (isMetal(field)  and not any(map(isMetal,  bwords[1:])))) and (field not in bwords[1:])
        if z:
            bs.append(' '.join(blazon))
    return bs    


def main():
    # Check arguments
    if (len(sys.argv) == 1):
        print("Too few arguments\nUsage: $ python generate.py <INPUT_FILE> [OUTPUT_FILE]")
        sys.exit(0)
    elif (len(sys.argv) > 3):
        print("Too many arguments\nUsage: $ python generate.py <INPUT_FILE> [OUTPUT_FILE]")
        sys.exit(0)

    # Initialise paths
    WORKING_DIR = sys.path[0]
    INPUT_FILE = os.path.join(WORKING_DIR, sys.argv[1])

    if (len(sys.argv) == 3):
        OUTPUT_FILE = os.path.join(WORKING_DIR, sys.argv[2])
    else:
        # Extract base filename of input file
        OUTPUT_NAME = os.path.basename(INPUT_FILE)
        # Strip off file extension and add own (.esc for escutcheon)
        OUTPUT_NAME = "trees/" + os.path.splitext(OUTPUT_NAME)[0] + ".esc"
        OUTPUT_FILE = os.path.join(WORKING_DIR, OUTPUT_NAME)

    # Read in input data
    with open(INPUT_FILE) as f:
        raw_data = f.read().lower()

        to_discard = set(string.punctuation)
        to_discard.remove("&")

        raw_data = ''.join(c for c in raw_data if c not in to_discard)

    # Convert raw data to tokens to be parsed
    tokens = word_tokenize(raw_data)

    # Replace instances of '1st', '2nd', etc with their non abbreviated forms
    for (index, item) in enumerate(tokens):
        if (item in abbr_to_full):
            tokens[index] = abbr_to_full[item]
        elif (item == "&"):
            tokens[index] = "and"

    # Sanitise tokens
    tokens = disambiguate_colours(tokens)
    tokens = reorder(tokens)

    # Construct grammar and parser
    with open('parser_cfg.txt') as f:
        raw_cfg = f.read()

    parser_grammar = CFG.fromstring(raw_cfg)
    parser = ChartParser(parser_grammar)

    # Parse data into tree
    output_data = None
    for tree in parser.parse(tokens):
        output_data = tree

    if (output_data is None):
        print("Error: Parse failed, please check input is of correct format.")
    else:
        # Convert Tree to dict to prepare it for JSON serialisation
        output_data = tree_to_dict(output_data)

        # If a tincture is in the top level of the dictionary, change its name to "field"
        if ("tincture" in output_data.keys()):
            output_data["field"] = output_data["tincture"]
            output_data.pop("tincture")

        # Convert dict to JSON
        with open(OUTPUT_FILE, 'w+') as f:
            json.dump(output_data, f, indent=2)


def disambiguate_colours(tokens):
    i = 0  # The index for navigating the array
    palette = []
    expecting_colour = False

    while (i < len(tokens)):
        t = tokens[i]
        if (t in colours):
            # Any colours we see will potentially be referenced later and must be saved in
            # the order they appear
            palette.append(t)
        elif (t == "of"):
            # "of the" is the phrase to expect before a colour replacement word, so if we see "of"
            # we can begin to anticipate a colour reference word
            expecting_colour = True
        elif (t == "the") and expecting_colour:
            # If "of" is followed by "the", then there's more reason to expect a colour reference
            expecting_colour = True
        elif (t in position_to_num and expecting_colour):
            # Convert "first", "second", etc to its corresponding colour in the palette
            colour = position_to_num[t]
            tokens[i] = palette[colour - 1]

            # Remove "of the" phrase from the token array
            tokens.pop(i - 1)
            tokens.pop(i - 2)
        else:
            # If none of the conditions are met, there's no reason to expect a colour
            expecting_colour = False
        i = i + 1  # Iterate the index

    return tokens




def reorder(tokens):
    sections = [[]]
    current_sections = [0]
    duplicate_section = False  # For cases where we have 'First & Fourth' etc

    for t in tokens:
        if (t == "quarterly"):
            sections.extend([[], [], [], []])  # Set aside four expected sectionections
            for s in current_sections:
                sections[s].append(t)
        elif (t in position_to_num):
            sections[position_to_num[t]].append(t)
            if (duplicate_section):
                current_sections.append(position_to_num[t])
                duplicate_section = False
            else:
                current_sections = [position_to_num[t]]
        elif (t == "and"):
            duplicate_section = True
        else:
            for s in current_sections:
                sections[s].append(t)

    tokens = [token for section in sections for token in section]

    return tokens


def tree_to_dict(tree):
    new_dict = {
        "charges": [],
    }
    if (tree.label() in ["QFirst", "QSecond", "QThird", "QFourth"]):

        if (len(tree) == 3):
            return tree_to_dict(tree[2])
        else:
            return tree_to_dict(tree[1])

    for t in tree:
        if (isinstance(t, Tree)):
            if (t.label() in alias_table):
                # For Charge Phrases
                if (t.label() == "ChP"):
                    # Get number of copies of charges on field
                    charge_no = tree_to_dict(t[0])

                    # Convert string to numeral
                    charge_no = word_to_num[charge_no]

                    # Get the rest of the details of the field
                    charge_details = Tree('Field', t[1:])
                    charge_details = tree_to_dict(charge_details)

                    # Populate array with correct number of copies of the details
                    charge_array = []
                    for i in range(0, charge_no):
                        charge_array.append(charge_details)

                    new_dict.update({alias_table[t.label()]: charge_array})
                # For Quarterly Phrases
                elif (t.label() == "QuartP"):
                    # Add field label to indicate quarterly type
                    new_dict.update({"field": "quarterly"})

                    new_dict.update({"quarters": list(map(tinc_to_field, [tree_to_dict(t[1]), tree_to_dict(t[2]),
                                                                          tree_to_dict(t[3]), tree_to_dict(t[4])]))})
                elif (t.label() == "Orient"):
                    if (t[0] == "sinister"):
                        new_dict.update({"sinister": True})
                    else:
                        new_dict.update({"sinister": False})
                else:
                    new_dict.update({alias_table[t.label()]: tree_to_dict(t)})
            else:
                return tree_to_dict(t)
        else:
            return t
    return new_dict

def tinc_to_field(output_data):
    if ("tincture" in output_data.keys()) and ("charges" in output_data.keys()):
        output_data["field"] = output_data["tincture"]
        output_data.pop("tincture")
    return output_data

colours = [
    "gules",
    "vert",
    "azure",
    "sable",
    "or",
    "argent",
    "jaune",
    "purpure"
]

alias_table = {
    "Tinc": "tincture",
    "Charge": "charge",
    "ChP": "charges",
    "QuartP": "quarters",
    "Orient": "sinister"
}

word_to_num = {
    "a": 1,
    "an": 1,
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
    "seven": 7,
    "eight": 8,
    "nine": 9,
    "ten": 10,
    "eleven": 11,
    "twelve": 12
}

position_to_num = {
    "first": 1,
    "second": 2,
    "third": 3,
    "fourth": 4,
    "fifth": 5,
    "sixth": 6,
    "seventh": 7,
    "eighth": 8,
    "ninth": 9,
    "tenth": 10
}

abbr_to_full = {
    "1st": "first",
    "2nd": "second",
    "3rd": "third",
    "4th": "fourth",
    "5th": "fifth",
    "6th": "sixth",
    "7th": "seventh",
    "8th": "eighth"
}

isMetal = lambda field : field in ['or', 'argent']
isColour = lambda field : field in ['vert', 'gules', 'sable', 'azure','purpure']

if __name__ == "__main__":
    main()
