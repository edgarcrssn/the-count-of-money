/*import React from 'react'
import LoginForm from '../../components/forms/LoginForm/LoginForm'
// import styles from './Login.module.scss'
import withoutAuth from '../../components/hoc/withoutAuth'
import AuthLayout from '../../components/AuthLayout/AuthLayout'

export const Login = () => {
  return (
    <AuthLayout title="Login">
      <LoginForm />
    </AuthLayout>
  )
}

export default withoutAuth(Login)*/

// login.tsx
import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import LoginForm from '../../components/forms/LoginForm/LoginForm'
import withoutAuth from '../../components/hoc/withoutAuth'
import AuthLayout from '../../components/AuthLayout/AuthLayout'

const Login = () => {
  return (
    <div>
      <Breadcrumb /> {/* Ajoutez cette ligne */}
      <AuthLayout title="Login">
        <LoginForm />
      </AuthLayout>
    </div>
  )
}

export default withoutAuth(Login)
