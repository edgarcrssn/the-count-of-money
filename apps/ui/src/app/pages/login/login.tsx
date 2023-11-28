import React from 'react'
import LoginForm from '../../components/forms/LoginForm/LoginForm'
// import styles from './Login.module.scss'
import withoutAuth from '../../components/hoc/withoutAuth'
import AuthLayout from '../../components/AuthLayout/AuthLayout'

export function Login() {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  )
}

export default withoutAuth(Login)
