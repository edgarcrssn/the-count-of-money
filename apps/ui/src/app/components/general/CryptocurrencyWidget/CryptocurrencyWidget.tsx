import { Cryptocurrency } from '@prisma/client'
import { Divider, Empty, Skeleton } from 'antd'
import React from 'react'
import { CryptoLabel } from '../CryptoLabel/CryptoLabel'
import { useQuery } from 'react-query'
import { cryptoService } from '../../../../services/cryptoService'
import { Link } from 'react-router-dom'

interface Props {
  cryptocurrency: Cryptocurrency
}

export const CryptocurrencyWidget = ({ cryptocurrency }: Props) => {
  const cryptoInfos = useQuery({
    queryKey: ['cryptoInfos', cryptocurrency.id],
    queryFn: () => cryptoService.getCryptoById(cryptocurrency.id),
  })

  return (
    <section>
      <Divider orientation="left" style={{ fontWeight: 'bold' }}>
        <CryptoLabel crypto={cryptocurrency} />
      </Divider>
      {cryptoInfos.isLoading ? (
        <Skeleton active />
      ) : cryptoInfos.isSuccess && cryptoInfos.data.id ? (
        <div>
          {cryptoInfos.data.id}
          <Link to={`/cryptocurrencies/${cryptoInfos.data.id}`}>See more</Link>
        </div>
      ) : (
        <Empty />
      )}
    </section>
  )
}
