import React from 'react'
import styles from './AuthLayout.module.scss'
import { Outlet } from 'react-router-dom'
import withoutAuth from '../../hoc/withoutAuth'

const AuthLayout = () => {
  return (
    <div className={styles.dashboardLayout}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <Outlet />
        </div>
      </div>
      <img
        className={styles.illustration}
        alt="Cryptos"
        src="https://images.unsplash.com/photo-1631603090989-93f9ef6f9d80?q=80&w=2972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
    </div>
  )
}

export default withoutAuth(AuthLayout)
