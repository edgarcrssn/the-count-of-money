import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'

import * as dotenv from 'dotenv'
import { AuthType, PrismaClient } from '@prisma/client'

dotenv.config()

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = process.env.GOOGLE_CALLBACK_URL

if (!clientID) throw new Error('GOOGLE_CLIENT_ID env variable is not defined')
if (!clientSecret) throw new Error('GOOGLE_CLIENT_SECRET env variable is not defined')
if (!callbackURL) throw new Error('GOOGLE_CALLBACK_URL env variable is not defined')

const prisma = new PrismaClient()

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const existingUser = await prisma.user.findFirst({
          where: {
            OR: [{ email: profile.emails[0].value }, { nickname: profile.displayName }],
          },
        })

        if (existingUser?.auth_type === AuthType.GOOGLE) {
          return done(null, existingUser)
        } else if (existingUser?.auth_type === AuthType.CLASSIC) {
          throw new Error('email or nickname already taken by classic user')
        }

        const newUser = await prisma.user.create({
          data: {
            email: profile.emails[0].value,
            nickname: profile.displayName,
            auth_type: AuthType.GOOGLE,
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

        return done(null, newUser)
      } catch (error) {
        console.error('Error while Google user creation: ', error)
        return done(error)
      }
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((obj, done) => {
  done(null, obj)
})
