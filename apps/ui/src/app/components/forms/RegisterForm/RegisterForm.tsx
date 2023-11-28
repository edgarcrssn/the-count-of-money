import React from 'react'
// import styles from './RegisterForm.module.scss'
import { Button, Form, Input } from 'antd'
import { RegisterDto, authService } from '../../../../services/authService'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { manageToken } from '../../../../utils/manageToken'
import { capitalize } from '../../../../utils/capitalize'
import GoogleAuthButton from '../../GoogleAuthButton/GoogleAuthButton'

const RegisterForm = () => {
  const navigate = useNavigate()

  const registerWithPassword = async (values: RegisterDto) => {
    const response = await authService.register(values)

    if (response.status === 201 && response.data && 'token' in response.data) {
      const token = response.data.token
      manageToken.set(token)
      toast.success('You registered successfully')
      return navigate('/')
    }

    if (response.status === 400 && response.data && 'errors' in response.data) {
      response.data.errors.forEach((error) => {
        toast.error(`${capitalize(error.path)} ${error.msg}`)
      })
      return
    }

    if (response.status === 409 && response.data && 'message' in response.data) {
      toast.error(response.data.message)
      return
    }

    toast.error(`An unknown error occurred while login in with password (${response.status})`, {
      description: 'Please contact the support.',
    })
  }

  return (
    <>
      <GoogleAuthButton />
      <div style={{ textAlign: 'center', margin: '.5rem 0' }}>or</div>
      <Form name="normal_login" initialValues={{ remember: true }} onFinish={registerWithPassword}>
        <Form.Item
          name="nickname"
          rules={[
            { required: true, message: 'Please input your nickname.' },
            () => ({
              validator(_, value) {
                if (!value || (value.length >= 3 && value.length <= 18)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Must be between 3 and 18 characters long'))
              },
            }),
            () => ({
              validator(_, value) {
                if (!value || /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(
                  new Error('Must only contain lowercase letters and numbers that can be separated by hyphen'),
                )
              },
            }),
          ]}
        >
          <Input placeholder="Nickname" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email.' }]}>
          <Input type="email" placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password.' },
            () => ({
              validator(_, value) {
                if (!value || (value.length >= 8 && value.length <= 32)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Must be between 8 and 32 characters long'))
              },
            }),
            () => ({
              validator(_, value) {
                if (!value || /[A-Z]/.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Must contain at least one uppercase letter'))
              },
            }),
            () => ({
              validator(_, value) {
                if (!value || /[a-z]/.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Must contain at least one lowercase letter'))
              },
            }),
            () => ({
              validator(_, value) {
                if (!value || /\d/.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Must contain at least one digit'))
              },
            }),
          ]}
        >
          <Input.Password placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
          Or <Link to="/login">login now!</Link>
        </Form.Item>
      </Form>
    </>
  )
}

export default RegisterForm
