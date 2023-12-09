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

  const logout = () => {
    manageToken.remove()
    setCurrentUser(null)
  }

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to={`/profile/${currentUser?.nickname}`}>My profile</Link>,
      icon: <UserOutlined />,
    },

    {
      key: '2',
      danger: true,
      label: 'Logout',
      icon: <LogoutOutlined />,
      onClick: logout,
    },
  ]

  if (currentUserIsLoading && !currentUser) return null

  return (
    <>
      {currentUser ? (
        <Text>
          Hello,{' '}
          <Dropdown menu={{ items: dropdownItems }}>
            <AntdLink>
              <Space>{currentUser.first_name}</Space>
            </AntdLink>
          </Dropdown>
        </Text>
      ) : (
        <Text>
          You are not logged in.{' '}
          <AntdLink
            onClick={() => setIsModalOpen(true)}
            style={{
              whiteSpace: 'nowrap',
            }}
          >
            Log me in
          </AntdLink>
        </Text>
      )}
      <AuthModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </>
  )
}
