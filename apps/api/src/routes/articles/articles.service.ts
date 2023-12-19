import axios from 'axios'
import { getStoredRssSources } from '../sources/sources.service'
import slugify from 'slugify'
import { Keyword, Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getKeywords = async (onlyAvailable: boolean = false) => {
  try {
    const keywords = await prisma.keyword.findMany({
      where: onlyAvailable ? { available: true } : undefined,
    })

    return keywords
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw error
  }
}

export const getUserFollowedKeywords = async (nickname: string): Promise<Keyword[]> => {
  try {
    const followedKeywords = await prisma.user.findUnique({
      where: { nickname },
      select: {
        keywords: {
          where: { available: true },
          select: {
            id: true,
            available: true,
          },
        },
      },
    })

    return followedKeywords?.keywords || []
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw { code: 404, message: 'User Not Found' }
      }
    }
    throw error
  }
}

export const manageKeywordsFollow = async (userId: number, keywordId: string, unfollow: boolean = false) => {
  const action = unfollow ? 'disconnect' : 'connect'

  try {
    const keywordToManage = await prisma.keyword.findUnique({
      where: { id: keywordId },
    })

    if (!keywordToManage) throw { code: 404, message: 'Keyword Not Found' }

    await prisma.user.update({
      where: { id: userId },
      data: {
        keywords: {
          [action]: {
            id: keywordId,
          },
        },
      },
    })

    return keywordToManage
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') throw { code: 404, message: 'User Not Found' }
    }
    throw error
  }
}

export const fetchRssSources = async (url: string) => {
  const params = new URLSearchParams({
    api_key: process.env.RSS_TO_JSON_API_KEY,
    rss_url: url,
  })

  try {
    const response = await axios.get(`${process.env.RSS_TO_JSON_API_URL}?${params.toString()}`)

    return response.data
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    throw error
  }
}

export const getAllArticles = async (page?: number, pageSize?: number) => {
  const storedRssSources = await getStoredRssSources()
  const rssSourceUrls = storedRssSources.map((source) => source.url)
  const articlePromises = await Promise.all(rssSourceUrls.map((url) => fetchRssSources(url)))

  const allArticles = articlePromises.flat().flatMap((promise) =>
    promise.items.map((item) => ({
      ...item,
      id: slugify(item.title, { lower: true }),
    })),
  )
  const uniqueArticles = Object.values(
    allArticles.reduce((acc, article) => {
      acc[article.id] = article
      return acc
    }, {}),
  )

  const totalArticles = uniqueArticles.length

  if (page !== undefined && pageSize !== undefined) {
    const start = (page - 1) * pageSize
    const end = start + pageSize
    const articles = uniqueArticles.slice(start, end)

    return { data: articles, totalArticles }
  }

  return { data: uniqueArticles, totalArticles }
}
