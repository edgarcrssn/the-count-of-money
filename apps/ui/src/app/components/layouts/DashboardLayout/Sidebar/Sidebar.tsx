import React, { useContext, useEffect, useRef, useState } from 'react'
import styles from './Sidebar.module.scss'
import { AreaChartOutlined, FileTextOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons'
import type { MenuProps, TourProps } from 'antd'
import { Layout, Menu, Tour } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../../../context/CurrentUserContext'
const { Sider } = Layout

type MenuItem = Required<MenuProps>['items'][number]

export const Sidebar = () => {
  const { pathname } = useLocation()

  const [collapsed, setCollapsed] = useState<boolean>(() => {
    const storedCollapsed = localStorage.getItem('sidebarIsCollapsed')
    return storedCollapsed ? JSON.parse(storedCollapsed) : false
  })
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const [isTourOpen, setIsTourOpen] = useState<boolean>(false)

  const handleTourClose = () => {
    localStorage.setItem('tourHasBeenViewed', 'true')
    setIsTourOpen(false)
  }

  const homeLabel = useRef<HTMLAnchorElement>(null)
  const cryptocurrenciesLabel = useRef<HTMLAnchorElement>(null)
  const articlesLabel = useRef<HTMLAnchorElement>(null)

  const findParent = (element: HTMLElement, levels: number): HTMLElement => {
    let currentElement = element
    for (let i = 0; i < levels; i++) {
      currentElement = currentElement.parentNode as HTMLElement
    }
    return currentElement
  }

  const steps: TourProps['steps'] = [
    {
      title: 'View the dashboard',
      description: 'Explore combined cryptocurrency and article dashboards for comprehensive insights at a glance.',
      target: () => findParent(homeLabel.current!, 2),
    },
    {
      title: 'View cryptocurrency prices',
      description: 'Track real-time cryptocurrency prices on a user-friendly page for informed market insights.',
      target: () => findParent(cryptocurrenciesLabel.current!, 2),
    },
    {
      title: 'View crypto related articles',
      description: 'Browse articles on cryptocurrency-related topics for valuable insights and updates.',
      target: () => findParent(articlesLabel.current!, 2),
    },
  ]

  const { currentUser } = useContext(CurrentUserContext)

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
      label: (
        <Link ref={cryptocurrenciesLabel} to="/cryptocurrencies">
          Cryptocurrencies
        </Link>
      ),
    },
    {
      key: '4',
      icon: <FileTextOutlined />,
      label: (
        <Link ref={articlesLabel} to="/articles">
          Articles
        </Link>
      ),
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
    localStorage.setItem('sidebarIsCollapsed', JSON.stringify(collapsed))
  }, [collapsed])

  useEffect(() => {
    const hasTourBeenViewed = localStorage.getItem('tourHasBeenViewed')
    if (!hasTourBeenViewed || hasTourBeenViewed === 'false') setIsTourOpen(true)
  }, [])

  return (
    <>
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
      <Tour open={isTourOpen} onClose={handleTourClose} onFinish={handleTourClose} steps={steps} placement="right" />
    </>
  )
}
