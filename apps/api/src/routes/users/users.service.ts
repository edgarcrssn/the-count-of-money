import { AuthType, Prisma, PrismaClient, Role } from '@prisma/client'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

interface RegisterDto {
  email: string
  nickname: string
  password: string
}
interface LoginDto {
  nickname: string
  password: string
}
export interface JwtPayload {
  id: number
  role: Role
}

export const generateAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

export const createUser = async (user: RegisterDto): Promise<{ token: string }> => {
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
    const token = generateAccessToken({ id: newUser.id, role: newUser.role })
    return { token }
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
  try {
    const user = await prisma.user.findUnique({
      where: { nickname, auth_type: AuthType.CLASSIC },
    })
    if (!user) throw { code: 401, message: 'Invalid credentials' }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) throw { code: 401, message: 'Invalid credentials' }

    const token = generateAccessToken({ id: user.id, role: user.role })
    return { token }
  } catch (error) {
    console.error(error)
    throw error
  }
}
