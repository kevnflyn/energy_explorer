import React, { useCallback } from 'react'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { Button } from 'antd'


const BackButton = ({ href }) => {
  let navigate = useNavigate()
  const onClick = useCallback(() => {
    navigate(href)
  }, [])
  return (
    <Button onClick={onClick}>
      <ArrowLeftOutlined/>
      Back to scenarios list
    </Button>
  )
}

export default BackButton
