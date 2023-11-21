import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'
import cors from 'cors'

dotenv.config()

const allowedOrigins = [process.env.FRONT_URL, 'https://accounts.google.com']
const env = process.env.ENV

export const corsOptions: cors.CorsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || (env === 'dev' && !origin)) callback(null, true)
    else callback(new Error('CORS policy violation'))
  },
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
