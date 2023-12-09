import { Divider, Modal } from 'antd'
import React, { useContext } from 'react'
import GoogleAuthButton from '../../GoogleAuthButton/GoogleAuthButton'
import LoginForm from '../../forms/LoginForm/LoginForm'
import RegisterForm from '../../forms/RegisterForm/RegisterForm'
import { CurrentUserContext } from '../../../context/CurrentUser/CurrentUserContext'

type Props = {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthModal = ({ isOpen, setIsOpen }: Props) => {
  const { loadCurrentUser } = useContext(CurrentUserContext)

  return (
    <Modal title="Join the community!" centered open={isOpen} onCancel={() => setIsOpen(false)} footer={null}>
      <GoogleAuthButton />
      <Divider>or</Divider>
      <LoginForm
        onSuccess={() => {
          setIsOpen(false)
          loadCurrentUser()
        }}
      />
      <Divider>or</Divider>
      <RegisterForm
        onSuccess={() => {
          setIsOpen(false)
          loadCurrentUser()
        }}
      />
    </Modal>
  )
}

export default AuthModal
