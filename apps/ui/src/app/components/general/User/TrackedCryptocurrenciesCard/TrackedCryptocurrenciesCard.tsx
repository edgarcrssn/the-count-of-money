import React, { useState } from 'react'
import { Badge, Card, Divider, Empty, Skeleton, Tag } from 'antd'
import { CryptoLabel } from '../../CryptoLabel/CryptoLabel'
import styles from './TrackedCryptocurrenciesCard.module.scss'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { cryptoService } from '../../../../../services/cryptoService'
import { EditOutlined, MinusCircleFilled, PlusCircleFilled } from '@ant-design/icons'
import { toast } from 'sonner'

type Props = {
  nickname: string
  editable?: boolean
}

export const TrackedCryptocurrenciesCard = ({ nickname, editable = false }: Props) => {
  const [editing, setEditing] = useState(false)

  const queryClient = useQueryClient()

  const trackedCryptocurrencies = useQuery({
    queryKey: 'trackedCryptocurrencies',
    queryFn: () => cryptoService.getUserTrackedCryptos(nickname),
  })

  const availableCryptocurrencies = useQuery({
    queryKey: 'availableCryptocurrencies',
    queryFn: cryptoService.getStoredCryptos,
    enabled: editing,
  })

  const trackCrypto = useMutation(cryptoService.trackCrypto, {
    onSuccess: ({ trackedCrypto }) => {
      toast.success(`${trackedCrypto.name} has been tracked successfully`)
      queryClient.invalidateQueries('trackedCryptocurrencies')
      queryClient.invalidateQueries('availableCryptocurrencies')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const untrackCrypto = useMutation(cryptoService.untrackCrypto, {
    onSuccess: ({ untrackedCrypto }) => {
      toast.success(`${untrackedCrypto.name} has been untracked successfully`)
      queryClient.invalidateQueries('trackedCryptocurrencies')
      queryClient.invalidateQueries('availableCryptocurrencies')
    },
    onError: (error: Error) => {
      toast.error(error.message)
    },
  })

  const untrackCryptocurrency = (cryptoId: string) => {
    if (!editable) return
    untrackCrypto.mutate(cryptoId)
  }

  const trackCryptocurrency = (cryptoId: string) => {
    if (!editable) return
    trackCrypto.mutate(cryptoId)
  }

  const renderUntrackedCryptocurrencies = (): React.ReactNode => {
    if (!trackedCryptocurrencies.isSuccess) return null

    if (availableCryptocurrencies.isLoading) return <Skeleton active />

    if (availableCryptocurrencies.isSuccess) {
      const trackedCryptocurrenciesIds = trackedCryptocurrencies.data.map((crypto) => crypto.id)

      const untrackedCryptocurrencies = availableCryptocurrencies.data
        ?.filter((crypto) => !trackedCryptocurrenciesIds.includes(crypto.id))
        .filter((crypto) => crypto.available)

      if (!untrackedCryptocurrencies.length) return <Empty />

      return (
        <div className={styles.tagsContainer}>
          {untrackedCryptocurrencies.map((cryptocurrency) => {
            if (!cryptocurrency.available) return null
            return (
              <Badge
                key={cryptocurrency.id}
                count={editing ? <PlusCircleFilled onClick={() => trackCryptocurrency(cryptocurrency.id)} /> : null}
              >
                <Tag className={styles.tag}>
                  <CryptoLabel crypto={cryptocurrency} />
                </Tag>
              </Badge>
            )
          })}
        </div>
      )
    }
  }

  return (
    <Card
      title={
        <>
          {editable ? <EditOutlined className={styles.editIcon} onClick={() => setEditing(!editing)} /> : null} Tracked
          cryptocurrencies
        </>
      }
    >
      {trackedCryptocurrencies.isLoading ? <Skeleton active /> : null}
      {trackedCryptocurrencies.isError ? <Empty /> : null}
      {trackedCryptocurrencies.isSuccess ? (
        <div>
          {trackedCryptocurrencies.data.length <= 0 ? (
            <Empty />
          ) : (
            <div className={styles.tagsContainer}>
              {trackedCryptocurrencies.data.map((cryptocurrency) => {
                if (!cryptocurrency.available) return null
                return (
                  <Badge
                    key={cryptocurrency.id}
                    count={
                      editing ? <MinusCircleFilled onClick={() => untrackCryptocurrency(cryptocurrency.id)} /> : null
                    }
                  >
                    <Tag className={styles.tag}>
                      <CryptoLabel crypto={cryptocurrency} />
                    </Tag>
                  </Badge>
                )
              })}
            </div>
          )}
          {editing ? (
            <>
              <Divider orientation="left">Untracked cryptos</Divider>
              {renderUntrackedCryptocurrencies()}
            </>
          ) : null}
        </div>
      ) : null}
    </Card>
  )
}
