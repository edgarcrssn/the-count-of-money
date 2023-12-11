import React, { useState } from 'react'
import { Button, Popconfirm, Select, Switch, Table, Typography } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { cryptoService } from '../../../../services/cryptoServices'
import { ColumnsType } from 'antd/es/table'
import { toast } from 'sonner'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import { CryptoLabel } from '../../general/CryptoLabel/CryptoLabel'
import { Cryptocurrency } from '@prisma/client'

type DataType = Cryptocurrency & {
  key: string
}

export const CryptocurrenciesTable = () => {
  const defaultCrypto: Cryptocurrency = {
    id: '',
    name: '',
    symbol: '',
    image: '',
    available: true,
  }

  const [newCrypto, setNewCrypto] = useState<Cryptocurrency>(defaultCrypto)

  const queryClient = useQueryClient()

  const storedCryptos = useQuery('storedCryptos', cryptoService.getStoredCryptos)
  const nonStoredCryptos = useQuery('nonStoredCryptos', cryptoService.getNonStoredCryptos)

  const editCrypto = useMutation(cryptoService.editStoredCrypto, {
    onSuccess: ({ editedCrypto }) => {
      toast.success(`${editedCrypto.name} is now ${editedCrypto.available ? 'available' : 'unavailable'}`)
      queryClient.invalidateQueries('storedCryptos')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const deleteCrypto = useMutation(cryptoService.deletedStoredCrypto, {
    onSuccess: ({ deletedCrypto }) => {
      toast.success(`${deletedCrypto.name} has been deleted successfully`)
      queryClient.invalidateQueries('storedCryptos')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const addCrypto = useMutation(cryptoService.addStoredCrypto, {
    onSuccess: ({ newCrypto }) => {
      setNewCrypto(defaultCrypto)
      toast.success(`${newCrypto.name} has been added successfully`)
      queryClient.invalidateQueries('storedCryptos')
      queryClient.invalidateQueries('nonStoredCryptos')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  let dataSource: DataType[] | undefined = storedCryptos.data
    ?.sort((a, b) => a.name.localeCompare(b.name))
    .map((storedCrypto) => ({
      key: storedCrypto.id,
      ...storedCrypto,
    }))

  dataSource = [
    ...(dataSource || []),
    { key: 'add-new', name: 'Add an item', available: true, symbol: '', id: '', image: '' },
  ]

  const columns: ColumnsType<DataType> = [
    {
      title: 'Coin',
      dataIndex: 'coin',
      render: (_, record) => {
        if (record.key === 'add-new')
          return (
            <Select
              style={{ width: '16rem' }}
              allowClear
              loading={nonStoredCryptos.isLoading}
              value={newCrypto.id}
              options={nonStoredCryptos.data?.map((nonStoredCrypto) => ({
                label: nonStoredCrypto.name,
                value: nonStoredCrypto.id,
              }))}
              onChange={(value) =>
                setNewCrypto(nonStoredCryptos.data?.find((item) => item.id === value) || defaultCrypto)
              }
            />
          )
        return <CryptoLabel crypto={record} />
      },
    },
    {
      title: 'Available',
      dataIndex: 'available',
      width: '0',
      render: (_, record) => {
        if (record.key === 'add-new')
          return (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Switch
                checked={newCrypto.available || false}
                onChange={(checked) => setNewCrypto({ ...newCrypto, available: checked })}
              />
            </div>
          )
        return (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Switch
              checked={record.available || false}
              onChange={(checked) => editCrypto.mutate({ cryptoId: record.id, editCryptoDto: { available: checked } })}
            />
          </div>
        )
      },
    },
    {
      title: 'Actions',
      width: '0',
      render: (_, record) => {
        if (record.key === 'add-new')
          return (
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => addCrypto.mutate(newCrypto)}
              disabled={newCrypto.id === ''}
              loading={addCrypto.isLoading}
            >
              Add new coin
            </Button>
          )
        return (
          <Popconfirm
            title="Delete coin"
            description={`Are you sure to delete ${record.name}?`}
            okText="Yes"
            onConfirm={() => deleteCrypto.mutate(record.id)}
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
      <Typography.Title level={2}>Cryptocurrencies</Typography.Title>
      <Table columns={columns} dataSource={dataSource} loading={storedCryptos.isLoading} bordered pagination={false} />
    </section>
  )
}
