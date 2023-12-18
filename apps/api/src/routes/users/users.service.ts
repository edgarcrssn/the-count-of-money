import { AuthType, Prisma, PrismaClient, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import axios from 'axios'

import * as dotenv from 'dotenv'
import slugify from 'slugify'

import { JwtPayload, LoginDto } from '@the-count-of-money/types'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('JWT_SECRET env variable is not defined')

const prisma = new PrismaClient()

interface ICreateUser {
  first_name: string
  last_name: string
  email: string
  nickname: string
  password?: string
  auth_type?: AuthType
}

interface IGoogleUserData {
  sub: string
  name: string
  given_name: string
  family_name: string
  picture: string
  email: string
  email_verified: boolean
  locale: string
}

export const generateAccessToken = (payload: JwtPayload) => jwt.sign(payload, jwtSecret, { expiresIn: '1h' })

export const createUser = async (user: ICreateUser): Promise<User> => {
  try {
    const newUser = await prisma.user.create({
      data: {
        ...user,
        default_currency: {
          connectOrCreate: {
            where: {
              name: 'EUR',
            },
            create: {
              name: 'EUR',
            },
          },
        },
      },
    })
    return newUser
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

export const verifyCredentials = async ({ nickname, password }: LoginDto): Promise<{ token: string }> => {
  const user = await prisma.user.findUnique({
    where: { nickname, auth_type: AuthType.PASSWORD },
  })
  if (!user) throw { code: 401, message: 'Invalid credentials' }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) throw { code: 401, message: 'Invalid credentials' }

  const token = generateAccessToken(user)
  return { token }
}

export const getGoogleUserData = async (accessToken: string): Promise<IGoogleUserData> => {
  const response = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
  return response.data
}

export const generateUniqueNickname = async (name: string) => {
  const MAX_ATTEMPTS = 20
  let nickname = slugify(name, { lower: true })
  let i = 0

  do {
    const isNicknameAlreadyTaken = await prisma.user.findUnique({ where: { nickname } })

    if (!isNicknameAlreadyTaken) break

    i++
    nickname = `${slugify(name, { lower: true })}-${i}`
  } while (i <= MAX_ATTEMPTS)

  if (i > MAX_ATTEMPTS) throw new Error('Maximum attempts reached. Unable to generate a unique nickname.')

  return nickname
}

export const getUserById = async (id: number) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    })

    if (!user) throw { code: 404, message: 'Not Found' }

    return user
  } catch (error) {
    throw { code: 500, message: error }
  }
}

export const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
  try {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: userData,
    })

    if (!updatedUser) throw { code: 404, message: 'User Not Found' }

    return updatedUser
  } catch (error) {
    throw { code: 500, message: error }
  }
}

export const addCryptoCurrency = async (id: number, cryptoCurrencyId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { crypto_currencies: true },
    })

    if (!user) throw { code: 404, message: 'Not Found' }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        crypto_currencies: {
          connect: {
            id: cryptoCurrencyId,
          },
        },
      },
      include: { crypto_currencies: true },
    })

    return updatedUser
  } catch (error) {
    throw { code: 500, message: error }
  }
}

export const removeCryptoCurrency = async (userId: number, cryptoCurrencyId: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: { crypto_currencies: true },
    })

    if (!user) throw { code: 404, message: 'Not Found' }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        crypto_currencies: {
          disconnect: {
            id: cryptoCurrencyId,
          },
        },
      },
      include: { crypto_currencies: true },
    })

    return updatedUser
  } catch (error) {
    throw { code: 500, message: error }
  }
}
