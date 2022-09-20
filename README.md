# Energy Explorer

## Introduction

### The problem

Currently, results from energy scenarios are presented in research papers or
individual webpages. This makes it close to impossible for policy makers to get
the full picture and understand the features of the net-zero Switzerland. How
can policy-makers take decisions based on model-driven energy scenarios?

### The goal
Develop a decision-making tool to explore and compare multiple energy
scenarios. The tool should visualise for each scenario key indicators and
energy sources/carriers. 


This tool was developed at the [Energy Data Hackdays
2022](https://energydatahackdays.ch/) on the 16th-17th of September 2022 in
Brugg.
This is the solution to challenge 07: [Alternative pathways to net
zero](https://hack.opendata.ch/project/846).

## Frontend application

The project is divided in two parts, a frontend application and an API.

### Overview

The frontend is a React application that uses the
[highcharts](https://www.highcharts.com/) library for the graphs. It is uses
[Vite](https://vitejs.dev) for building the project.

### Installing

NodeJS version 16 or following is required to run the project locally. To
install the dependencies run:

```bash
$ npm install
```

Once the dependencies are installed, the project can be run locally with:

```bash
$ npm run dev
```

The web server is running on `http://localhost:5173` and changes to the sources
files will be immediately reflected.

The API is required to run to be able to use the application. By default it
will try to reach the API on `http://localhost:8000`, but the API endpoint can
be controlled through the `VITE_API_HOST` environment variable. For example to
use the API deployed at `https://energy-explorer-api-ij67sr2isq-oa.a.run.app`:

```bash
$ env VITE_API_HOST="https://energy-explorer-api-ij67sr2isq-oa.a.run.app" npm run dev
```


## API backend

The API backend is a Python application written with
[FastAPI](https://fastapi.tiangolo.com/) and
[Pandas](https://pandas.pydata.org/). The dependencies are managed through
[Poetry](https://python-poetry.org/). 

### Running the docker image

The API can be run through Docker without having to install any of the
dependencies on the local machine. The simplest way to start the API is through
`docker-compose`:

```bash
$ docker-compose up
```

The API will be accessible on port `8000`, for example:

```bash
curl http://localhost:8000/scenarios
```

### Installing and running the python application locally

#### Poetry
To install the necessary dependencies and run the application locally, Poetry
must be installed on the machine. Depending on the operating system, it could
be available as a system package (i.e.: On Mac OS with `brew` it is possible to
install poetry with `brew install poetry`).

If not, poetry is provided with an installer:

```bash
$ curl -sSL https://install.python-poetry.org | python3 -
```

Alternatively, poetry can be installed with `pip`, ideally within an [virtual environment](https://docs.python.org/3/library/venv.html):

```bash
$ pip install -U pip setuptools && pip install poetry
```

Check the [documentation](https://python-poetry.org/docs/#installation) for further details.

#### Dependencies

Once poetry is installed, the project dependencies can be installed with:

```bash
$ cd api && poetry install
```

#### Running the API

To run the application we use `uvicorn`:

```bash
# You need to be in the `api` directory.
$ poetry run uvicorn main:app --reload
```

The application will be accessible from `localhost:8000`.
