import { Dropdown, MenuProps, Space } from 'antd'
import { CurrentUserContext } from '../../../../../context/CurrentUserContext'
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { manageToken } from '../../../../../../utils/manageToken'

export const UserAuthInformations = () => {
  const { currentUser, loadCurrentUser } = useContext(CurrentUserContext)

  if (!currentUser)
    return (
      <div>
        You are not logged in. <Link to="/login">Log me in</Link>
      </div>
    )

  const logout = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    manageToken.remove()
    loadCurrentUser()
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: <Link to={`/profile/${currentUser.nickname}`}>My profile</Link>,
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
      Hello,{' '}
      <Dropdown menu={{ items }}>
        <a href="/" onClick={(e) => e.preventDefault()}>
          <Space>{currentUser.nickname}</Space>
        </a>
      </Dropdown>
    </>
  )
}
