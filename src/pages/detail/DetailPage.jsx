import React, { useEffect, useState } from "react";
import ScenariosSankyChart from './ScenariosSankyChart'

import styles from './DetailPage.module.css'
import { Radio } from 'antd'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { routes } from '../../routes'
import getSankyChartData from "./getSankyChartData.js"
import { Typography } from "antd"

const timesOfYear = [
  {
    label: 'Winter',
    value: 'winterValue'
  },
  {
    label: 'Summer',
    value: 'summerValue'
  },
  {
    label: 'Year',
    value: 'yearValue'
  }
]

const DetailPage = () => {
  const [timeOfYear, setTimeOfYear] = useState('yearValue')
  const [scenarioData, setScenarioData] = useState(null)
  const { id } = useParams()

  const onChangeRadio = useCallback(({ target }) => {
    setTimeOfYear(target.value)
  }, [])

  useEffect(() => {
    const fetchScenario = async () => {
      try {
        // const response = await fetch(`http://localhost:8000/scenarios/${id}`)
        const response = await fetch(`../../../data/scenario_${id}.json`, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        const scenario = await response.json()
        const scenarioChartData = getSankyChartData(scenario, timeOfYear)
        setScenarioData(scenarioChartData)
      } catch (error) {
        console.warn(error)
      }
    }
    fetchScenario()
  }, [])

  if (scenarioData === null) {
    return null
  }

  return (
    <div className={styles.container}>
      <BackButton href={routes.home}/>
      <Typography.Title level={1}>{scenarioData.name}</Typography.Title>
      <Radio.Group value={timeOfYear} onChange={onChangeRadio}>
        {timesOfYear.map(({ value, label }) =>
          <Radio key={value} value={value}>{label}</Radio>
        )}
      </Radio.Group>
      <ScenariosSankyChart
        scenario={scenarioData}
        timeOfYear={timeOfYear}
        id={id}/>
    </div>
  )
}

export default DetailPage
