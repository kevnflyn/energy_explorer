const columnPositions = [
  [
    'Solar',
    'Wind',
    'Oil',
    'Hydro RoR',
    'Hydro Dams',
    'Electric Imports',
    'Geothermal',
    'Biomass',
    'Waste',
    'Hydrogen',
    'Hydro'
  ],
  [
    // 'Electricity',
  ],
  [
    'CHPs',
    'Solar Thermal',
    'Electric Heater',
    'Burner',
    'Heat Pumps',
    'Boiler'
  ],
  [
    'Transport',
    'Heating',
    'Residential Heating',
    'District Heating',
    'Industrial Heating',
    'Appliances'
  ]
]

const getSankyChartData = (scenario, timeOfYear) => {
  const sankyChartData = scenario.data.energySources.reduce((prev, key) => {
    // including CO2|Total
    if (key.includes('Total') | key.includes('System cost')) {
      return prev
    }
    const labels = key
      .split('|')
      .reverse()
    const labelGroupings = labels.reduce((labelPairsPlusValue, label, index) => {
      if (index === labels.length - 1) {
        return labelPairsPlusValue
      }
      return [
        ...labelPairsPlusValue,
        {
          from: label,
          to: labels[index + 1],
          weight: scenario.data[key][timeOfYear]
        }
      ]
    }, [])
    const nodes = labels.map(label => {
      const columnIndex = columnPositions.findIndex(column => (
        column.find(columnLabel => columnLabel === label)
      ))
      const node = {
        allowOverlap: false
      }
      if (columnIndex !== -1) {
        node.id = label
        node.column = columnIndex
      }
      return node
    })
    return {
      data: [
        ...prev.data,
        ...labelGroupings
      ],
      nodes: [
        ...prev.nodes,
        ...nodes
      ]
    }
  }, {
    name: scenario.name,
    data: [],
    nodes: []
  })

  sankyChartData.data.sort(({ from: a }, { from: b }) => {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  })

  return sankyChartData
}

export default getSankyChartData
