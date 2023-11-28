import { Request, Response } from 'express'
import { isValidRssSource, isValidUrl, isUniqueUrl } from './sources.validator'
import { createRssSource, deleteRssSource } from './sources.service'
import dotenv from 'dotenv'

dotenv.config()

export const postRssController = async (req: Request, res: Response) => {
  const { url } = req.body

  if (!isValidUrl(url)) {
    return res.status(400).send({ message: 'Invalid URL' })
  }
  if (await isUniqueUrl(url)) {
    return res.status(409).json({ message: 'URL already exists' })
  }

  if (!(await isValidRssSource(url))) {
    res.status(400).send({ message: 'Invalid RSS source' })
    return
  }
  try {
    const newRssSource = await createRssSource(url)
    res.json(newRssSource)
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while trying to add the RSS source' })
  }
}

export const deleteRssController = async (req: Request, res: Response) => {
  const id = req.params.id

  await deleteRssSource(id)
  res.send('RSS successfully deleted')
}
