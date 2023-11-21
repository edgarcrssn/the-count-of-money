import { createUser, generateAccessToken, getGoogleUserData, verifyCredentials } from './users.service'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { OAuth2Client } from 'google-auth-library'

import * as dotenv from 'dotenv'
import { AuthType, PrismaClient } from '@prisma/client'

dotenv.config()

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const redirectUrl = process.env.GOOGLE_CALLBACK_URL

if (!clientID) throw new Error('GOOGLE_CLIENT_ID env variable is not defined')
if (!clientSecret) throw new Error('GOOGLE_CLIENT_SECRET env variable is not defined')
if (!redirectUrl) throw new Error('GOOGLE_CALLBACK_URL env variable is not defined')

const prisma = new PrismaClient()

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, nickname, password } = req.body
    const hash = await bcrypt.hash(password, +process.env.SALT_ROUND)
    const result = await createUser({ email, nickname, password: hash })
    res.status(201).send(result)
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
  }
}

export const loginController = async (req: Request, res: Response) => {
  try {
    const { nickname, password } = req.body
    const result = await verifyCredentials({ nickname, password })
    res.status(200).send(result)
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
  }
}

export const googleOAuthController = async (req: Request, res: Response) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:5173')
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
  const code = req.body.code.toString()

  try {
    const oAuth2Client = new OAuth2Client(clientID, clientSecret, redirectUrl)
    const response = await oAuth2Client.getToken(code)
    oAuth2Client.setCredentials(response.tokens)

    const user = oAuth2Client.credentials
    const googleUserData = await getGoogleUserData(user.access_token)

    const existingUser = await prisma.user.findUnique({
      where: { email: googleUserData.email },
    })

    if (existingUser) {
      if (existingUser.auth_type !== AuthType.GOOGLE) {
        res.status(400).send({
          message: `A user with this email is already registered with another auth method (${existingUser.auth_type})`,
        })
      } else {
        const token = generateAccessToken({ id: existingUser.id, role: existingUser.role })
        res.status(200).send({ token })
      }
    } else {
      const result = await createUser({
        email: googleUserData.email,
        nickname: googleUserData.name,
        auth_type: AuthType.GOOGLE,
      })
      res.status(200).send(result)
    }
  } catch (error) {
    console.log('Error while signing in with Google: ', error)
  }
}

export const logoutController = async (req: Request, res: Response) => {
  res.send('logoutController')
}

export const getMyProfileController = async (req: Request, res: Response) => {
  res.send('getMyProfileController')
}

export const editMyProfileController = async (req: Request, res: Response) => {
  res.send('editMyProfileController')
}
