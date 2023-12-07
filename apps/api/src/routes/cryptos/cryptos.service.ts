import { PrismaClient } from '@prisma/client'
import axios from 'axios'
const prisma = new PrismaClient()

export const createCrypto = async (id: string) => {
  return await prisma.cryptocurrency.create({
    data: {
      id,
    },
  })
}

export const deleteCrypto = async (id: string) => {
  return await prisma.cryptocurrency.delete({
    where: {
      id,
    },
  })
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
        vs_currency: currency || 'eur',
      },
    })
    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error while fetching data from CoinGecko API: ', error)
    return []
  }
}

export const getUserCurrency = async (userId: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      default_currency: true,
    },
  })

  return user?.default_currency?.name
}
