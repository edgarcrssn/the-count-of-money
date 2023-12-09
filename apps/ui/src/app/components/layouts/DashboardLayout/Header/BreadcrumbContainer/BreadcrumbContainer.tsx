import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { capitalize } from '../../../../../../utils/capitalize'
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb'

const NON_EXISTING_PATHS = ['profile']

export const BreadcrumbContainer = () => {
  const { pathname } = useLocation()
  const pathSnippets = pathname.split('/').filter((i) => i)

  const breadcrumbItems: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = pathSnippets.map(
    (snippet, index) => {
      const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
      const isLast = index === pathSnippets.length - 1

      const label = capitalize(snippet)

      return {
        title: isLast || NON_EXISTING_PATHS.includes(snippet) ? label : <Link to={url}>{label}</Link>,
      }
    },
  )

  return (
    <Breadcrumb
      items={[
        {
          title:
            pathname === '/' ? (
              <HomeOutlined />
            ) : (
              <Link to="/">
                <HomeOutlined />
              </Link>
            ),
        },
        ...breadcrumbItems,
      ]}
    />
  )
}
