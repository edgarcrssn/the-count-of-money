import { Request, Response } from 'express'
import { isValidRssSource } from './sources.validator'
import { createRssSource, deleteRssSource, getStoredRssSources } from './sources.service'
import dotenv from 'dotenv'
import { CreateRssSourceDto } from '@the-count-of-money/types'

dotenv.config()

export const getRssSourcesController = async (req: Request, res: Response) => {
  try {
    const storedRssSources = await getStoredRssSources()
    res.status(200).send({ storedRssSources })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while trying to get the RSS source' })
  }
}

export const postRssSourceController = async (req: Request, res: Response) => {
  const { url } = req.body as CreateRssSourceDto

  if (!(await isValidRssSource(url))) return res.status(400).send({ message: 'Invalid RSS source' })

  try {
    const newRssSource = await createRssSource(url)
    res.status(201).send({ newRssSource })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while trying to add the RSS source' })
  }
}

export const deleteRssSourceByIdController = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const deletedRssSource = await deleteRssSource(+id)
    res.status(200).send({ deletedRssSource })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while trying to delete the RSS source' })
  }
}
