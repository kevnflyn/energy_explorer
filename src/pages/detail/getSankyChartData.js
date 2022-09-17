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
    'Hydrogen'
  ],
  [
    // 'Electricity',
    'Hydro'
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

const getSankyChartData = data => {
  const sankyChartData = Object
    .keys(data)
    .filter(key => data[key][0] !== 0)
    .reduce((prev, key) => {
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
            weight: data[key][0]
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
