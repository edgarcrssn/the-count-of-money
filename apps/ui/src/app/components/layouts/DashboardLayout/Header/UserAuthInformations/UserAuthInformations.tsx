import { Dropdown, MenuProps, Space, Typography } from 'antd'
import { CurrentUserContext } from '../../../../../context/CurrentUser/CurrentUserContext'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { manageToken } from '../../../../../../utils/manageToken'
import AuthModal from '../../../../modals/AuthModal/AuthModal'

const { Text, Link: AntdLink } = Typography

export const UserAuthInformations = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { currentUser, setCurrentUser, currentUserIsLoading } = useContext(CurrentUserContext)

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

  if (currentUserIsLoading && !currentUser) return null

  return (
    <>
      {currentUser ? (
        <Text>
          Hello,{' '}
          <Dropdown menu={{ items }}>
            <AntdLink href="/" onClick={(e) => e.preventDefault()}>
              <Space>{currentUser.first_name}</Space>
            </AntdLink>
          </Dropdown>
        </Text>
      ) : (
        <Text>
          You are not logged in.{' '}
          <Link
            to="/"
            onClick={(e) => {
              e.preventDefault()
              setIsModalOpen(true)
            }}
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            Log me in
          </Link>
        </Text>
      )}
      <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}
