import React from 'react'
import LoginForm from '../../components/forms/LoginForm/LoginForm'
import styles from './login.module.scss'

export const Login = () => {
  return (
    <>
      <h1 className={styles.title}>Login</h1>
      <LoginForm />
    </>
  )
}

export default Login
