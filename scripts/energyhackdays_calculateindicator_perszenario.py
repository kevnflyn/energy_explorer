import numpy as np
import pandas as pd

YEARS_DATA = [2020, 2050]
szenario_names = ['co2-25_elec_imports', 'co2-20_elec_imports', 'co2-15_elec_imports',
                  'co2-10_elec_imports', 'co2-5_elec_imports', 'co2-0_elec_imports', 'co2--5_elec_imports',
                  'co2-25_no_elec_imports', 'co2-20_no_elec_imports', 'co2-15_no_elec_imports',
                  'co2-10_no_elec_imports', 'co2-5_no_elec_imports', 'co2-0_no_elec_imports', 'co2--5_no_elec_imports'
                  ]

def calcYearWeights(years):
    weights = np.zeros(np.size(years))
    for i in range(np.size(years)):
        if i == 0:
            weights[i] = (years[i+1] - years[i])
        elif i == np.size(years)-1:
            weights[i] = (years[i] - years[i-1])
        else:
            weights[i] = (years[i+1] - years[i-1])
    return weights

def getValueFromDf(years, dfs, weights, mystring, columnName = 'index'):
    '''

    :param years:
    :param dfs:
    :param mystring:
    :param columnName:
    :return: value sum-weighted across years from the dataframes dfs
    '''
    sumVal = 0
    totweight = 0
    for y, df, w in zip(years, dfs, weights):
        totweight += w
        try:
            myval = int(str(df[df[columnName].str.contains(mystring)].iloc[0, 1]).replace('.',''))
        except ValueError:
            print("Problem with the values or conversion")
        except TypeError:
            print("Problem with the input types")

        sumVal += myval * w
    return sumVal

def getArrayFromDf(years, dfs, weights, mystring, columnName = 'index'):
    '''

    :param years:
    :param dfs:
    :param mystring:
    :param columnName:
    :return: array sum-weighted across years from the dataframes dfs
    '''
    sumVal = 0
    totweight = 0
    for y, df in zip(years, dfs):
        totweight += 1
        try:

            entry = df[df[columnName].str.contains(mystring)].iloc[0,1:]
            #entry = entry.apply(lambda row: str(row).replace('.', ''))
            entry = np.max(entry.astype('float'))
        except ValueError:
            print("Problem with the values or conversion")
        except TypeError:
            print("Problem with the input types")

        sumVal += entry
    return sumVal / totweight

weights = calcYearWeights(YEARS_DATA)

for szname in szenario_names:
    dfs = []
    for y in YEARS_DATA:
        dfs.append(pd.read_csv(r'Data\\Net-zero_typical_days_gwh_2020.csv', sep=','))

    print(dfData2050_sz1.head(5))

    # CO2
    total_CO2 = getValueFromDf(years=YEARS_DATA,
                                     dfs=dfs,
                                     weights = weights,
                                     mystring='CO2')
    # Costs
    total_cost = getValueFromDf(years=YEARS_DATA,
                                     dfs=dfs,
                                     weights = weights,
                                     mystring='Costs')

    # imports
    total_imports = getArrayFromDf(years=YEARS_DATA,
                                     dfs=dfs,
                                     weights = weights,
                                     mystring='Imports') # convert 3 hour kwh energy value into power in GW


print(total_cost_sz1, total_CO2_sz1)

pd.Series(['total_cost_sz1', total_cost_sz1]).to_csv(r'Data\\Outputs\\total_cost_sz1.csv', index=False, header=False)
pd.Series(['total_co2_sz1', total_CO2_sz1]).to_csv(r'Data\\Outputs\\total_co2_sz1.csv', index=False, header=False)
pd.Series(['total_import_sz1', total_imports_sz1]).to_csv(r'Data\\Outputs\\max_import_sz1.csv', index=False, header=False)
pd.Series(['total_cost_sz2', total_cost_sz1]).to_csv(r'Data\\Outputs\\total_cost_sz2.csv', index=False, header=False)
pd.Series(['total_co2_sz2', total_CO2_sz2]).to_csv(r'Data\\Outputs\\total_co2_sz2.csv', index=False, header=False)
pd.Series(['total_import_sz2', total_imports_sz2]).to_csv(r'Data\\Outputs\\max_import_sz2.csv', index=False, header=False)
#cost_peryear_sz1


