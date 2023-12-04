import React, { PropsWithChildren } from 'react'
import styles from './DashboardLayout.module.scss'
import { Sidebar } from './Sidebar/Sidebar'
import { Header } from './Header/Header'
import { Layout } from 'antd'
import { BreadcrumbContainer } from './BreadcrumbContainer/BreadcrumbContainer'

const DashboardLayout = ({ children }: PropsWithChildren) => {
  return (
    <Layout className={styles.dashboardLayout}>
      <div className={styles.aside}>
        <Sidebar />
      </div>
      <div className={styles.content}>
        <div className={styles.header}>
          <Header />
        </div>
        <main className={styles.main}>
          <BreadcrumbContainer />
          <div className={styles.page}>{children}</div>
        </main>
      </div>
    </Layout>
  )
}

export default DashboardLayout
