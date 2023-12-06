import React, { useState } from 'react'
// import styles from './LoginForm.module.scss'
import { Button, Form, Input } from 'antd'
import { authService } from '../../../../services/authService'
import { toast } from 'sonner'
import { manageToken } from '../../../../utils/manageToken'
import { LoginDto } from '@the-count-of-money/types'

interface Props {
  onSuccess: () => void
}

const LoginForm = ({ onSuccess }: Props) => {
  const [fetching, setFetching] = useState(false)
  const [form] = Form.useForm()

  const loginWithPassword = async (values: LoginDto) => {
    setFetching(true)
    const response = await authService.login(values)
    setFetching(false)

    if (response.status === 200 && response.data) {
      const { token } = response.data
      manageToken.set(token)
      toast.success('You logged in successfully')
      form.resetFields()
      onSuccess()
      return
    }

    if (response.status === 401) {
      toast.error('You input invalid credentials')
      return
    }

    toast.error(`An unknown error occurred while login in with password (${response.status})`, {
      description: 'Please contact the support.',
    })
  }

  return (
    <Form form={form} name="normal_login" initialValues={{ remember: true }} onFinish={loginWithPassword}>
      <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '.5rem' }}>Login with password</div>
      <Form.Item name="nickname" rules={[{ required: true, message: 'Please input your nickname.' }]}>
        <Input placeholder="Nickname" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: 'Please input your password.' }]}>
        <Input.Password placeholder="Password" />
      </Form.Item>
      <Button disabled={fetching} type="primary" htmlType="submit" block>
        Log in
      </Button>
    </Form>
  )
}

export default LoginForm
