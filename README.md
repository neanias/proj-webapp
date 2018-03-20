# Honours Project - Web Frontend

## Requirements

* Python 3
* [Pip](https://pip.pypa.io/en/stable/)
* [Yarn](https://yarnpkg.com/lang/en/)

## Installation

### Python

I would recommend having [`virtualenv`](https://virtualenv.pypa.io/en/stable/) installed to keep versions separate from one another.

To install the Python dependencies, run

    pip install -r requirements.txt

### JavaScript

To install `yarn`, [find instructions here](https://yarnpkg.com/en/docs/install).

To install the web dependencies, run

    yarn install

## Running

To serve the website in development, run

    FLASK_DEBUG=1 FLASK_APP=app.py flask run

## Testing

To check unit tests are green, run

    yarn test

### Coverage

Unit test coverage can be found by running

    yarn test --coverage
