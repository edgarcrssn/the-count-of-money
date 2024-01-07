import { body } from 'express-validator'
import { fetchCryptos } from './cryptos.service'
import { CoinGeckoCryptoMarketData } from '@the-count-of-money/types'

export const createCryptoValidator = [
  body('id').notEmpty().isString().withMessage('must be a string'),
  body('available').optional().isBoolean().withMessage('must be a boolean'),
]

export const editCryptoValidator = [body('available').isBoolean().withMessage('must be a boolean')]

export const isCryptoAvailable = async (id: string, userCurrency?: string) => {
  const params = new URLSearchParams({
    vs_currency: userCurrency || 'usd',
  })

  const cryptos: CoinGeckoCryptoMarketData[] = await fetchCryptos('/coins/markets', params)
  const availableCryptos = cryptos.map((crypto) => crypto.id)

  return availableCryptos.includes(id)
}
