import { Request, Response } from 'express'
import axios from 'axios'

// TODO: Push allCryptos + EnableCryptos for Admin, and only EnableCryptos for User
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

export const getCryptoPriceHistoryController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const period = req.query.period
    const response = await axios.get(`${process.env.COINGECKO_API_URL}/coins/${id}/market_chart?&days=${period}`, {
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

// TODO: Can be used to add a new crypto from the API to the database (enable cryptos)
export const postCryptoController = (req: Request, res: Response) => {
  res.send('postCryptoController')
}

// TODO: Can be used to delete a crypto from the database (enable cryptos)
export const deleteCryptoController = (req: Request, res: Response) => {
  res.send('deleteCryptoController')
}
