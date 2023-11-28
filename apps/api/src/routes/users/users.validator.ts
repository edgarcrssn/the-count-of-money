import { body } from 'express-validator'

export const registerValidator = [
  body('email').notEmpty().isEmail().withMessage('please provide a valid email address'),
  body('nickname')
    .notEmpty()
    .isLength({ min: 3, max: 18 })
    .withMessage('must be between 3 and 18 characters long')
    .matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
    .withMessage('must only contain lowercase letters and numbers that can be separated by hyphen'),
  body('password')
    .notEmpty()
    .isLength({ min: 8, max: 32 })
    .withMessage('must be between 8 and 32 characters long')
    .matches(/[A-Z]/)
    .withMessage('must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('must contain at least one lowercase letter')
    .matches(/\d/)
    .withMessage('must contain at least one digit'),
]

export const loginValidator = [body('nickname').notEmpty(), body('password').notEmpty()]

export const googleOAuthCallbackValidator = [body('code').isString().notEmpty()]
