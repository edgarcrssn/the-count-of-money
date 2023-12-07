import React from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { useLocation } from 'react-router-dom'

// TODO https://ant.design/components/breadcrumb
export const BreadcrumbContainer = () => {
  const { pathname } = useLocation()
  console.log(pathname)

  return (
    <Breadcrumb
      items={[
        {
          href: '',
          title: <HomeOutlined />,
        },
        {
          href: '',
          title: (
            <>
              <UserOutlined />
              <span>Application List</span>
            </>
          ),
        },
        {
          title: 'Application',
        },
      ]}
    />
  )
}
