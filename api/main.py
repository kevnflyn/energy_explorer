import os
import json

import pandas
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:5173",
    "http://localhost:8080",
    "https://energy-explorer.netlify.app",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

scenario_db = {}


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/scenarios")
def list_scenarios():
    load_scenarios()
    scenarios = [
        format_scenario_list_response(scenario) for scenario in scenario_db.values()
    ]
    print(scenarios)
    return scenarios


@app.get("/scenarios/{id}")
def get_scenario(id):
    load_scenarios()
    print(scenario_db)
    print(scenario_db.get(id))
    return scenario_db.get(id)


def format_scenario_list_response(scenario):
    total = calculate_total_energy(scenario)

    imports = calculate_imported_energy(scenario)
    domestic = 1 - (imports / total)
    return {
        "key": scenario["key"],
        "name": scenario["name"],
        "co2": scenario["data"]["CO2|Total"]["value"],
        "cost": scenario["data"]["Costs|System cost"]["value"],
        "domestic": domestic,
        "total": total,
    }


def calculate_total_energy(scenario):
    total = 0
    for key in scenario["data"]["energySources"]:
        if len(key.split("|")) == 2 and key.endswith("|Total") and key != "CO2|Total":
            total += scenario["data"][key]["yearValue"]

    return total


def calculate_imported_energy(scenario):
    is_imported = (
        lambda source: source.endswith("|Gas")
        or source.endswith("|Oil")
        or source.endswith("|Coal")
    )
    imports = scenario["data"]["Electricity|Imports"]["yearValue"]
    for key in scenario["data"]["energySources"]:
        if is_imported(key):
            imports += scenario["data"][key]["yearValue"]
    return imports


def load_scenarios():
    global scenario_db
    if len(scenario_db) != 0:
        return
    scenario_files = [
        filename for filename in os.listdir("./data") if filename.endswith(".json")
    ]
    for scenario in scenario_files:
        scenario_info = format_scenario(scenario)
        scenario_db[scenario_info["key"]] = scenario_info


def format_json_scenario(scenario_json):
    with open(f"data/{scenario_json}", "r") as json_file:
        scenario = json.load(json_file)
        scenario["key"] = scenario["name"]
        return scenario


def format_csv_scenario(scenario_csv):
    df = pandas.read_csv(f"data/{scenario_csv}", header=None)
    print(df)
    print(df[df[0] == "Electricity|Imports"].squeeze()[1:])
    name = scenario_csv.replace(".csv", "")
    return {
        "key": name,
        "name": f"Scenario {name}",
        "co2": df[df[0] == "CO2|Total"].squeeze().iloc[1],
        "cost": df[df[0] == "Costs|System cost"].squeeze().iloc[1],
        "domestic": pandas.to_numeric(
            df[df[0] == "Electricity|Imports"].squeeze()[1:], errors="ignore"
        ).sum(),
    }


format_scenario = format_json_scenario
