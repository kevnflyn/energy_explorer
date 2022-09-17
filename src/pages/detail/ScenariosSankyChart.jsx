import React from "react"
import Highcharts from "highcharts"
import HighchartsReact from "highcharts-react-official"
import Sankey from "highcharts/modules/sankey"
import getSankyChartOptions from "./getSankyChartOptions.js"

Sankey(Highcharts)

const ScenariosSankyChart = ({ scenario, timeOfYear }) => {
  return (
    <div key={timeOfYear}>
      <HighchartsReact
        // constructorType = { 'sankyChart' }
        allowChartUpdate = { true }
        immutable = { false }
        highcharts={Highcharts}
        options={getSankyChartOptions(scenario, "Typical Days GWH 2020")}
      />
    </div>
  )
}

export default ScenariosSankyChart
