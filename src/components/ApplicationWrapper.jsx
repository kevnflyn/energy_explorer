import React from 'react'
import { Layout, Space } from 'antd'
import styles from './ApplicationWrapper.module.css'
import Brand from './Brand'

const { Header, Content } = Layout

const ApplicationWrapper = ({ children }) => (
  <Layout>
    <Header>
      <Space className='logo' direction='horizontal'>
        <Brand/>
      </Space>
    </Header>
    <Layout className={styles.layout}>
      <Layout style={{ padding: '0 24px 24px' }}>
        <Content className={styles.content}>
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
)

export default ApplicationWrapper
