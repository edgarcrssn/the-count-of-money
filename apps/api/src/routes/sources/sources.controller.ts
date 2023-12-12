import { Request, Response } from 'express'
import { isValidRssSource } from './sources.validator'
import { createRssSource, deleteRssSource } from './sources.service'
import dotenv from 'dotenv'

dotenv.config()

export const postRssController = async (req: Request, res: Response) => {
  // TODO type this
  const { url } = req.body

  if (!(await isValidRssSource(url))) return res.status(400).send({ message: 'Invalid RSS source' })

  try {
    const newRssSource = await createRssSource(url)
    res.status(201).send({ newRssSource })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while trying to add the RSS source' })
  }
}

export const deleteRssController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deletedRssSource = await deleteRssSource(+id)
    res.status(200).send({ deletedRssSource })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while trying to delete the RSS source' })
  }
}
