import { Button, Popconfirm, Typography } from 'antd'
import { rssSourceService } from '../../../../services/rssSourceService'
import React from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import Table, { ColumnsType } from 'antd/es/table'
import { RssSource } from '@prisma/client'
import { DeleteOutlined } from '@ant-design/icons'
import { toast } from 'sonner'

type DataType = RssSource & {
  key: number | string
}

export const RssSourcesTable = () => {
  // const defaultRssSource: RssSource = {
  //   id: -1,
  //   url: '',
  // }

  // const [newRssSource, setNewRssSource] = useState<RssSource>(defaultRssSource)

  const queryClient = useQueryClient()

  const storedRssSources = useQuery('storedRssSources', rssSourceService.getStoredRssSources)

  const deleteCrypto = useMutation(rssSourceService.deleteStoredRssSource, {
    onSuccess: ({ deletedRssSource }) => {
      toast.success(`The source has been deleted successfully`)
      queryClient.invalidateQueries('storedRssSources')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  // const addCrypto = useMutation(cryptoService.addStoredCrypto, {
  //   onSuccess: ({ newCrypto }) => {
  //     setNewCrypto(defaultCrypto)
  //     toast.success(`${newCrypto.name} has been added successfully`)
  //     queryClient.invalidateQueries('storedCryptos')
  //     queryClient.invalidateQueries('nonStoredCryptos')
  //   },
  //   onError: (error: Error) => {
  //     toast.error(error.message)
  //   },
  // })

  let dataSource: DataType[] | undefined = storedRssSources.data
    ?.sort((a, b) => a.id - b.id)
    .map((storedRssSource) => ({
      key: storedRssSource.id,
      ...storedRssSource,
    }))

  dataSource = [...(dataSource || []), { key: 'add-new', id: 0, url: 'Add an item' }]

  const columns: ColumnsType<DataType> = [
    {
      title: 'Source',
      dataIndex: 'source',
      render: (_, record) => (
        <a href={record.url} target="_blank" rel="noreferrer">
          {record.url}
        </a>
      ),
    },
    {
      title: 'Actions',
      width: '0',
      render: (_, record) => {
        if (record.key === 'add-new') return 'OK'
        // <Button
        //   type="primary"
        //   icon={<PlusOutlined />}
        //   onClick={() => addCrypto.mutate(newRssSource)}
        //   disabled={newRssSource.url === ''}
        //   loading={addCrypto.isLoading}
        // >
        //   Add new coin
        // </Button>
        return (
          <Popconfirm
            title="Delete source"
            description="Are you sure to delete this source?"
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
      <Typography.Title level={2}>RSS sources</Typography.Title>
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={storedRssSources.isLoading}
        bordered
        pagination={false}
      />
    </section>
  )
}
