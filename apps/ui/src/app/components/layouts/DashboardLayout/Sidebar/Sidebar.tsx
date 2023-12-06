import React, { useContext, useEffect, useState } from 'react'
import styles from './Sidebar.module.scss'
import { AreaChartOutlined, FileTextOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Layout, Menu } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../../../context/CurrentUserContext'
const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const Sidebar = () => {
  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const storedCollapsed = localStorage.getItem('tcomSidebarCollapsed')
    return storedCollapsed ? JSON.parse(storedCollapsed) : false
  })
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const { currentUser } = useContext(CurrentUserContext)

  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    currentUser
      ? {
          key: '2',
          icon: <UserOutlined />,
          label: <Link to={`/profile/${currentUser.nickname}`}>My profile</Link>,
        }
      : null,
    {
      key: '3',
      icon: <AreaChartOutlined />,
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
    },
    {
      key: '4',
      icon: <FileTextOutlined />,
      label: <Link to="/articles">Articles</Link>,
    },
  ]

  useEffect(() => {
    const getSelectedKeys = (): string[] => {
      if (pathname === '/') return ['1']
      if (pathname.startsWith('/profile')) return ['2']
      if (pathname.startsWith('/cryptocurrencies')) return ['3']
      if (pathname.startsWith('/articles')) return ['4']

      return []
    }

    setSelectedKeys(getSelectedKeys())
  }, [pathname])

  useEffect(() => {
    localStorage.setItem('tcomSidebarCollapsed', JSON.stringify(collapsed))
  }, [collapsed])

  return (
    <Sider
      theme="dark"
      collapsible
      collapsed={collapsed}
      style={{ height: '100%' }}
      onCollapse={(value) => setCollapsed(value)}
    >
      <Link to="/">
        <h1 className={styles.logo}>
          {collapsed ? null : <span>The count of money</span>}
          <span role="img" aria-label="Money bag">
            💰
          </span>
        </h1>
      </Link>
      <Menu theme="dark" selectedKeys={selectedKeys} mode="inline" items={menuItems} />
    </Sider>
  )
}
