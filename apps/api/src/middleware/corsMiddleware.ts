import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import cors from 'cors'

dotenv.config()

const frontUrl = process.env.FRONT_URL
const env = process.env.ENV
// eslint-disable-next-line no-console
if (!frontUrl) console.warn('FRONT_URL env variable is not defined')
// eslint-disable-next-line no-console
if (!env) console.warn('ENV env variable is not defined')

const allowedOrigins = [frontUrl, 'https://accounts.google.com']

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || (env === 'dev' && !origin)) callback(null, true)
    else callback(new Error('CORS policy violation'))
  },
  methods: 'GET,POST,PUT,PATCH,DELETE',
  credentials: true,
}

export const corsMiddleware = (error, req: Request, res: Response, next: NextFunction) => {
  if (error.message === 'CORS policy violation') {
    return res.status(403).json({
      message: error.message,
    })
  }
  next()
}

export const corsWithOptions = cors(corsOptions)
