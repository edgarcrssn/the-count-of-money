import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { JwtPayload } from '@the-count-of-money/types'

dotenv.config()

const jwtSecret = process.env.JWT_SECRET
if (!jwtSecret) throw new Error('JWT_SECRET env variable is not defined')

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: JwtPayload
    }
  }
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return res.status(401).send({ message: 'Unauthorized' })

  jwt.verify(token, jwtSecret, (error, payload: JwtPayload) => {
    if (error) return res.status(401).send({ message: 'Unauthorized' })
    req.user = payload
    next()
  })
}

export const permissiveAuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) return next()

  jwt.verify(token, jwtSecret, (error, payload: JwtPayload) => {
    if (error) return next()
    req.user = payload
    next()
  })
}
