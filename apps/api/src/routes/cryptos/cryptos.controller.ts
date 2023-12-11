import { Request, Response } from 'express'
import { createCrypto, deleteCrypto, fetchCryptos, getUserCurrency } from './cryptos.service'

// TODO: Push allCryptos + EnableCryptos for Admin, and only EnableCryptos for User
export const getCryptosController = async (req: Request, res: Response) => {
  try {
    const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
    const cryptocurrencies = await fetchCryptos('/coins/markets', userCurrency)
    res.send({ cryptocurrencies })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

export const getCryptoByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
    const cryptocurrency = await fetchCryptos(`/coins/${id}`, userCurrency)
    res.send({ cryptocurrency })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

export const getCryptoPriceHistoryController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const period = req.query?.period
    const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
    const cryptoHistory = await fetchCryptos(`/coins/${id}/market_chart?&days=${period}`, userCurrency)
    res.send({ cryptoHistory })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

export const postCryptoController = async (req: Request, res: Response) => {
  const { name } = req.body
  const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
  const cryptos = (await fetchCryptos('/coins/markets', userCurrency)) as { id: string }[]
  const availableCryptos = cryptos.map((crypto) => crypto.id)

  if (!availableCryptos.includes(name)) return res.status(400).send({ message: 'Invalid crypto name' })

  try {
    const newCrypto = await createCrypto(name)
    res.status(200).json({ newCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send(error)
  }
}

export const deleteCryptoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedCrypto = await deleteCrypto(+id)
    res.send({ deletedCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ error: 'An error occurred while deleting the cryptocurrency' })
  }
}

// TODO : getEnableCryptosController (database request to get all IDs of enabled cryptos)
