import { Request, Response } from 'express'
import axios from 'axios'

export const getCryptosController = async (req: Request, res: Response) => {
  try {
    const response = await axios.get(`${process.env.COINGECKO_API_URL}/coins/markets`, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
      },
      // TODO: Make vs_currency dynamic based on user preferences
      params: {
        vs_currency: 'eur',
      },
    })
    res.send(response.data)
  } catch (error) {
    res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

export const getCryptoByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const response = await axios.get(`${process.env.COINGECKO_API_URL}/coins/${id}`, {
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'deflate, gzip',
        x_cg_demo_api_key: process.env.COINGECKO_API_KEY,
      },
    })
    res.send(response.data)
  } catch (error) {
    res.status(500).send({ message: 'Error while fetching data from CoinGecko API: ', error })
  }
}

export const getCryptoPriceHistoryController = (req: Request, res: Response) => {
  res.send('getCryptoPriceHistoryController')
}

export const postCryptoController = (req: Request, res: Response) => {
  res.send('postCryptoController')
}

export const deleteCryptoController = (req: Request, res: Response) => {
  res.send('deleteCryptoController')
}
