import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Sankey from 'highcharts/modules/sankey'
import mockData from '../../../data/mockData.json'
import getSankyChartOptions from './getSankyChartOptions.js'

Sankey(Highcharts)

const typicalDaysGWH2020 = Object
  .keys(mockData.typicalDaysGWH2020)
  .filter(key => mockData.typicalDaysGWH2020[key][0] !== 0)
  .reduce((prev, key) => {
    // including CO2|Total
    if (key.includes('Total') | key.includes('System cost')) {
      return prev
    }
    const labels = key.split('|')
    const labelGroupings = labels.reduce((labelPairsPlusValue, label, index) => {
      if (index === labels.length - 1) {
        return labelPairsPlusValue
      }
      return [label, labels[index + 1], mockData.typicalDaysGWH2020[key][0]]
    }, [])
    return [
      ...prev,
      labelGroupings
    ]
  }, [])

const SankyChart = () => (
  <HighchartsReact
    highcharts={Highcharts}
    options={getSankyChartOptions(typicalDaysGWH2020, 'Typical Days GWH 2020')}
  />
)

export default SankyChart
