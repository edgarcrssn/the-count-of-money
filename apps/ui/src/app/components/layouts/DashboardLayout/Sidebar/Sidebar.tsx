import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Sidebar.module.scss'
import {
  AreaChartOutlined,
  FileTextOutlined,
  HomeOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import type { MenuProps, TourProps } from 'antd'
import { Layout, Menu, Tour } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../../../context/CurrentUser/CurrentUserContext'
const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const Sidebar = () => {
  const { pathname } = useLocation()
  const { currentUser } = useContext(CurrentUserContext)

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const storedCollapsed = localStorage.getItem('sidebarIsCollapsed')
    return storedCollapsed ? JSON.parse(storedCollapsed) : false
  })
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false)

  const handleTourClose = () => {
    localStorage.setItem('tourHasBeenViewed', JSON.stringify(true))
    setIsTourOpen(false)
  }

  const homeLabel = useRef<HTMLAnchorElement>(null)
  const cryptocurrenciesLabel = useRef<HTMLAnchorElement>(null)
  const articlesLabel = useRef<HTMLAnchorElement>(null)
  const myProfileLabel = useRef<HTMLAnchorElement>(null)
  const settingsLabel = useRef<HTMLAnchorElement>(null)

  const tourSteps: TourProps['steps'] = [
    {
      title: 'View the dashboard',
      description: 'Explore combined cryptocurrency and article dashboards for comprehensive insights at a glance.',
      target: () => homeLabel.current!.parentElement!.parentElement!,
    },
    {
      title: 'View cryptocurrency prices',
      description: 'Track real-time cryptocurrency prices on a user-friendly page for informed market insights.',
      target: () => cryptocurrenciesLabel.current!.parentElement!.parentElement!,
    },
    {
      title: 'View crypto related articles',
      description: 'Browse articles on cryptocurrency-related topics for valuable insights and updates.',
      target: () => articlesLabel.current!.parentElement!.parentElement!,
    },
  ]

  if (currentUser) {
    tourSteps.push({
      title: 'View your profile',
      description: 'Explore and manage your profile details for a personalized and tailored experience.',
      target: () => myProfileLabel.current!.parentElement!.parentElement!,
    })
    tourSteps.push({
      title: 'Manage your settings',
      description:
        'Tailor your crypto experience by updating preferences. Choose favorite currencies, manage followed cryptocurrencies, and customize settings for a personalized crypto journey.',
      target: () => settingsLabel.current!.parentElement!.parentElement!,
    })
  }

  const menuItems: MenuItem[] = [
    {
      key: '1',
      icon: <HomeOutlined />,
      label: (
        <Link ref={homeLabel} to="/">
          Home
        </Link>
      ),
    },
    {
      key: '2',
      icon: <AreaChartOutlined />,
      label: (
        <Link ref={cryptocurrenciesLabel} to="/cryptocurrencies">
          Cryptocurrencies
        </Link>
      ),
    },
    {
      key: '3',
      icon: <FileTextOutlined />,
      label: (
        <Link ref={articlesLabel} to="/articles">
          Articles
        </Link>
      ),
    },
    currentUser
      ? {
          key: '4',
          icon: <UserOutlined />,
          label: (
            <Link ref={myProfileLabel} to={`/profile/${currentUser.nickname}`}>
              My profile
            </Link>
          ),
        }
      : null,
    currentUser
      ? {
          key: '5',
          icon: <SettingOutlined />,
          label: (
            <Link ref={settingsLabel} to="/settings">
              Settings
            </Link>
          ),
        }
      : null,
    {
      key: '6',
      icon: <QuestionCircleOutlined />,
      label: <span>Help</span>,
      onClick: () => setIsTourOpen(true),
    },
  ]

  useEffect(() => {
    const getSelectedKeys = (): string[] => {
      if (pathname === '/') return ['1']
      if (pathname.startsWith('/cryptocurrencies')) return ['2']
      if (pathname.startsWith('/articles')) return ['3']
      if (pathname.startsWith('/profile')) return ['4']
      if (pathname.startsWith('/settings')) return ['5']

      return []
    }

    setSelectedKeys(getSelectedKeys())
  }, [pathname])

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
        theme="dark"
        style={{ height: '100%' }}
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
