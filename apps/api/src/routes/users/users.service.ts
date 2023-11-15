import { Prisma, PrismaClient, users } from "@prisma/client"
import jwt from "jsonwebtoken"

const prisma = new PrismaClient()

export interface JwtPayload {
  id: number
}

export const generateAccessToken = (payload: JwtPayload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

export const createUser = async (user: Omit<users, 'id'>): Promise<users> => {
  try {
    const result = await prisma.users.create({
      data: user,
    })
    return result
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw { code: 409, message: 'This email is already taken' }
      }
    }
    throw error
  }
}