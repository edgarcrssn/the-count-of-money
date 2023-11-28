import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware'
import { deleteRssController, postRssController } from './sources.controller'

const router = express.Router()

router.post('/', adminMiddleware, postRssController)
router.delete('/:id', adminMiddleware, deleteRssController)

export default router
