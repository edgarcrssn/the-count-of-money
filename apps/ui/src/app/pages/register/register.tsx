import React from 'react'
import RegisterForm from '../../components/forms/RegisterForm/RegisterForm'
import styles from './register.module.scss'

export const Register = () => {
  return (
    <>
      <h1 className={styles.title}>Register</h1>
      <RegisterForm />
    </>
  )
}

export default Register
