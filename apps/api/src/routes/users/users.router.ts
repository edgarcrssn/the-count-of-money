import express from 'express'
import { loginValidator, registerValidator } from './users.validator'
import {
  editMyProfileController,
  getMyProfileController,
  googleOAuthCallbackController,
  loginController,
  logoutController,
  registerController,
} from './users.controller'
import { validatorMiddleware } from '../../middleware/validatorMiddleware'
import { authMiddleware } from '../../middleware/authMiddleware'
import passport from 'passport'

const router = express.Router()

router.post('/register', registerValidator, validatorMiddleware, registerController)
router.post('/login', loginValidator, validatorMiddleware, loginController)

router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.post(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  googleOAuthCallbackController,
)

router.post('/logout', authMiddleware, logoutController)

router.get('/profile', authMiddleware, getMyProfileController)
router.put('/profile', authMiddleware, editMyProfileController)

export default router
