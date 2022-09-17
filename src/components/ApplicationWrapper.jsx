import React from 'react'
import { Layout, Breadcrumb, Menu } from 'antd'
import styles from './ApplicationWrapper.module.css'

const { Header, Content, Sider } = Layout

const ApplicationWrapper = ({ children }) => (
  <Layout>
    <Header>
      {/* <div className="logo" /> */}
      {/* <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} items={items1} /> */}
    </Header>
    <Layout className={styles.layout}>
      {/* <Sider width={200}> */}
        {/* <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
          items={items2}
        /> */}
      {/* </Sider> */}
      <Layout style={{ padding: '0 24px 24px' }}>
        {/* <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb> */}
        <Content
          className={styles.content}
          // className="site-layout-background"
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  </Layout>
)

export default ApplicationWrapper
