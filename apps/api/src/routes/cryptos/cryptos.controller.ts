import { Request, Response } from 'express'
import {
  createCrypto,
  deleteCrypto,
  editCrypto,
  fetchCryptos,
  getStoredCryptos,
  getUserCurrency,
  getUserTrackedCryptos,
  manageCryptoTracking,
} from './cryptos.service'
import { Cryptocurrency, Role } from '@prisma/client'
import { CoinGeckoCryptoMarketData, EditCryptoDto } from '@the-count-of-money/types'
import { isCryptoAvailable } from './cryptos.validator'

export const getStoredCryptosController = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user?.role === Role.ADMIN
    const storedCryptos = await getStoredCryptos(!isAdmin)
    res.send({ storedCryptos })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while retrieving stored cryptos: ', error })
  }
}

export const getNonStoredCryptosController = async (req: Request, res: Response) => {
  try {
    const storedCryptos = await getStoredCryptos()
    const allAvailableCryptos: CoinGeckoCryptoMarketData[] = await fetchCryptos('/coins/markets')

    const nonStoredCryptos: Cryptocurrency[] = allAvailableCryptos
      .filter((crypto) => !storedCryptos.some((storedCrypto) => storedCrypto.id === crypto.id))
      .map((crypto) => ({
        id: crypto.id,
        name: crypto.name,
        symbol: crypto.symbol,
        image: crypto.image,
        available: true,
      }))

    res.send({ nonStoredCryptos })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while retrieving non-stored cryptos: ', error })
  }
}

export const editStoredCryptoByIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  const editCryptoDto = req.body as EditCryptoDto

  if (!(await isCryptoAvailable(id))) return res.status(400).send({ message: 'This crypto is not valid' })

  try {
    const editedCrypto = await editCrypto(id, editCryptoDto)
    res.status(200).send({ editedCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while retrieving stored cryptos: ', error })
  }
}

export const postStoredCryptoController = async (req: Request, res: Response) => {
  const createCryptoDto = req.body as Cryptocurrency

  if (!(await isCryptoAvailable(createCryptoDto.id)))
    return res.status(400).send({ message: 'This crypto is not valid' })

  try {
    const newCrypto = await createCrypto(req.body)
    res.status(200).json({ newCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send(error)
  }
}

export const deleteStoredCryptoByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedCrypto = await deleteCrypto(id)
    res.send({ deletedCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ error: 'An error occurred while deleting the cryptocurrency' })
  }
}

export const getUserTrackedCryptosController = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.params
    const trackedCryptos = await getUserTrackedCryptos(nickname)
    console.log(trackedCryptos)

    res.send({ trackedCryptos })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while retrieving the tracked cryptocurrencies' })
  }
}

export const trackCryptoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const trackedCrypto = await manageCryptoTracking(userId, id)
    res.status(201).send({ trackedCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while tracking the cryptocurrency' })
  }
}

export const untrackCryptoController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const untrackedCrypto = await manageCryptoTracking(userId, id, true)
    res.send({ untrackedCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while un-tracking the cryptocurrency' })
  }
}

// TODO: Push allCryptos + EnableCryptos for Admin, and only EnableCryptos for User
export const getCryptosController = async (req: Request, res: Response) => {
  try {
    const userCurrency = req.user ? await getUserCurrency(req.user.id) : null
    const cryptocurrencies: CoinGeckoCryptoMarketData[] = await fetchCryptos('/coins/markets', userCurrency)
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
    // TODO type this
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
    // TODO type this
    const cryptoHistory = await fetchCryptos(`/coins/${id}/market_chart?&days=${period}`, userCurrency)
    res.send({ cryptoHistory })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

// TODO : getEnableCryptosController (database request to get all IDs of enabled cryptos)
