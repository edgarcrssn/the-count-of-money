import { Skeleton } from 'antd'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const Home = () => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate('/cryptocurrencies')
  }, [navigate])

  return <Skeleton active />
}

export default Home
