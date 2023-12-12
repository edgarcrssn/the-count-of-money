import axios from 'axios'
import dotenv from 'dotenv'
import { body } from 'express-validator'

dotenv.config()

export const postRssValidator = [body('url').isURL().withMessage('must be an URL')]

export const isValidRssSource = async (url: string): Promise<boolean> => {
  const params = new URLSearchParams({
    api_key: process.env.RSS_TO_JSON_API_KEY,
    rss_url: url,
  })

  try {
    const response = await axios.get(`${process.env.RSS_TO_JSON_API_URL}?${params.toString()}`)
    return response.status === 200
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    return false
  }
}
