import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import AddMore from "highcharts/highcharts-more";
import HighchartsReact from "highcharts-react-official";

AddMore(Highcharts);

function translateCategory(category) {
  switch (category) {
    case "Hydro RoR":
    case "Hydro Dams":
      return "Hydro";
    case "Coal":
    case "Wood":
      return "Other fossil";
    default:
      return category;
  }
}
export function formatWinterSummerComparison(scenario) {
  const categories = scenario.data.energySources
    .filter(
      (sourceName) =>
        !sourceName.endsWith("|Total") &&
        !sourceName.endsWith("|Electricity")
    )
    .reduce((categoryMap, sourceName) => {
      const category = translateCategory(sourceName.split("|").pop());
      return {
        ...categoryMap,
        [category]: [...(categoryMap[category] ?? []), sourceName],
      };
    }, {});

  function sumSources(sourceNames, key) {
    return sourceNames.reduce(
      (total, sourceName) => total + scenario.data[sourceName][key],
      0
    );
  }
  return {
    categories: Object.keys(categories),
    winter: Object.entries(categories).map(([, sourceNames]) =>
      sumSources(sourceNames, "winterValue")
    ),
    summer: Object.entries(categories).map(([, sourceNames]) =>
      sumSources(sourceNames, "summerValue")
    ),
  };
}
const PolarChart = ({ scenario }) => {
  const getChartOptions = () => ({
    chart: { type: "area", polar: true },
    title: { text: "" },
    xAxis: {
      categories: scenario.categories,
    },
    series: [
      { name: "Winter", data: scenario.winter },
      { name: "Summer", data: scenario.summer },
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

export default PolarChart;
