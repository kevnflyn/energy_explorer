import React, { useState } from 'react'
import ScenariosSankyChart from './ScenariosSankyChart'

import styles from './DetailPage.module.css'
import { Radio } from 'antd'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

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
  console.log('id, ', id)
  return (
    <div className={styles.container}>
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
