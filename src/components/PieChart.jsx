import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export function formatImportsPieChart(scenario, timeOfYear) {
  const totalEnergy = scenario.data.energySources
    .map((sourceName) => {
      if (sourceName.split("|").length != 2 || !sourceName.endsWith("|Total")) {
        return 0;
      }
      const source = scenario.data[sourceName];
      return source[timeOfYear];
    })
    .reduce((a, b) => a + b);
  const imports = scenario.data.energySources.flatMap((sourceName) => {
    const importSources = ["Gas", "Oil", "Coal", "Imports"];
    const importRegex = new RegExp(
      "(" + importSources.map((source) => `\\|${source}`).join("|") + ")$"
    );
    if (!importRegex.test(sourceName)) {
      return [];
    }
    const source = scenario.data[sourceName];
    return [{ y: source[timeOfYear], name: sourceName.replaceAll("|", " | ") }];
  });
  const domestic =
    totalEnergy -
    imports.reduce((a, b) => {
      return { y: a.y + b.y };
    }).y;
  return [...imports, { y: domestic, name: "Domestic" }].sort(
    (a, b) => a.y - b.y
  );
}
const PieChart = ({ scenario }) => {
  const getChartOptions = () => ({
    chart: { type: "pie" },
    plotOptions: {
      pie: {
        dataLabels: {
          format: "{point.name}: {point.percentage:.1f} %",
        },
      },
    },
    title: { text: "" },
    tooltip: {
      pointFormat: "<strong>{point.y:.2f} ({point.percentage:.1f}%)</strong>",
    },
    series: [
      {
        type: "pie",
        data: scenario,
      },
    ],
  });
  const [chartOptions, setChartOptions] = useState(getChartOptions());
  useEffect(() => {
    setChartOptions(getChartOptions());
  }, [scenario]);
  return (
    <HighchartsReact
      // constructorType = { 'sankyChart' }
      allowChartUpdate={true}
      immutable={false}
      highcharts={Highcharts}
      options={chartOptions}
    />
  );
};

export default PieChart;
