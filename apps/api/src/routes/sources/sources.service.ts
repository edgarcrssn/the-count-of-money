import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export async function createRssSource(url: string) {
  return await prisma.rssSource.create({
    data: {
      url,
    },
  })
}

export async function deleteRssSource(id: string) {
  return await prisma.rssSource.delete({
    where: {
      id: parseInt(id),
    },
  })
}
