import express from 'express'

import usersRouter from './routes/users/users.router'
import cryptosRouter from './routes/cryptos/cryptos.router'
import articlesRouter from './routes/articles/articles.router'
import sourcesRouter from './routes/sources/sources.router'

import { apiKeyMiddleware } from './middleware/apiKeyMiddleware'
import { corsMiddleware, corsWithOptions } from './middleware/corsMiddleware'

const host = process.env.HOST ?? 'localhost'
const port = process.env.PORT ? Number(process.env.PORT) : 3000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(corsWithOptions)
app.use(corsMiddleware)
app.use(apiKeyMiddleware)

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to "The count of money" API!' })
})

app.use('/users', usersRouter)
app.use('/cryptos', cryptosRouter)
app.use('/articles', articlesRouter)
app.use('/sources', sourcesRouter)

app.listen(port, host, () => {
  // eslint-disable-next-line no-console
  console.log(`[ ready ] http://${host}:${port}`)
})
