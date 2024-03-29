import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware'

import {
  deleteStoredCryptoByIdController,
  editStoredCryptoByIdController,
  getCryptoByIdController,
  getCryptoPriceHistoryController,
  getCryptosController,
  getNonStoredCryptosController,
  getStoredCryptosController,
  getUserTrackedCryptosController,
  postStoredCryptoController,
  trackCryptoController,
  untrackCryptoController,
} from './cryptos.controller'
import { authMiddleware, permissiveAuthMiddleware } from '../../middleware/authMiddleware'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { editCryptoValidator, createCryptoValidator } from './cryptos.validator'

const router = express.Router()

router.get('/stored', permissiveAuthMiddleware, getStoredCryptosController)

router.get('/non-stored', adminMiddleware, getNonStoredCryptosController)
router.post('/stored', adminMiddleware, createCryptoValidator, validatorMiddleware, postStoredCryptoController)
router.patch('/stored/:id', adminMiddleware, editCryptoValidator, validatorMiddleware, editStoredCryptoByIdController)
router.delete('/stored/:id', adminMiddleware, deleteStoredCryptoByIdController)

router.get('/tracked/:nickname', getUserTrackedCryptosController)
router.post('/:id/track', authMiddleware, trackCryptoController)
router.delete('/:id/track', authMiddleware, untrackCryptoController)

router.get('/', getCryptosController)
router.get('/:id', getCryptoByIdController)
router.get('/:id/history/:period', authMiddleware, getCryptoPriceHistoryController)

export default router
