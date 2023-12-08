import React from 'react'
import { HomeOutlined } from '@ant-design/icons'
import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const BreadcrumbContainer: React.FC = () => {
  const { pathname } = useLocation()
  const pathSnippets = pathname.split('/').filter((i) => i)

  const breadcrumbItems = pathSnippets.map((snippet, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`
    const isLast = index === pathSnippets.length - 1

    return {
      link: isLast ? undefined : url,
      label: isLast ? capitalizeFirstLetter(snippet) : snippet,
    }
  })

  breadcrumbItems.unshift({
    link: '/',
    label: <HomeOutlined />,
  })

  return <Breadcrumb>{renderBreadcrumbItems(breadcrumbItems)}</Breadcrumb>
}

function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function renderBreadcrumbItems(items: { link?: string; label: React.ReactNode }[]) {
  return items.map((item, index) => (
    <Breadcrumb.Item key={index}>{item.link ? <Link to={item.link}>{item.label}</Link> : item.label}</Breadcrumb.Item>
  ))
}

export default BreadcrumbContainer
