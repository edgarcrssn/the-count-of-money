import React from 'react'
import withAdminRole from '../../components/hoc/withAdminRole'
import { CryptocurrenciesTable } from '../../components/tables/CryptocurrenciesTable/CryptocurrenciesTable'
import { Divider, Typography } from 'antd'
import { RssSourcesTable } from '../../components/tables/RssSourcesTable/RssSourcesTable'

const Admin = () => {
  return (
    <>
      <Typography.Title level={1}>Administration</Typography.Title>
      <Divider />
      <CryptocurrenciesTable />
      <Divider />
      <RssSourcesTable />
    </>
  )
}

export default withAdminRole(Admin)
