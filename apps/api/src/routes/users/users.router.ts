import express from 'express'
import { googleOAuthCallbackValidator, loginValidator, registerValidator } from './users.validator'
import {
  editMyProfileController,
  getMyProfileController,
  googleOAuthCallbackController,
  googleOAuthController,
  loginController,
  logoutController,
  registerController,
} from './users.controller'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { authMiddleware } from '../../middleware/authMiddleware'

const router = express.Router()

router.post('/register', registerValidator, validatorMiddleware, registerController)
router.post('/login', loginValidator, validatorMiddleware, loginController)

router.get('/auth/google', googleOAuthController)
router.post('/auth/google/callback', googleOAuthCallbackValidator, validatorMiddleware, googleOAuthCallbackController)

router.post('/logout', authMiddleware, logoutController)

router.get('/profile', authMiddleware, getMyProfileController)
router.put('/profile', authMiddleware, editMyProfileController)

export default router
