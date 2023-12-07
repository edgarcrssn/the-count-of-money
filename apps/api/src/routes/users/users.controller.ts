import {
  createUser,
  generateAccessToken,
  generateUniqueNickname,
  getGoogleUserData,
  getUserById,
  updateUser,
  verifyCredentials,
} from './users.service'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library'

import * as dotenv from 'dotenv'
import { AuthType, PrismaClient } from '@prisma/client'
import { LoginDto, RegisterDto } from '@the-count-of-money/types'

dotenv.config()

const saltRound = process.env.SALT_ROUND

const frontUrl = process.env.FRONT_URL
const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const redirectUrl = process.env.GOOGLE_CALLBACK_URL

if (!saltRound) throw new Error('SALT_ROUND env variable is not defined')

if (!frontUrl) throw new Error('FRONT_URL env variable is not defined')
if (!clientID) throw new Error('GOOGLE_CLIENT_ID env variable is not defined')
if (!clientSecret) throw new Error('GOOGLE_CLIENT_SECRET env variable is not defined')
if (!redirectUrl) throw new Error('GOOGLE_CALLBACK_URL env variable is not defined')

const prisma = new PrismaClient()

export const registerController = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, email, nickname, password } = req.body as RegisterDto
    const hash = await bcrypt.hash(password, +saltRound)
    const newUser = await createUser({ first_name, last_name, email, nickname, password: hash })
    const token = generateAccessToken(newUser)
    res.status(201).send({ token })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { nickname, password } = req.body as LoginDto
    const result = await verifyCredentials({ nickname, password })
    res.status(200).send(result)
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
  }
}

export const googleOAuthController = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', frontUrl)
  res.header('Referrer-Policy', 'no-referrer-when-downgrade')

  const oAuth2Client = new OAuth2Client(clientID, clientSecret, redirectUrl)

  const authorizeClient = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid',
    prompt: 'consent',
  })

  res.json({ url: authorizeClient })
}

export const googleOAuthCallbackController = async (req: Request, res: Response) => {
  const { code } = req.body

  try {
    const oAuth2Client = new OAuth2Client(clientID, clientSecret, redirectUrl)
    const response = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(response.tokens)

    const user = oAuth2Client.credentials
    const googleUserData = await getGoogleUserData(user.access_token)

    const existingUser = await prisma.user.findUnique({
      where: { email: googleUserData.email },
      select: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        nickname: true,
        role: true,
        auth_type: true,
      },
    })

    if (existingUser) {
      if (existingUser.auth_type !== AuthType.GOOGLE) {
        res.status(409).send({
          message: `A user with this email is already registered with another auth method (${existingUser.auth_type})`,
        })
      } else {
        const token = generateAccessToken(existingUser)
        res.status(200).send({ token })
      }
    } else {
      const newUser = await createUser({
        email: googleUserData.email,
        first_name: googleUserData.given_name,
        last_name: googleUserData.family_name,
        nickname: await generateUniqueNickname(googleUserData.name),
        auth_type: AuthType.GOOGLE,
      })
      const token = generateAccessToken(newUser)
      res.status(201).send({ token })
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error while signing in with Google: ', error)
  }
}

export const verifyAuthStatusController = async (req: Request, res: Response) => {
  res.send({ me: req.user })
}

export const getMyProfileController = async (req: Request, res: Response) => {
  const { id } = req.user
  const myData = await getUserById(id)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password, ...nonSensitiveData } = myData
  res.status(200).send({ me: nonSensitiveData })
}

export const editMyProfileController = async (req: Request, res: Response) => {
  try {
    const { id } = req.user
    // TODO Create UserDataDto type in libs/types
    const userData = req.body
    const updatedUser = await updateUser(id, userData)
    res.status(200).json({ updatedUser })
  } catch (error) {
    res.status(error.code).json({ message: 'An error occurred while updating the user profile: ', error })
  }
}
