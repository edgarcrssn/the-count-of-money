import { Request, Response } from 'express'
import { isValidRssSource, isValidUrl, doesUrlAlreadyExist } from './sources.validator'
import { createRssSource, deleteRssSource } from './sources.service'
import dotenv from 'dotenv'

dotenv.config()

export const postRssController = async (req: Request, res: Response) => {
  const { url } = req.body

  if (!isValidUrl(url)) return res.status(400).send({ message: 'Invalid URL' })
  if (!(await isValidRssSource(url))) return res.status(400).send({ message: 'Invalid RSS source' })
  if (await doesUrlAlreadyExist(url)) return res.status(409).json({ message: 'URL already exists' })

  try {
    const newRssSource = await createRssSource(url)
    res.json({ newRssSource })
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while trying to add the RSS source' })
  }
}

export const deleteRssController = async (req: Request, res: Response) => {
  const { id } = req.params

  const deletedRssSource = await deleteRssSource(+id)
  res.send({ deletedRssSource })
}
