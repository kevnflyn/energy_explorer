const getSankyChartOptions = ({
  data,
  nodes
}) => ({
  title: { text: '' },
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
      nodes,
      type: "sankey",
      name: "Sankey series for ",
    },
  ],
});

export default getSankyChartOptions;
