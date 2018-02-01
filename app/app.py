import json
import os

from flask import Flask, render_template, request, jsonify


app = Flask(__name__)


BLAZONS = None
with open(os.path.join(os.path.dirname(__file__), 'blazons.json'), 'r') as blazon_file:
    BLAZONS = json.load(blazon_file)


@app.route("/")
def index():
    """Base index page"""
    return render_template("index.html")


@app.route("/_parse", methods=['POST'])
def parse():
    """Parse blazon text using 'backend'"""
    blazon = request.get_json()['blazon']
    return jsonify(parse_blazon(blazon))


def parse_blazon(blazon):
    """Dummy method in place of parser"""
    payload = BLAZONS.get(blazon.lower(), {
        "field": "argent",
        "charges": [
            {
                "charge": "bend",
                "sinister": True,
                "tincture": "gules"
            }
        ]
    })

    return payload
