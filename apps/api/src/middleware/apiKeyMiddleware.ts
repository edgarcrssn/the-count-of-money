import * as dotenv from 'dotenv';

dotenv.config();

export const apiKeyMiddleware = (req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (apiKey !== process.env.API_KEY) return res.status(403).json({
    message: 'Wrong API KEY',
  });
  next();
};