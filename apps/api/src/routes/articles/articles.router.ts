import express from 'express'
import {
  followKeywordController,
  getArticleByIdController,
  getArticlesController,
  getKeywordsController,
  getUserFollowedKeywordsController,
  unfollowKeywordController,
} from './articles.controller'
import { authMiddleware, permissiveAuthMiddleware } from '../../middleware/authMiddleware'

const router = express.Router()

router.get('/', getArticlesController)

router.get('/keywords', permissiveAuthMiddleware, getKeywordsController)
router.get('/keywords/:nickname', getUserFollowedKeywordsController)
router.post('/keywords/:id/following', authMiddleware, followKeywordController)
router.delete('/keywords/:id/following', authMiddleware, unfollowKeywordController)

router.get('/:id', getArticleByIdController)

export default router
