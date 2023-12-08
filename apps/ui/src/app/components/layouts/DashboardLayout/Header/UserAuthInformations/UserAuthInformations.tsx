import { Divider, Dropdown, MenuProps, Modal, Space } from 'antd'
import { CurrentUserContext } from '../../../../../context/CurrentUser/CurrentUserContext'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { manageToken } from '../../../../../../utils/manageToken'
import GoogleAuthButton from '../../../../GoogleAuthButton/GoogleAuthButton'
import LoginForm from '../../../../forms/LoginForm/LoginForm'
import RegisterForm from '../../../../forms/RegisterForm/RegisterForm'

export const UserAuthInformations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { currentUser, setCurrentUser, loadCurrentUser } = useContext(CurrentUserContext)

  const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    manageToken.remove()
    setCurrentUser(null)
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to={`/profile/${currentUser?.nickname}`}>My profile</Link>,
      icon: <UserOutlined />,
    },

    {
      key: '2',
      danger: true,
      label: (
        <a href="/" onClick={logout}>
          Logout
        </a>
      ),
      icon: <LogoutOutlined />,
    },
  ]

  return (
    <>
      {currentUser ? (
        <>
          Hello,{' '}
          <Dropdown menu={{ items }}>
            <a href="/" onClick={(e) => e.preventDefault()}>
              <Space>{currentUser.first_name}</Space>
            </a>
          </Dropdown>
        </>
      ) : (
        <div>
          You are not logged in.{' '}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault()
              setIsModalOpen(true)
            }}
          >
            Log me in
          </Link>
        </div>
      )}
      <Modal
        title="Join the community!"
        centered
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <GoogleAuthButton />
        <Divider>or</Divider>
        <LoginForm
          onSuccess={() => {
            setIsModalOpen(false)
            loadCurrentUser()
          }}
        />
        <Divider>or</Divider>
        <RegisterForm
          onSuccess={() => {
            setIsModalOpen(false)
            loadCurrentUser()
          }}
        />
      </Modal>
    </>
  )
}
