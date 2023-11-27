import React from 'react'
import LoginForm from '../../components/forms/LoginForm/LoginForm'
import styles from './Login.module.scss'
import withoutAuth from '../../components/hoc/withoutAuth'

export function Login() {
  return (
    <div className={styles.loginPage}>
      <div className={styles.formContainer}>
        <div className={styles.form}>
          <h1>Login</h1>
          <LoginForm />
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

export default withoutAuth(Login)
