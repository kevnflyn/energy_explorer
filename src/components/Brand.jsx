import React from 'react'
// import WindmillSvg from '../assets/windmill.svg'
import { Image, Space } from 'antd'

import styles from './Brand.module.css'

const Brand = () => (
  <Space className={styles.brand}>
    {/* <WindmillSvg/> */}
    <Image
      width='100%'
      height='20px'
      src='/windmill.svg'
    />
    {/* <img src={'public/windmill.svg'}/> */}
    ENERGY EXPLORER
  </Space>
)

export default Brand
