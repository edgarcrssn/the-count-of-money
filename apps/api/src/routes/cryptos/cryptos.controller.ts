import { Request, Response } from 'express'
import { createCrypto, deleteCrypto, fetchCryptos, getUserCurrency } from './cryptos.service'
import { isValidCryptoId } from './cryptos.validator'

// TODO: Push allCryptos + EnableCryptos for Admin, and only EnableCryptos for User
export const getCryptosController = async (req: Request, res: Response) => {
  const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
  const cryptocurrencies = await fetchCryptos('/coins/markets', userCurrency)
  res.send({ cryptocurrencies })
}

export const getCryptoByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
    const cryptocurrency = await fetchCryptos(`/coins/${id}`, userCurrency)
    res.send({ cryptocurrency })
  } catch (error) {
    res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

export const getCryptoPriceHistoryController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const period = req.query.period
    const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
    const cryptoHistory = await fetchCryptos(`/coins/${id}/market_chart?&days=${period}`, userCurrency)
    res.send({ cryptoHistory })
  } catch (error) {
    res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

export const postCryptoController = async (req: Request, res: Response) => {
  const { id } = req.body
  const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
  const cryptos = await fetchCryptos('/coins/markets', userCurrency)
  const cryptoIds = cryptos.map((crypto) => ({ id: crypto.id }))

  try {
    let status = 200
    const cryptocurrency = isValidCryptoId(id, cryptoIds)
      ? await createCrypto(id)
      : ((status = 400), { message: 'Invalid crypto name' })

    res.status(cryptocurrency instanceof Error ? 500 : status).json({ createdCrypto: cryptocurrency })
  } catch (error) {
    res.status(500).send(error)
  }
}

export const deleteCryptoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params

    const deletedCrypto = await deleteCrypto(id)
    res.send({ deletedCrypto })
  } catch (error) {
    res.status(500).send({ error: 'An error occurred while deleting the cryptocurrency' })
  }
}

// TODO : getEnableCryptosController (database request to get all IDs of enabled cryptos)
