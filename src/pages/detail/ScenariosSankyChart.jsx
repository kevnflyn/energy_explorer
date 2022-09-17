import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Sankey from "highcharts/modules/sankey";
import getSankyChartOptions from "./getSankyChartOptions.js";
import getSankyChartData from "./getSankyChartData.js";
import { Typography } from "antd";

Sankey(Highcharts);

const ScenariosSankyChart = ({ timeOfYear, id }) => {
  const [scenarioData, setScenarioData] = useState(null);

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        // const response = await fetch(`http://localhost:8000/scenarios/${id}`)
        const response = await fetch(`../../../data/scenario_${id}.json`, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        const scenario = await response.json();
        const scenarioChartData = getSankyChartData(scenario, timeOfYear);
        setScenarioData(scenarioChartData);
      } catch (error) {
        console.warn(error);
      }
    };
    fetchScenario();
  }, []);

  if (scenarioData === null) {
    return null;
  }

  return (
    <div key={timeOfYear}>
      <Typography.Title level={1}>{scenarioData.name}</Typography.Title>
      <HighchartsReact
        highcharts={Highcharts}
        options={getSankyChartOptions(scenarioData, "Typical Days GWH 2020")}
      />
    </div>
  );
};

export default ScenariosSankyChart;
