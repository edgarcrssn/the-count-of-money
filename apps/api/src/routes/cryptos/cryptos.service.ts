import { Cryptocurrency, Prisma, PrismaClient } from '@prisma/client'
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

export const createCrypto = async (cryptocurrency: Cryptocurrency) => {
  try {
    const newCrypto = await prisma.cryptocurrency.create({
      data: cryptocurrency,
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

export const editCrypto = async (id: string, editCryptoDto: EditCryptoDto) => {
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

export const deleteCrypto = async (id: string) => {
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

export const getUserTrackedCryptos = async (nickname: string): Promise<Cryptocurrency[]> => {
  try {
    const trackedCryptos = await prisma.user.findUnique({
      where: { nickname },
      select: {
        crypto_currencies: {
          where: { available: true },
          select: {
            id: true,
            name: true,
            symbol: true,
            image: true,
            available: true,
          },
        },
      },
    })

    return trackedCryptos?.crypto_currencies || []
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw { code: 404, message: 'User Not Found' }
      }
    }
    throw error
  }
}

export const manageCryptoTracking = async (userId: number, cryptoId: string, untrack: boolean = false) => {
  const action = untrack ? 'disconnect' : 'connect'

  try {
    const cryptoToManage = await prisma.cryptocurrency.findUnique({
      where: { id: cryptoId },
    })

    if (!cryptoToManage) throw { code: 404, message: 'Crypto Not Found' }

    await prisma.user.update({
      where: { id: userId },
      data: {
        crypto_currencies: {
          [action]: {
            id: cryptoId,
          },
        },
      },
    })

    return cryptoToManage
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') throw { code: 404, message: 'User Not Found' }
    }
    throw error
  }
}

export const fetchCryptos = async (endpoint: string, params?: URLSearchParams) => {
  try {
    const response = await axios.get(`${process.env.COINGECKO_API_URL}${endpoint}${params ? `?${params}` : ''}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
      },
    })
    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('An error occurred while fetching data from CoinGecko API: ', error)
    throw error
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
