import React from 'react'
import withAdminRole from '../../components/hoc/withAdminRole'
import { CryptocurrenciesTable } from '../../components/tables/CryptocurrenciesTable/CryptocurrenciesTable'
import { Typography } from 'antd'

const Admin = () => {
  return (
    <div>
      <Typography.Title level={1}>Administration</Typography.Title>
      <CryptocurrenciesTable />
    </div>
  )
}

export default withAdminRole(Admin)
