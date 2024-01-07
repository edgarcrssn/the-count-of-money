import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Sidebar.module.scss'
import {
  AreaChartOutlined,
  FileTextOutlined,
  LeftCircleOutlined,
  LockOutlined,
  QuestionCircleOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps, TourProps } from 'antd'
import { Layout, Menu, Tour } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../../../context/CurrentUser/CurrentUserContext'
import { Theme, ThemeContext } from '../../../../context/Theme/ThemeContext'
import { SunOutlined } from '../../../icons/SunOutlined'
import { MoonOutlined } from '../../../icons/MoonOutlined'

const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const Sidebar = () => {
  const { pathname } = useLocation()
  const { currentUser } = useContext(CurrentUserContext)
  const { currentTheme, setCurrentTheme } = useContext(ThemeContext)

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const storedCollapsed = localStorage.getItem('sidebarIsCollapsed')
    return storedCollapsed ? JSON.parse(storedCollapsed) : false
  })

  const cryptocurrencies = useRef<HTMLElement>(null)
  const articles = useRef<HTMLElement>(null)
  const myProfile = useRef<HTMLElement>(null)

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false)

  const tourSteps: TourProps['steps'] = [
    {
      title: 'View cryptocurrency prices',
      description: 'Track real-time cryptocurrency prices on a user-friendly page for informed market insights.',
      target: () => cryptocurrencies.current!.parentElement!,
    },
    {
      title: 'View crypto related articles',
      description: 'Browse articles on cryptocurrency-related topics for valuable insights and updates.',
      target: () => articles.current!.parentElement!,
    },
    {
      title: `${currentUser ? '' : '🔒 '}View your profile`,
      description: `${
        currentUser ? '' : 'You must be logged in to access this page. '
      }Explore and manage your profile details for a personalized and tailored experience.`,
      target: () => myProfile.current!.parentElement!,
    },
  ]

  const handleTourClose = () => {
    localStorage.setItem('tourHasBeenViewed', JSON.stringify(true))
    setIsTourOpen(false)
  }

  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <AreaChartOutlined ref={cryptocurrencies} />,
      label: <Link to="/cryptocurrencies">Cryptocurrencies</Link>,
    },
    {
      key: '2',
      icon: <FileTextOutlined ref={articles} />,
      label: <Link to="/articles">Articles</Link>,
    },
    {
      key: '3',
      icon: <UserOutlined ref={myProfile} />,
      disabled: !currentUser,
      label: (
        <Link to={`/profile/${currentUser?.nickname}`} style={currentUser ? undefined : { pointerEvents: 'none' }}>
          My profile
        </Link>
      ),
    },
    currentUser?.role === 'ADMIN'
      ? {
          key: '4',
          icon: <LockOutlined />,
          label: <Link to="/admin">Admin</Link>,
        }
      : null,
  ]

  const menuFooterItems: MenuItem[] = [
    {
      key: '5',
      icon: currentTheme === Theme.LIGHT ? <MoonOutlined /> : <SunOutlined />,
      label: `${currentTheme === Theme.LIGHT ? 'Dark' : 'Light'} theme`,
      onClick: () => setCurrentTheme(currentTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT),
    },
    {
      key: '6',
      icon: <QuestionCircleOutlined />,
      label: 'Help',
      onClick: () => setIsTourOpen(true),
    },
    {
      key: '7',
      icon: <LeftCircleOutlined rotate={collapsed ? 180 : 0} />,
      label: collapsed ? 'Expand' : 'Collapse',
      onClick: () => setCollapsed(!collapsed),
    },
  ]

  const getSelectedKeys = (): string[] => {
    if (pathname.startsWith('/cryptocurrencies')) return ['1']
    if (pathname.startsWith('/articles')) return ['2']
    if (pathname.startsWith(`/profile/${currentUser?.nickname}`)) return ['3']
    if (pathname.startsWith('/admin')) return ['4']

    return []
  }

  useEffect(() => {
    localStorage.setItem('sidebarIsCollapsed', JSON.stringify(collapsed))
  }, [collapsed])

  useEffect(() => {
    const hasTourBeenViewed: boolean = JSON.parse(localStorage.getItem('tourHasBeenViewed') || JSON.stringify(false))
    if (!hasTourBeenViewed) setIsTourOpen(true)
  }, [])

  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sideBar}
        trigger={null}
        theme={currentTheme}
        style={{
          background: 'none',
        }}
      >
        <div className={styles.sideBarContent}>
          <Menu
            items={menuItems}
            selectedKeys={getSelectedKeys()}
            mode="inline"
            theme={currentTheme}
            className={styles.menu}
            style={{
              background: 'none',
              border: 'none',
            }}
          />
          <Menu
            items={menuFooterItems}
            selectedKeys={[]}
            mode="inline"
            theme={currentTheme}
            style={{
              background: 'none',
              border: 'none',
            }}
          />
        </div>
      </Sider>
      <Tour
        open={isTourOpen}
        onClose={handleTourClose}
        onFinish={handleTourClose}
        steps={tourSteps}
        placement="right"
      />
    </>
  )
}
