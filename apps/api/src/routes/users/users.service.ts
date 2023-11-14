import { PrismaClient, users } from "@prisma/client"

const prisma = new PrismaClient()

export const createUser = async (user: Omit<users, 'id'>): Promise<users> => {
  const result = await prisma.users.create({
    data: user,
  })
  return result
}