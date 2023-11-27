import React, { useEffect } from 'react'
import DashboardLayout from '../../components/DashboardLayout/DashboardLayout'
import { manageToken } from '../../../utils/manageToken'
import withAuth from '../../components/hoc/withAuth'
// import styles from './Home.module.scss'

export function Home() {
  useEffect(() => {
    const token = manageToken.get()
    console.log(token)
  }, [])
  return <DashboardLayout>Home</DashboardLayout>
}

export default withAuth(Home)
