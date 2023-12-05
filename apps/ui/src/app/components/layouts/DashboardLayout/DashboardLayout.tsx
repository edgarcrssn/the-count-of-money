import React from 'react'
import styles from './DashboardLayout.module.scss'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'
import { Layout } from 'antd'

import { Outlet } from 'react-router-dom'
import { CurrentUserProvider } from '../../../context/CurrentUserProvider'

const DashboardLayout = () => {
  return (
    <CurrentUserProvider>
      <Layout className={styles.dashboardLayout}>
        <div className={styles.aside}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <Header />
          </div>
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </Layout>
    </CurrentUserProvider>
  )
}

export default DashboardLayout
