import React, { useEffect, useRef, useState } from 'react'
import { Cryptocurrency } from '@prisma/client'
import { Button, Card, Empty, InputRef, Popconfirm, Select, Skeleton, Tag } from 'antd'
import { CryptoLabel } from '../../CryptoLabel/CryptoLabel'
import styles from './TrackedCryptocurrenciesCard.module.scss'
import { useQuery } from 'react-query'
import { cryptoService } from '../../../../../services/cryptoServices'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'

type Props = {
  cryptocurrencies: Cryptocurrency[]
  editable?: boolean
}

export const TrackedCryptocurrenciesCard = ({ cryptocurrencies, editable = false }: Props) => {
  const [selectVisible, setSelectVisible] = useState(false)
  const selectRef = useRef<InputRef>(null)

  const [selectValue, setSelectValue] = useState('')

  useEffect(() => {
    if (selectVisible) {
      selectRef.current?.focus()
    }
  }, [selectVisible])

  const untrackCryptocurrency = (cryptoId: string) => {
    if (!editable) return
    console.log(cryptoId)
  }

  const { data: availableCryptocurrencies, isLoading } = useQuery({
    queryKey: 'availableCryptocurrencies',
    queryFn: cryptoService.getStoredCryptos,
  })

  const cryptocurrenciesITrackIds = cryptocurrencies.map((crypto) => crypto.id)

  const availableCryptocurrenciesIDontTrack = availableCryptocurrencies?.filter(
    (crypto) => !cryptocurrenciesITrackIds.includes(crypto.id),
  )

  console.log(availableCryptocurrenciesIDontTrack)

  const handleInputConfirm = () => {
    if (selectValue && !cryptocurrencies.map((crypto) => crypto.id).includes(selectValue)) {
      // TODO add crypto to tracked
      console.log(selectValue)
    }
    // TODO mettre dans le onSuccess
    setSelectVisible(false)
    setSelectValue('')
  }

  return (
    <Card title="Tracked cryptocurrencies">
      {isLoading ? (
        <Skeleton active />
      ) : !editable && cryptocurrencies.length === 0 ? (
        <Empty />
      ) : (
        <div className={styles.tagsContainer}>
          {cryptocurrencies.map((cryptocurrency) => (
            <Tag
              key={cryptocurrency.id}
              className={styles.tag}
              closable={editable}
              closeIcon={
                <Popconfirm
                  title={`Untrack ${cryptocurrency.name}`}
                  description={`Are you sure to untrack ${cryptocurrency.name}?`}
                  okText="Yes"
                  onConfirm={() => untrackCryptocurrency(cryptocurrency.id)}
                >
                  <CloseOutlined />
                </Popconfirm>
              }
            >
              <CryptoLabel crypto={cryptocurrency} />
            </Tag>
          ))}
          {editable ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Select
                style={{
                  width: 128,
                  height: 32,
                }}
                type="text"
                size="small"
                value={selectValue}
                onChange={(value) => setSelectValue(value)}
                onBlur={handleInputConfirm}
                onPressEnter={handleInputConfirm}
              />
              <Button
                style={{
                  width: 24,
                  height: 24,
                }}
                type="primary"
              ></Button>
            </div>
          ) : null}
        </div>
      )}
    </Card>
  )
}
