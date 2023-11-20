import { Prisma, PrismaClient, User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export interface JwtPayload {
  id: number;
}

export const generateAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

export const createUser = async (
  user: Omit<User, 'id'>
): Promise<{ token: string }> => {
  try {
    const newUser = await prisma.user.create({
      data: user,
    });
    const token = generateAccessToken({ id: newUser.id });
    return { token };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw { code: 409, message: 'This email is already taken' };
      }
    }
    throw error;
  }
};

export const verifyCredentials = async ({
  email,
  password,
}: Omit<User, 'id'>): Promise<{ token: string }> => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) throw { code: 401, message: 'Invalid credentials' };

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw { code: 401, message: 'Invalid credentials' };

    const token = generateAccessToken({ id: user.id });
    return { token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};
