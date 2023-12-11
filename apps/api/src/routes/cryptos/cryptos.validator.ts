import { body } from 'express-validator'
import { fetchCryptos } from './cryptos.service'

export const createCryptoValidator = [
  body('name').notEmpty().isString().withMessage('must be a string'),
  body('available').optional().isBoolean().withMessage('must be a boolean'),
]

export const editCryptoValidator = [
  body('name').optional().notEmpty().withMessage('must not be empty').isString().withMessage('must be a string'),
  body('available').optional().isBoolean().withMessage('must be a boolean'),
]

export const isCryptoAvailable = async (name: string, userCurrency?: string) => {
  const cryptos = (await fetchCryptos('/coins/markets', userCurrency)) as { id: string }[]
  const availableCryptos = cryptos.map((crypto) => crypto.id)

  return availableCryptos.includes(name)
}
