const getSankyChartOptions = (data, text) => ({
  title: { text },
  accessibility: {
    point: {
      valueDescriptionFormat:
        "{index}. {point.from} to {point.to}, {point.weight}.",
    },
  },
  series: [
    {
      keys: ["from", "to", "weight"],
      data,
      type: "sankey",
      name: "Sankey series for ",
    },
  ],
});

export default getSankyChartOptions;
