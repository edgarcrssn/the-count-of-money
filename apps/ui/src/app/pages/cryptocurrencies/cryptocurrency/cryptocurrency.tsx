import { Skeleton } from 'antd'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { cryptoService } from '../../../../services/cryptoService'
import { LineChart } from '../../../components/general/LineChart/LineChart'
import { CryptoLabel } from '../../../components/general/CryptoLabel/CryptoLabel'

export const Cryptocurrency = () => {
  const { cryptocurrency } = useParams()

  const cryptoInfos = useQuery({
    queryKey: ['cryptoInfos', cryptocurrency],
    queryFn: () => cryptoService.getCryptoById(cryptocurrency!),
    enabled: cryptocurrency ? true : false,
  })

  if (!cryptoInfos.isSuccess) return <Skeleton active />

  return (
    <>
      <div style={{ marginBottom: '1rem' }}>
        <CryptoLabel
          crypto={{
            name: cryptoInfos.data.name,
            symbol: cryptoInfos.data.symbol,
            image: cryptoInfos.data.image.small,
          }}
        />
      </div>
      <div>
        Current price: {cryptoInfos.data.market_data.current_price.usd}$
        <LineChart cryptocurrency={cryptoInfos.data} />
      </div>
    </>
  )
}
