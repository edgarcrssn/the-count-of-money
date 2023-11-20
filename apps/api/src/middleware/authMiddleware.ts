import * as dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { JwtPayload } from '../routes/users/users.service'
import { NextFunction, Request, Response } from 'express'

dotenv.config()

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

  jwt.verify(token, process.env.JWT_SECRET, (error, payload: JwtPayload) => {
    if (error) return res.status(401).send({ message: 'Unauthorized' })
    req.user = payload
    next()
  })
}
