import React, { useState } from 'react'
import ScenariosSankyChart from './ScenariosSankyChart'

import styles from './DetailPage.module.css'
import { Button, Radio } from 'antd'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import BackButton from '../../components/BackButton'
import { routes } from '../../routes'

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
  const onChangeRadio = useCallback(({ target }) => {
    setTimeOfYear(target.value)
  }, [])
  const { id } = useParams()
  return (
    <div className={styles.container}>
      <BackButton href={routes.home}/>
      <Radio.Group value={timeOfYear} onChange={onChangeRadio}>
        {timesOfYear.map(({ value, label }) =>
          <Radio key={value} value={value}>{label}</Radio>
        )}
      </Radio.Group>
      <ScenariosSankyChart timeOfYear={timeOfYear} id={id}/>
    </div>
  )
}

export default DetailPage
