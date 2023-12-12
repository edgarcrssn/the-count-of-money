import { Prisma, PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createRssSource = async (url: string) => {
  try {
    const newRssSource = await prisma.rssSource.create({
      data: { url },
    })
    return newRssSource
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

export const deleteRssSource = async (id: number) => {
  try {
    return await prisma.rssSource.delete({
      where: { id },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        throw { code: 404, message: 'This RSS source does not exist' }
      }
    }
    throw error
  }
}
