import React from 'react'
// import styles from './LoginForm.module.scss'
import { Button, Form, Input } from 'antd'
import { LoginDto, authService } from '../../../../services/authService'
import { toast } from 'sonner'
import { Link, useNavigate } from 'react-router-dom'
import { manageToken } from '../../../../utils/manageToken'

const LoginForm = () => {
  const navigate = useNavigate()

  const onFinish = async (values: LoginDto) => {
    const response = await authService.login(values)
    if (response.status === 200 && response.data) {
      const { token } = response.data
      manageToken.set(token)
      toast.success('You logged in successfully')
      return navigate('/')
    }

    if (response.status === 401) {
      toast.error('You input invalid credentials')
      return
    }

    toast.error(`An unknown error occurred (${response.status})`, { description: 'Please contact the support.' })
  }

  return (
    <Form name="normal_login" initialValues={{ remember: true }} onFinish={onFinish}>
      <Form.Item name="nickname" rules={[{ required: true, message: 'Please input your nickname.' }]}>
        <Input placeholder="Nickname" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your password.' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log in
        </Button>
        Or <Link to="/register">register now!</Link>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
