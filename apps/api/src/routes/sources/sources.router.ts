import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware'
import { deleteRssSourceByIdController, getRssSourcesController, postRssSourceController } from './sources.controller'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { postRssValidator } from './sources.validator'

const router = express.Router()

router.get('/', adminMiddleware, getRssSourcesController)
router.post('/', adminMiddleware, postRssValidator, validatorMiddleware, postRssSourceController)
router.delete('/:id', adminMiddleware, deleteRssSourceByIdController)

export default router
