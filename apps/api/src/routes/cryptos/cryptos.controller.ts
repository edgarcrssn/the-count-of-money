import { Request, Response } from 'express'
import {
  createCrypto,
  deleteCrypto,
  editCrypto,
  fetchCryptos,
  getStoredCryptos,
  getUserCurrency,
} from './cryptos.service'
import { Role } from '@prisma/client'
import { CreateCryptoDto, EditCryptoDto } from '@the-count-of-money/types'
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

export const editStoredCryptoByIdController = async (req: Request, res: Response) => {
  const { id } = req.params
  const body = req.body as EditCryptoDto

  if (body.name && !(await isCryptoAvailable(body.name)))
    return res.status(400).send({ message: 'This crypto is not valid' })

  try {
    const editedCrypto = await editCrypto(+id, body)
    res.status(200).send({ editedCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while retrieving stored cryptos: ', error })
  }
}

export const postStoredCryptoController = async (req: Request, res: Response) => {
  const { name } = req.body as CreateCryptoDto
  const userCurrency = req.user ? await getUserCurrency(req.user.id) : null

  if (!(await isCryptoAvailable(name, userCurrency)))
    return res.status(400).send({ message: 'This crypto is not valid' })

  try {
    const newCrypto = await createCrypto(name)
    res.status(200).json({ newCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send(error)
  }
}

export const deleteStoredCryptoByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const deletedCrypto = await deleteCrypto(+id)
    res.send({ deletedCrypto })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ error: 'An error occurred while deleting the cryptocurrency' })
  }
}

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

// TODO : getEnableCryptosController (database request to get all IDs of enabled cryptos)
