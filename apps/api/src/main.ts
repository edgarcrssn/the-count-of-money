import express from 'express';
import cors from 'cors'

import usersRouter from './routes/users/users.router'
import cryptosRouter from './routes/cryptos/cryptos.router'

import { apiKeyMiddleware } from './middleware/apiKeyMiddleware';
import { corsMiddleware, corsOptions } from './middleware/corsMiddleware';

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors(corsOptions));
app.use(corsMiddleware);
app.use(apiKeyMiddleware);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to "The count of money" API!' });
});

app.use('/users', usersRouter);
app.use('/cryptos', cryptosRouter);

app.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
