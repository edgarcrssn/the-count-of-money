import axios from 'axios'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()
const prisma = new PrismaClient()

export async function isValidRssSource(url: string): Promise<boolean> {
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

export function isValidUrl(url: string): boolean {
  const urlRegex = /^(http|https):\/\/[^ "]+$/

  return urlRegex.test(url)
}

export async function isUniqueUrl(url: string): Promise<boolean> {
  const source = await prisma.rssSource.findUnique({
    where: {
      url: url,
    },
  })
  return source !== null
}
