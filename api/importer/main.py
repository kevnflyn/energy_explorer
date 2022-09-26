from enum import Enum, auto
import json
import os
import pandas
from calendar import monthrange

SIMULATED_DAYS = 2
SIMULATED_HOURS_IN_A_DAY = 8


def run():
    import_dir = "data/import"
    files = os.listdir(import_dir)
    for file in files:
        if file.endswith(".csv"):
            import_csv(f"{import_dir}/{file}")


def import_csv(filename):
    print(f"Processing {os.path.basename(filename)}")
    all_scenarios = pandas.read_csv(filename)
    if not isinstance(all_scenarios, pandas.DataFrame):
        print(f"File {filename} could not be parsed")
        return
    for (scenario, year), data in all_scenarios.groupby(["scenario", "year"]):
        import_scenario(scenario, year, data.iloc[:, 2:])


def import_scenario(scenario: str, year: int, data: pandas.DataFrame):
    name = f"{scenario}_{year}"
    print(f"\tImporting scenario: {name}")
    json_dict = {
        "name": name,
        "data": transform_scenario_data(data),
    }
    with open(f"data/{scenario}_{year}.json", "w") as json_file:
        json.dump(json_dict, json_file)


def transform_scenario_data(data: pandas.DataFrame):
    data.rename(columns={"index": "sectors"}, inplace=True)
    sectors = [sector for sector in data.sectors.tolist()]
    json_data = {}
    energy_sources = []
    for sector in sectors:
        sector_data = data[data.sectors == sector]
        if len(sector_data) > 1:
            raise ValueError(f"Several rows found for {sector}")
        sector_data = sector_data.squeeze()
        if pandas.isna(sector_data[2]):
            json_data[sector] = {
                "value": sector_data[1],
                "unit": "MT CO2" if "CO2" in sector else "million euro",
            }
        else:
            monthly_values = calculate_monthly_values(sector_data)
            winter_value = sum(monthly_values[0:3] + monthly_values[9:])
            summer_value = sum(monthly_values[3:9])
            json_data[sector] = {
                "monthlyValues": monthly_values,
                "winterValue": winter_value,
                "summerValue": summer_value,
                "yearValue": sum(monthly_values),
                "longUnit": "Total GWh per time interval",
                "shortUnit": "GWh/t",
            }
            energy_sources.append(sector)
        if "Imports" in sector:
            json_data["import_indicator"] = {"value": sector_data[1:].max()}
    json_data["energySources"] = energy_sources

    return json_data


Months = Enum(
    "Months",
    "JANUARY FEBRUARY MARCH APRIL MAY JUNE JULY AUGUST SEPTEMBER OCTOBER NOVEMBER DECEMBER NEXT_JANUARY",
)


def month_index(month: Months):
    return (month.value - 1) * SIMULATED_HOURS_IN_A_DAY * SIMULATED_DAYS + 1


def month_range(starting_moth: Months, end_month: Months):
    return list(range(month_index(starting_moth), month_index(end_month)))


def calculate_monthly_values(data: pandas.DataFrame):
    monthly_values = []
    for month_number in range(12):
        measurements_in_month = SIMULATED_DAYS * SIMULATED_HOURS_IN_A_DAY
        days_in_month = monthrange(2050, month_number + 1)[1]
        first_value_index = 1 + month_number * measurements_in_month
        last_value_index = (
            1 + month_number * measurements_in_month + measurements_in_month
        )
        monthly_values.append(
            data[first_value_index:last_value_index].astype("float64")
            .sum()
            * (24 / SIMULATED_HOURS_IN_A_DAY)
            * days_in_month
            / SIMULATED_DAYS
        )
    return monthly_values
