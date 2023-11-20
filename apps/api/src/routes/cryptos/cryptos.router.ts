import express from 'express'
import { adminMiddleware } from '../../middleware/adminMiddleware'
import {
  deleteCryptoController,
  getCryptoByIdController,
  getCryptoPriceHistoryController,
  getCryptosController,
  postCryptoController,
} from './cryptos.controller'

const router = express.Router()

router.get('/', getCryptosController)
router.get('/:id', getCryptoByIdController)
router.get('/:id/history/:period', getCryptoPriceHistoryController)

router.post('/', adminMiddleware, postCryptoController)
router.delete('/', adminMiddleware, deleteCryptoController)

export default router
