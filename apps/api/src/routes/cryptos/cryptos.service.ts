import { Prisma, PrismaClient } from '@prisma/client'
import { EditCryptoDto } from '@the-count-of-money/types'
import axios from 'axios'
const prisma = new PrismaClient()

export const getStoredCryptos = async (onlyAvailable: boolean = false) => {
  try {
    const storedCryptos = await prisma.cryptocurrency.findMany({
      where: onlyAvailable ? { available: true } : undefined,
    })

    return storedCryptos
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw error
  }
}

export const createCrypto = async (name: string) => {
  try {
    const newCrypto = await prisma.cryptocurrency.create({
      data: { name },
    })
    return newCrypto
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        const target = error.meta.target as string[]
        throw { code: 409, message: `This ${target[0]} is already taken` }
      }
    }
    throw error
  }
}

export const editCrypto = async (id: number, editCryptoDto: EditCryptoDto) => {
  try {
    const editedCrypto = await prisma.cryptocurrency.update({
      where: { id },
      data: editCryptoDto,
    })

    return editedCrypto
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw { code: 404, message: 'This crypto does not exist' }
      } else if (error.code === 'P2002') {
        const target = error.meta.target as string[]
        throw { code: 409, message: `This ${target[0]} is already taken` }
      }
    }
    throw error
  }
}

export const deleteCrypto = async (id: number) => {
  try {
    const deletedCrypto = await prisma.cryptocurrency.delete({
      where: { id },
    })

    return deletedCrypto
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw { code: 404, message: 'This crypto does not exist' }
      }
    }
    throw error
  }
}

export const fetchCryptos = async (endpoint: string, currency?: string) => {
  try {
    const response = await axios.get(`${process.env.COINGECKO_API_URL}${endpoint}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
      },
      params: {
        vs_currency: currency?.toLowerCase() || 'eur',
      },
    })
    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred while fetching data from CoinGecko API: ', error)
    return []
  }
}

export const getUserCurrency = async (userId: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { default_currency: true },
    })

    return user?.default_currency.name
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw { code: 404, message: 'This user does not exist' }
      }
    }
    throw error
  }
}
