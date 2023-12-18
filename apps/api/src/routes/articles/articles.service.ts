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
