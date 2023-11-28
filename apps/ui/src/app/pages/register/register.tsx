import React from 'react'
import withoutAuth from '../../components/hoc/withoutAuth'
import AuthLayout from '../../components/AuthLayout/AuthLayout'
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm'
// import styles from './Register.module.scss'

export const Register = () => {
  return (
    <AuthLayout reverse title="Register">
      <RegisterForm />
    </AuthLayout>
  )
}

export default withoutAuth(Register)
