import React from 'react'
import { Switch, Table, Typography } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { cryptoService } from '../../../../services/cryptoServices'
import { ColumnsType } from 'antd/es/table'
import { toast } from 'sonner'
import { TableInput } from './TableInput/TableInput'

type DataType = {
  key: number
  name: string
  available: boolean
}

export const CryptocurrenciesTable = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery('cryptocurrencies', cryptoService.getStoredCryptos)

  const editMutation = useMutation(cryptoService.editStoredCrypto, {
    onSuccess: ({ editedCrypto }) => {
      toast.success(`The "${editedCrypto.name}" crypto has been edited successfully`)
      queryClient.invalidateQueries('cryptocurrencies')
    },
    onError: (error: Error) => {
      toast.error(error.message)
      queryClient.invalidateQueries('cryptocurrencies')
    },
  })

  const dataSource: DataType[] | undefined = data?.storedCryptos
    .sort((a, b) => a.id - b.id)
    .map((item) => ({
      key: item.id,
      name: item.name,
      available: item.available,
    }))

  const columns: ColumnsType<DataType> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => {
        return (
          <TableInput
            defaultValue={record.name}
            onBlur={(value) => {
              if (value.trim() === record.name) return
              editMutation.mutate({ cryptoId: record.key, editCryptoDto: { name: value.trim() } })
            }}
          />
        )
      },
    },
    {
      title: 'Available',
      dataIndex: 'available',
      render: (_, record) => {
        return (
          <Switch
            checked={record.available}
            onChange={(checked) => editMutation.mutate({ cryptoId: record.key, editCryptoDto: { available: checked } })}
          />
        )
      },
    },
  ]

  return (
    <section>
      <Typography.Title level={2}>Cryptocurrencies management</Typography.Title>
      <Table columns={columns} dataSource={dataSource} loading={isLoading} bordered pagination={false} />
    </section>
  )
}
