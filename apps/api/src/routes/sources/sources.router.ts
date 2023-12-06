import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware'
import { deleteRssController, postRssController } from './sources.controller'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { postRssValidator } from './sources.validator'

const router = express.Router()

router.post('/', adminMiddleware, postRssValidator, validatorMiddleware, postRssController)
router.delete('/:id', adminMiddleware, deleteRssController)

export default router
