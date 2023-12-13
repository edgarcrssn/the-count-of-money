import React, { useState } from 'react'
import { Button, Card, Empty, Popconfirm, Tag } from 'antd'
import { CryptoLabel } from '../../CryptoLabel/CryptoLabel'
import styles from './TrackedCryptocurrenciesCard.module.scss'
import { useQuery } from 'react-query'
import { cryptoService } from '../../../../../services/cryptoServices'
import { CloseOutlined, PlusOutlined } from '@ant-design/icons'
import { TrackCryptocurrencyModal } from '../../../modals/TrackCryptocurrencyModal/TrackCryptocurrencyModal'
import { Cryptocurrency } from '@prisma/client'

type Props = {
  cryptocurrencies: Cryptocurrency[]
  editable?: boolean
}

export const TrackedCryptocurrenciesCard = ({ cryptocurrencies, editable = false }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const untrackCryptocurrency = (cryptoId: string) => {
    if (!editable) return
    console.log(cryptoId)
  }

  const {
    data: availableCryptocurrencies,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: 'availableCryptocurrencies',
    queryFn: cryptoService.getStoredCryptos,
  })

  const trackedCryptocurrenciesIds = cryptocurrencies.map((crypto) => crypto.id)

  return (
    <>
      <Card
        title="Tracked cryptocurrencies"
        actions={
          editable
            ? [
                <Button key={1} icon={<PlusOutlined />} disabled={isLoading}>
                  Track new cryptocurrency
                </Button>,
              ]
            : undefined
        }
      >
        {cryptocurrencies.length <= 0 ? (
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
          </div>
        )}
      </Card>
      {isSuccess ? (
        <TrackCryptocurrencyModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          cryptocurrencies={availableCryptocurrencies.filter(
            (crypto) => !trackedCryptocurrenciesIds.includes(crypto.id),
          )}
        />
      ) : null}
    </>
  )
}
