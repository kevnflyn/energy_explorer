from enum import Enum, auto
import json
import os
import pandas


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
            winter_value = calculate_winter_value(sector_data)
            summer_value = calculate_summer_value(sector_data)
            json_data[sector] = {
                "winterValue": winter_value,
                "summerValue": summer_value,
                "yearValue": winter_value + summer_value,
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
    simulated_hours = 8
    simulated_days = 2
    return (month.value - 1) * simulated_hours * simulated_days + 1


def month_range(starting_moth: Months, end_month: Months):
    return list(range(month_index(starting_moth), month_index(end_month)))


def calculate_winter_value(data: pandas.DataFrame):
    indexes = month_range(Months.JANUARY, Months.APRIL) + month_range(
        Months.OCTOBER, Months.NEXT_JANUARY
    )
    return data[indexes].sum() * 3 * 365 / 24


def calculate_summer_value(data: pandas.DataFrame):
    indexes = month_range(Months.APRIL, Months.OCTOBER)
    return data[indexes].sum() * 3 * 365 / 24
