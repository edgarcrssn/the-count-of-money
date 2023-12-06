import React, { useState } from 'react'
// import styles from './RegisterForm.module.scss'
import { Button, Form, Input } from 'antd'
import { authService } from '../../../../services/authService'
import { toast } from 'sonner'
import { manageToken } from '../../../../utils/manageToken'
import { capitalize } from '../../../../utils/capitalize'
import { RegisterDto } from '@the-count-of-money/types'
import { onlyLettersAndOrSpacesRegexObject, passwordRegexObject, slugRegexObject } from '@the-count-of-money/regex'

interface Props {
  onSuccess: () => void
}

const RegisterForm = ({ onSuccess }: Props) => {
  const [fetching, setFetching] = useState(false)
  const [form] = Form.useForm()

  const registerWithPassword = async (values: RegisterDto) => {
    setFetching(true)
    const response = await authService.register({
      ...values,
      first_name: values.first_name.trim(),
      last_name: values.last_name.trim(),
      nickname: values.nickname.trim(),
    })
    setFetching(false)

    if (response.status === 201 && response.data && 'token' in response.data) {
      const token = response.data.token
      manageToken.set(token)
      toast.success('You registered successfully')
      form.resetFields()
      onSuccess()
      return
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
    <Form form={form} name="normal_register" initialValues={{ remember: true }} onFinish={registerWithPassword}>
      <div style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '.5rem' }}>Register with password</div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '1rem',
        }}
      >
        <Form.Item
          name="first_name"
          rules={[
            { required: true, message: 'Please input your first name' },
            () => ({
              validator(_, value) {
                if (!value || onlyLettersAndOrSpacesRegexObject.regex.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(capitalize(onlyLettersAndOrSpacesRegexObject.message)))
              },
            }),
          ]}
        >
          <Input placeholder="First name" />
        </Form.Item>
        <Form.Item
          name="last_name"
          rules={[
            { required: true, message: 'Please input your last name' },
            () => ({
              validator(_, value) {
                if (!value || onlyLettersAndOrSpacesRegexObject.regex.test(value)) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error(capitalize(onlyLettersAndOrSpacesRegexObject.message)))
              },
            }),
          ]}
        >
          <Input placeholder="Last name" />
        </Form.Item>
      </div>
      <Form.Item
        name="nickname"
        rules={[
          { required: true, message: 'Please input your nickname' },
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
              if (!value || slugRegexObject.regex.test(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(capitalize(slugRegexObject.message)))
            },
          }),
        ]}
      >
        <Input placeholder="Nickname" min={3} max={18} />
      </Form.Item>
      {/* TODO verify email format */}
      <Form.Item name="email" rules={[{ required: true, message: 'Please input your email' }]}>
        <Input type="email" placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: 'Please input your password' },
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
              if (!value || passwordRegexObject.regex.test(value)) {
                return Promise.resolve()
              }
              return Promise.reject(new Error(capitalize(passwordRegexObject.message)))
            },
          }),
        ]}
      >
        <Input.Password placeholder="Password" min={8} max={32} />
      </Form.Item>
      <Button disabled={fetching} type="primary" htmlType="submit" block>
        Register
      </Button>
    </Form>
  )
}

export default RegisterForm
