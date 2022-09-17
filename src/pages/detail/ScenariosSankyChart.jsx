import React, { useEffect, useState, useCallback } from 'react'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import Sankey from 'highcharts/modules/sankey'
import mockData from '../../../data/mockData.json'
import getSankyChartOptions from './getSankyChartOptions.js'
import getSankyChartData from './getSankyChartData.js'
// import { useLocation } from 'react-router'

Sankey(Highcharts)

const ScenariosSankyChart = ({ timeOfYear }) => {
  const [result, setResult] = useState(null)

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        const response = await fetch(`../../../data/scenario_${1}.json`, {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        const scenario = await response.json()
        const scenarioChartData = getSankyChartData(scenario, timeOfYear)
        console.log('scenarioChartData, ', scenarioChartData)
        setResult(scenarioChartData)
      } catch (error) {
        console.warn(error)
      }
    }
    fetchScenario()
  }, [])

  if (result === null) {
    return null
  }

  return (
    <div key={timeOfYear}>
      <HighchartsReact
        highcharts={Highcharts}
        options={getSankyChartOptions(
          result,
          'Typical Days GWH 2020')
        }
      />
    </div>
  )
}

export default ScenariosSankyChart
