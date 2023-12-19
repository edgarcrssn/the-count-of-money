import { Role } from '@prisma/client'
import { Request, Response } from 'express'
import { getKeywords, getUserFollowedKeywords, manageKeywordsFollow } from './articles.service'
import { getAllArticles } from './articles.service'
import { GetArticleDto } from '@the-count-of-money/types'

export const getArticlesController = async (req: Request, res: Response): Promise<void> => {
  try {
    const page = Number(req.query.page) || 1
    const pageSize = Number(req.query.pageSize) || 24
    const { data, totalArticles } = await getAllArticles(page, pageSize)
    res.status(200).send({ data, totalArticles, currentPage: page, pageSize })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while retrieving articles: ', error })
  }
}

export const getArticleByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const articleId = req.params.id
    const jsonResponse = await getAllArticles()
    const allArticles = jsonResponse.data as GetArticleDto[]
    const article = allArticles.flat().find((article) => article.id === articleId)
    res.send({ article })
  } catch (error) {
    if (error.code && error.message) res.status(error.code).send({ message: error.message })
    else res.status(500).send({ message: 'Error while retrieving this article: ', error })
  }
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
