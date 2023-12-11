import React from 'react'
import { Button, Popconfirm, Switch, Table, Typography } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { cryptoService } from '../../../../services/cryptoServices'
import { ColumnsType } from 'antd/es/table'
import { toast } from 'sonner'
import { DeleteOutlined } from '@ant-design/icons'

type DataType = {
  key: number
  name: string
  available: boolean
}

export const CryptocurrenciesTable = () => {
  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery('cryptocurrencies', cryptoService.getStoredCryptos)

  const editCrypto = useMutation(cryptoService.editStoredCrypto, {
    onSuccess: ({ editedCrypto }) => {
      toast.success(`The "${editedCrypto.name}" crypto is now ${editedCrypto.available ? 'available' : 'unavailable'}`)
      queryClient.invalidateQueries('cryptocurrencies')
    },
    onError: (error: Error) => {
      toast.error(error.message)
      queryClient.invalidateQueries('cryptocurrencies')
    },
  })

  const deleteCrypto = useMutation(cryptoService.deletedStoredCrypto, {
    onSuccess: ({ deletedCrypto }) => {
      toast.success(`The "${deletedCrypto.name}" crypto has been successfully deleted`)
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
    },
    {
      title: 'Available',
      dataIndex: 'available',
      render: (_, record) => {
        return (
          <Switch
            checked={record.available}
            onChange={(checked) => editCrypto.mutate({ cryptoId: record.key, editCryptoDto: { available: checked } })}
          />
        )
      },
    },
    {
      title: 'Actions',
      render: (_, record) => {
        return (
          <Popconfirm
            title="Delete crypto"
            description={`Are you sure to delete the ${record.name} crypto?`}
            onConfirm={() => {
              deleteCrypto.mutate(record.key)
            }}
          >
            <Button icon={<DeleteOutlined />} danger>
              Delete
            </Button>
          </Popconfirm>
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
