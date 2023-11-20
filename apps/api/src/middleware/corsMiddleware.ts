import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

const allowedOrigins = [process.env.FRONT_URL]
const env = process.env.ENV

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || (env == 'dev' && !origin)) callback(null, true)
    else callback(new Error('CORS policy violation'))
  },
}

export const corsMiddleware = (error, req: Request, res: Response, next: NextFunction) => {
  if (error.message === 'CORS policy violation')
    return res.status(403).json({
      message: error.message,
    })
  next()
}
