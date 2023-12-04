import { AuthType, Prisma, PrismaClient, Role, User } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import * as dotenv from 'dotenv'
import slugify from 'slugify'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('JWT_SECRET env variable is not defined')

const prisma = new PrismaClient()

interface ICreateUser {
  email: string
  nickname: string
  password?: string
  auth_type?: AuthType
}
interface IClassicLogin {
  nickname: string
  password: string
}
export interface JwtPayload {
  id: number
  email: string
  nickname: string
  role: Role
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

export const verifyCredentials = async ({ nickname, password }: IClassicLogin): Promise<{ token: string }> => {
  const user = await prisma.user.findUnique({
    where: { nickname, auth_type: AuthType.CLASSIC },
  })
  if (!user) throw { code: 401, message: 'Invalid credentials' }

  const isPasswordValid = await bcrypt.compare(password, user.password)
  if (!isPasswordValid) throw { code: 401, message: 'Invalid credentials' }

  const token = generateAccessToken({ id: user.id, email: user.email, nickname: user.nickname, role: user.role })
  return { token }
}

export const getGoogleUserData = async (accessToken: string): Promise<IGoogleUserData> => {
  // TODO: Utiliser axios une fois la pr #4 merged
  const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`)
  const data: IGoogleUserData = await response.json()
  return data
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
