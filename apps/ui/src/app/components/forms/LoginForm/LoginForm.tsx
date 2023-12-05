import React from 'react'
// import styles from './LoginForm.module.scss'
import { Button, Form, Input } from 'antd'
import { LoginDto, authService } from '../../../../services/authService'
import { toast } from 'sonner'
import { manageToken } from '../../../../utils/manageToken'

interface Props {
  onSuccess: () => void
}

const LoginForm = ({ onSuccess }: Props) => {
  const [form] = Form.useForm()

  const loginWithPassword = async (values: LoginDto) => {
    const response = await authService.login(values)
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
      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Log in
        </Button>
      </Form.Item>
    </Form>
  )
}

export default LoginForm
