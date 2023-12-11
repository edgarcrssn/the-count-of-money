import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware'

import {
  deleteCryptoController,
  getCryptoByIdController,
  getCryptoPriceHistoryController,
  getCryptosController,
  postCryptoController,
} from './cryptos.controller'
import { authMiddleware } from '../../middleware/authMiddleware'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { postCryptoValidator } from './cryptos.validator'

const router = express.Router()

router.get('/', getCryptosController)
router.get('/:id', authMiddleware, getCryptoByIdController)
router.get('/:id/history/:period', authMiddleware, getCryptoPriceHistoryController)

router.post('/', adminMiddleware, postCryptoValidator, validatorMiddleware, postCryptoController)
router.delete('/:id', adminMiddleware, deleteCryptoController)

export default router
