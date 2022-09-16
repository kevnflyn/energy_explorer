import React from 'react'
import SankyChart from './SankyChart'

import styles from './DetailPage.module.css'

const DetailPage = ({ children }) => (
  <div className={styles.container}>
    <SankyChart/>
  </div>
)

export default DetailPage
