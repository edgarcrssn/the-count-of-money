import { Request, Response } from 'express'

export const getArticlesController = (req: Request, res: Response) => {
  res.send('getArticlesController')
}

export const getArticleByIdController = (req: Request, res: Response) => {
  res.send('getArticleByIdController')
}