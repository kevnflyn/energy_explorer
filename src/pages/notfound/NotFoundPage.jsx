import React from 'react'
import ApplicationWrapper from '../../components/ApplicationWrapper'
import { Typography } from "antd"
import { Link } from 'react-router-dom'
import { routes } from '../../routes'

const NotFoundPage = () => (
  <ApplicationWrapper>
    <Typography.Title level={1}>
      Looks like your trying to hack the wrong page.
      {' '}
      <Link to={routes.home}>Go home please.</Link>
    </Typography.Title>
  </ApplicationWrapper>
)

export default NotFoundPage
