import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware'

import {
  deleteStoredCryptoByIdController,
  editStoredCryptoByIdController,
  getCryptoByIdController,
  getCryptoPriceHistoryController,
  getCryptosController,
  getStoredCryptosController,
  postStoredCryptoController,
} from './cryptos.controller'
import { authMiddleware, permissiveAuthMiddleware } from '../../middleware/authMiddleware'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { editCryptoValidator, createCryptoValidator } from './cryptos.validator'

const router = express.Router()

router.get('/stored', permissiveAuthMiddleware, getStoredCryptosController)
router.post('/stored', adminMiddleware, createCryptoValidator, validatorMiddleware, postStoredCryptoController)
router.patch('/stored/:id', adminMiddleware, editCryptoValidator, validatorMiddleware, editStoredCryptoByIdController)
router.delete('/stored/:id', adminMiddleware, deleteStoredCryptoByIdController)

router.get('/', getCryptosController)
router.get('/:id', authMiddleware, getCryptoByIdController)
router.get('/:id/history/:period', authMiddleware, getCryptoPriceHistoryController)

export default router
