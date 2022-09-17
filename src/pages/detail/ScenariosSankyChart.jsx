import React from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Sankey from 'highcharts/modules/sankey'
import mockData from '../../../data/mockData.json'
import getSankyChartOptions from './getSankyChartOptions.js'
import getSankyChartData from './getSankyChartData.js'

Sankey(Highcharts)

const ScenariosSankyChart = () => (
  <HighchartsReact
    highcharts={Highcharts}
    options={getSankyChartOptions(
      getSankyChartData(mockData.typicalDaysGWH2020),
      'Typical Days GWH 2020')
    }
  />
)

export default ScenariosSankyChart
