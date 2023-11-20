import { Role } from "@prisma/client";
import { authMiddleware } from "./authMiddleware";
import { NextFunction, Request, Response } from 'express';

export const adminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  authMiddleware(req, res, () => {
    if (req.user.role !== Role.ADMIN) return res.sendStatus(403);
    next();
  })
};