import axios from 'axios'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'
import { body } from 'express-validator'

dotenv.config()
const prisma = new PrismaClient()

export const postRssValidator = [body('url').isURL().withMessage('must be an URL')]

export const isValidRssSource = async (url: string): Promise<boolean> => {
  const params = new URLSearchParams({
    api_key: process.env.RSS_TO_JSON_API_KEY,
    rss_url: url,
  })

  try {
    const response = await axios.get(`${process.env.RSS_TO_JSON_API_URL}?${params.toString()}`)
    return response.status === 200
  } catch (error) {
    return false
  }
}

export const doesUrlAlreadyExist = async (url: string): Promise<boolean> => {
  const source = await prisma.rssSource.findUnique({
    where: { url },
  })
  return source && true
}
