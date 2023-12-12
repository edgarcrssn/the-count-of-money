import React from 'react'
import styles from './DashboardLayout.module.scss'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'
import { Layout, theme } from 'antd'

import { Outlet } from 'react-router-dom'
import { Footer } from './Footer/Footer'

const DashboardLayout = () => {
  const { token } = theme.useToken()

  return (
    <Layout className={styles.dashboardLayout}>
      <div
        className={styles.aside}
        style={{
          backgroundColor: token.colorBgLayout,
          borderRight: `1px solid ${token.colorBorder}`,
          transition: `${token.motionDurationSlow} ease-out`,
        }}
      >
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div
          className={styles.header}
          style={{
            backgroundColor: token.colorBgLayout,
            borderBottom: `1px solid ${token.colorBorder}`,
            transition: `${token.motionDurationSlow} ease-out`,
          }}
        >
          <Header />
        </div>
        <main
          className={styles.main}
          style={{
            backgroundColor: token.colorBgContainer,
            color: token.colorTextBase,
            transition: `${token.motionDurationSlow} ease-out`,
          }}
        >
          <div className={styles.content}>
            <Outlet />
          </div>
          <div
            className={styles.footer}
            style={{
              backgroundColor: token.colorBgLayout,
              borderTop: `1px solid ${token.colorBorder}`,
              transition: `${token.motionDurationSlow} ease-out`,
            }}
          >
            <Footer />
          </div>
        </main>
      </div>
    </Layout>
  )
}

export default DashboardLayout
