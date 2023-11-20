import express from 'express';
import {
  getArticleByIdController,
  getArticlesController,
} from './articles.controller';

const router = express.Router();

router.get('/', getArticlesController);
router.get('/:id', getArticleByIdController);

export default router;
