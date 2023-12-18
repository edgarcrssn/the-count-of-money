import { Role } from '@prisma/client'
import { Request, Response } from 'express'
import { getKeywords, getUserFollowedKeywords, manageKeywordsFollow } from './articles.service'

// TODO
export const getArticlesController = (req: Request, res: Response) => {
  res.send('getArticlesController')
}

export const getArticleByIdController = (req: Request, res: Response) => {
  res.send('getArticleByIdController')
}

export const getKeywordsController = async (req: Request, res: Response) => {
  try {
    const isAdmin = req.user?.role === Role.ADMIN
    const keywords = await getKeywords(!isAdmin)
    res.send({ keywords })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while retrieving keywords: ', error })
  }
}

export const getUserFollowedKeywordsController = async (req: Request, res: Response) => {
  try {
    const { nickname } = req.params
    const followedKeywords = await getUserFollowedKeywords(nickname)

    res.send({ followedKeywords })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while retrieving the followed keywords' })
  }
}

export const followKeywordController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const followedKeyword = await manageKeywordsFollow(userId, id)
    res.status(201).send({ followedKeyword })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while following the keyword' })
  }
}

export const unfollowKeywordController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userId = req.user?.id
    const unfollowedKeyword = await manageKeywordsFollow(userId, id, true)
    res.send({ unfollowedKeyword })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'An error occurred while unfollowing the keyword' })
  }
}
