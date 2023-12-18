import {
  emailRegexObject,
  onlyLettersAndOrSpacesRegexObject,
  passwordRegexObject,
  slugRegexObject,
} from '@the-count-of-money/regex'
import { body } from 'express-validator'

export const registerValidator = [
  body('first_name')
    .notEmpty()
    .matches(onlyLettersAndOrSpacesRegexObject.regex)
    .withMessage(onlyLettersAndOrSpacesRegexObject.message),
  body('last_name')
    .notEmpty()
    .matches(onlyLettersAndOrSpacesRegexObject.regex)
    .withMessage(onlyLettersAndOrSpacesRegexObject.message),
  body('email').notEmpty().matches(emailRegexObject.regex).withMessage(emailRegexObject.message),
  body('nickname')
    .notEmpty()
    .isLength({ min: 3, max: 18 })
    .withMessage('must be between 3 and 18 characters long')
    .matches(slugRegexObject.regex)
    .withMessage(slugRegexObject.message),
  body('password')
    .notEmpty()
    .isLength({ min: 8, max: 32 })
    .withMessage('must be between 8 and 32 characters long')
    .matches(passwordRegexObject.regex)
    .withMessage(passwordRegexObject.message),
]

export const loginValidator = [body('nickname').notEmpty(), body('password').notEmpty()]

export const googleOAuthCallbackValidator = [body('code').isString().notEmpty()]

export const editMyProfileValidator = [
  body('first_name')
    .optional()
    .notEmpty()
    .matches(onlyLettersAndOrSpacesRegexObject.regex)
    .withMessage(onlyLettersAndOrSpacesRegexObject.message),
  body('last_name')
    .optional()
    .notEmpty()
    .matches(onlyLettersAndOrSpacesRegexObject.regex)
    .withMessage(onlyLettersAndOrSpacesRegexObject.message),
  body('email').optional().notEmpty().matches(emailRegexObject.regex).withMessage(emailRegexObject.message),
  body('nickname')
    .optional()
    .notEmpty()
    .isLength({ min: 3, max: 18 })
    .withMessage('must be between 3 and 18 characters long')
    .matches(slugRegexObject.regex)
    .withMessage(slugRegexObject.message),
]
