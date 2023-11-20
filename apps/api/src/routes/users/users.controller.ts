import { createUser, verifyCredentials } from './users.service';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const registerController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, +process.env.SALT_ROUND);
    const result = await createUser({ email, password: hash });
    res.status(201).send(result);
  } catch (error) {
    if (error.code && error.message)
      res.status(error.code).send({ message: error.message });
  }
};

export const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await verifyCredentials({ email, password });
    res.status(200).send(result)
  } catch (error) {
    if (error.code && error.message)
      res.status(error.code).send({ message: error.message });
  }
};
