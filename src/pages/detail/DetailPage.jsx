import React, { useEffect, useState, useCallback } from "react"
import { useParams } from 'react-router-dom'
import { Radio, Typography } from 'antd'

import ApplicationWrapper from "../../components/ApplicationWrapper"
import BackButton from '../../components/BackButton'
import ScenariosSankyChart from './ScenariosSankyChart'
import scenarioTitles from '../../../data/scenarioTitleMap.json'
import getSankyChartData from "./getSankyChartData.js"
import { routes } from '../../routes'

import styles from './DetailPage.module.css'

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
        // ToDo: we need to fetch from this API at some point :)
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
    <ApplicationWrapper>
      <div className={styles.container}>
        <BackButton href={routes.home}/>
        <Typography.Title level={1}>{scenarioTitles[scenarioData.name]}</Typography.Title>
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
    </ApplicationWrapper>
  )
}

export default DetailPage
