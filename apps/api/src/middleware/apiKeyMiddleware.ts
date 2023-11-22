import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

const apiKey = process.env.API_KEY
if (!apiKey) throw new Error('API_KEY env variable is not defined')

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  if (req.header('x-api-key') !== apiKey)
    return res.status(403).json({
      message: 'Wrong API key',
    })
  next()
}
