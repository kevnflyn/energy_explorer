import numpy as np
import pandas as pd
import json

FILENAME = 'newScenarios.csv'

szenario_names = ['co2-25_ elec_imports', 'co2-20_ elec_imports', 'co2-15_ elec_imports',
                  'co2-10_ elec_imports', 'co2-5_ elec_imports', 'co2-0_ elec_imports', 'co2--5_ elec_imports',
                  'co2-25_no_elec_imports', 'co2-20_no_elec_imports', 'co2-15_no_elec_imports',
                  'co2-10_no_elec_imports', 'co2-5_no_elec_imports', 'co2-0_no_elec_imports', 'co2--5_no_elec_imports'
                  ]

years = [2050]

def split_szenarios():
    def get_szenario_from_dataframe(df, year, szenario_name):
        df_szenario = df[df['scenario'] == szenario_name]
        df_szenario = df_szenario[df_szenario['year'] == year]
        return df_szenario
    df = pd.read_csv(r'Data\\' + FILENAME, sep=',')

    for szname in szenario_names:
        for y in years:
            df_szenario = get_szenario_from_dataframe(df, y, szname)
            df_szenario.iloc[:,2:].to_csv(r'Data\\' + szname + '_' + str(y) + '.csv', index=False, header=False)
            df_szenario.iloc[:,2:].to_json(r'Data\\' + szname + '_' + str(y) + '.json')

# ---------create json data structure for sankey diagram------------------

def filter_df(mydf, mystring):
    return mydf[mydf.iloc[:, 0].str.contains(mystring)]

def create_json_szenario_data(my_dataframe):
    dict_sources = {}
    source_list = []
    index_winter_list = [i for i in range(1, 3*16 + 1)] + [i for i in range(1 + 9 * 16, 1 + 12*16)]
    index_summer_list = [i for i in range(3 * 16 + 1, 9 * 16 + 1)]
    sectors = my_dataframe[~my_dataframe.iloc[:,0].str.contains('Total')].iloc[:,0].tolist()
    for i in range(np.size(sectors)):
        sector_name = sectors[i]
        entry = {}
        dataPoint = my_dataframe[my_dataframe[my_dataframe.columns[0]] == sector_name]
        if len(dataPoint) > 1:
            raise ValueError('several rows found')
        else:
            dataPoint = dataPoint.iloc[0,:]

        if not pd.isna(dataPoint.iloc[2]):
            source_list.append(sector_name)
            entry['winterValue'] = np.sum(dataPoint[index_winter_list], axis=0) * 3 * 365 / 24
            entry['summerValue'] = np.sum(dataPoint[index_summer_list], axis=0) * 3 * 365 / 24
            entry['yearValue'] = entry['summerValue'] + entry['winterValue']
            entry['longUnit'] = 'Total GWh per time interval'
            entry['shortUnit'] = 'GWh/t'
        else:
            entry['value'] = dataPoint.iloc[i]
            if 'CO2' in dataPoint.iloc[0]:
                entry['unit'] = 'MT CO2-eq'
            else:
                entry['unit'] = 'billion €'

        dict_sources[sector_name] = entry

         # import indicator
        if 'Imports' in dataPoint.iloc[0]:
            dict_sources['import_indicator'] = {'value': np.max(dataPoint.iloc[1:])}

    dict_sources['energySources'] = source_list
    return dict_sources

def create_json_szenarios():
    sz_cnt = 1
    for szname in szenario_names:
        for y in years:
            df_szenario = pd.read_csv(r'Data\\' + szname + '_' + str(y) + '.csv', header=None)
            json_dict = {'name': szname + '_' + str(y)}
            json_dict['data'] = create_json_szenario_data(df_szenario)
            with open(r"Data\\scenario_{}.json".format(sz_cnt), "w") as outfile:
                json.dump(json_dict, outfile)
            sz_cnt += 1
    # return None
if __name__ == '__main__':
    #split_szenarios()
    create_json_szenarios()