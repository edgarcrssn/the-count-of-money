import React, { useContext, useEffect, useState } from 'react'
import { CurrentUserContext } from '../../context/CurrentUser/CurrentUserContext'
import { cryptoService } from '../../../services/cryptoService'
import { useQuery } from 'react-query'
import { Empty, Typography } from 'antd'
import { Link } from 'react-router-dom'
import { CryptocurrencyWidget } from '../../components/general/CryptocurrencyWidget/CryptocurrencyWidget'

const Cryptocurrencies = () => {
  const { currentUser } = useContext(CurrentUserContext)

  const currentUserCryptocurrencies = useQuery({
    queryKey: 'currentUserCryptocurrencies',
    queryFn: () => cryptoService.getUserTrackedCryptos(currentUser!.nickname),
    enabled: currentUser ? true : false,
  })

  const availableCryptocurrencies = useQuery({
    queryKey: 'availableCryptocurrencies',
    queryFn: cryptoService.getStoredCryptos,
    enabled: currentUser ? false : true,
  })

  const [cryptocurrencies, setCryptocurrencies] = useState(
    currentUserCryptocurrencies.data || availableCryptocurrencies.data || [],
  )

  useEffect(() => {
    if (currentUser) setCryptocurrencies(currentUserCryptocurrencies.data || [])
    else setCryptocurrencies(availableCryptocurrencies.data || [])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser])

  return (
    <>
      <Typography.Title level={1} style={{ textAlign: 'center' }}>
        {currentUser ? 'Your cryptocurrencies' : 'Available cryptocurrencies'}
      </Typography.Title>
      <Typography.Text type="secondary" style={{ textAlign: 'center' }}>
        {currentUser ? (
          <>
            Manage your tracked cryptocurrencies in <Link to={`/profile/${currentUser.nickname}`}>your profile</Link>
          </>
        ) : (
          'You can manage your tracked cryptocurrencies by creating an account'
        )}
      </Typography.Text>
      <div style={{ marginTop: '1rem' }}>
        {cryptocurrencies.length === 0 ? (
          <Empty />
        ) : (
          cryptocurrencies.map((cryptocurrency) => (
            <CryptocurrencyWidget key={cryptocurrency.id} cryptocurrency={cryptocurrency} />
          ))
        )}
      </div>
    </>
  )
}

export default Cryptocurrencies
