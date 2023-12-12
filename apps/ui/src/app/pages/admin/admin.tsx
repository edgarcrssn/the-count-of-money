import React from 'react'
import withAdminRole from '../../components/hoc/withAdminRole'
import { CryptocurrenciesTable } from '../../components/tables/CryptocurrenciesTable/CryptocurrenciesTable'
import { Typography } from 'antd'
import { RssSourcesTable } from '../../components/tables/RssSourcesTable/RssSourcesTable'

const Admin = () => {
  return (
    <>
      <Typography.Title level={1} style={{ textAlign: 'center' }}>
        Administration
      </Typography.Title>
      <CryptocurrenciesTable />
      <RssSourcesTable />
    </>
  )
}

export default withAdminRole(Admin)
