import express from 'express'
import { googleOAuthCallbackValidator, loginValidator, registerValidator } from './users.validator'
import {
  editMyProfileController,
  getMyProfileController,
  googleOAuthCallbackController,
  googleOAuthController,
  loginController,
  verifyAuthStatusController,
  registerController,
  postCryptoCurrencyController,
  deleteCryptoCurrencyController,
} from './users.controller'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { authMiddleware } from '../../middleware/authMiddleware'

const router = express.Router()

router.post('/register', registerValidator, validatorMiddleware, registerController)
router.post('/login', loginValidator, validatorMiddleware, loginController)

router.get('/auth/google', googleOAuthController)
router.post('/auth/google/callback', googleOAuthCallbackValidator, validatorMiddleware, googleOAuthCallbackController)

router.get('/verify-auth-status', authMiddleware, verifyAuthStatusController)

router.get('/profile', authMiddleware, getMyProfileController)
// TODO Create express-validator validator
router.patch('/profile', authMiddleware, editMyProfileController)

router.post('/crypto', authMiddleware, postCryptoCurrencyController)
router.delete('/crypto', authMiddleware, deleteCryptoCurrencyController)

export default router
