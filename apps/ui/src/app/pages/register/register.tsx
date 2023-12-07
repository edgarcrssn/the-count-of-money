/*import React from 'react'
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

export default withoutAuth(Register)*/
// register.tsx
import React from 'react'
import Breadcrumb from '../../components/Breadcrumb'
import withoutAuth from '../../components/hoc/withoutAuth'
import AuthLayout from '../../components/AuthLayout/AuthLayout'
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm'

const Register = () => {
  return (
    <div>
      <Breadcrumb /> {/* Ajoutez cette ligne */}
      <AuthLayout reverse title="Register">
        <RegisterForm />
      </AuthLayout>
    </div>
  )
}

export default withoutAuth(Register)
