import fs from 'fs'
import path from 'path'
import csv from 'fast-csv'

const legendFile = {
  filename: 'legend.csv',
  propertyName: 'legend'
}

const filesWithData = [
  {
    filename: 'Net-zero_typical_days_gwh_2020.csv',
    propertyName: 'typicalDaysGWH2020'
  },
  {
    filename: 'Net-zero_typical_days_gwh_2035.csv',
    propertyName: 'typicalDaysGWH2035'
  },
  {
    filename: 'Net-zero_typical_days_gwh_2050.csv',
    propertyName: 'typicalDaysGWH2050'
  },
  {
    filename: 'Net-zero-imports_typical_days_gwh_2050.csv',
    propertyName: 'importsTypicalDaysGWH2050'
  }
]

const mockData = {}

const addCsvRowsToArray = (filename, array, callback) => (
  new Promise((resolve, reject) => {
    fs.createReadStream(filename)
      .pipe(csv.parse({ headers: true }))
      .on('error', error => reject(error))
      .on('data', row => array.push(row))
      .on('end', () => {
        if (callback) {
          callback()
        }
        resolve()
      })
  })
)

const convertMockData = async () => {
  mockData[legendFile.propertyName] = []
  await Promise.all(
    [
      addCsvRowsToArray(
        path.resolve(process.cwd(), 'data', legendFile.filename),
        mockData[legendFile.propertyName]
      ),
      ...filesWithData.map(({ filename, propertyName }) => {
        mockData[propertyName] = []
        return addCsvRowsToArray(
          path.resolve(process.cwd(), 'data', filename),
          mockData[propertyName],
          () => {
            mockData[propertyName] = mockData[propertyName].reduce((rows, row) => {
              const [index, ...rest] = Object.values(row)
              return {
                ...rows,
                [index]: rest.map(numString => parseFloat(numString))
              }
            }, {})
          }
        )
      })
    ]
  )
  console.log(JSON.stringify(mockData))
}

convertMockData()
