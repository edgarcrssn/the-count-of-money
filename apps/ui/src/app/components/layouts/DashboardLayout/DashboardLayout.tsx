import React from 'react'
import styles from './DashboardLayout.module.scss'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'
import { Layout, theme } from 'antd'

import { Outlet } from 'react-router-dom'
import { CurrentUserProvider } from '../../../context/CurrentUser/CurrentUserProvider'

const { useToken } = theme

const DashboardLayout = () => {
  const { token } = useToken()

  return (
    <CurrentUserProvider>
      <Layout className={styles.dashboardLayout}>
        <div className={styles.aside}>
          <Sidebar />
        </div>
        <div className={styles.content}>
          <div
            className={styles.header}
            style={{
              backgroundColor: token.colorPrimaryBg,
            }}
          >
            <Header />
          </div>
          <main
            className={styles.main}
            style={{
              backgroundColor: token.colorPrimaryBg,
            }}
          >
            <Outlet />
          </main>
        </div>
      </Layout>
    </CurrentUserProvider>
  )
}

export default DashboardLayout
