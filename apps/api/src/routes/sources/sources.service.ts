import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const createRssSource = async (url: string) => {
  return await prisma.rssSource.create({
    data: {
      url,
    },
  })
}

export const deleteRssSource = async (id: number) => {
  return await prisma.rssSource.delete({
    where: {
      id,
    },
  })
}
