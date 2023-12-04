import React from 'react'
import { HomeOutlined, UserOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'

// TODO https://ant.design/components/breadcrumb
export const BreadcrumbContainer = () => (
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
