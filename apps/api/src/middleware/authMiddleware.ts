import * as dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../routes/users/users.service';

dotenv.config();

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (error, payload: JwtPayload) => {
    if (error) return res.sendStatus(401);
    req.user = payload;
    next();
  });
};