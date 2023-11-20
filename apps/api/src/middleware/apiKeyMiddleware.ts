import * as dotenv from 'dotenv'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key')
  if (apiKey !== process.env.API_KEY)
    return res.status(403).json({
      message: 'Wrong API key',
    })
  next()
}
