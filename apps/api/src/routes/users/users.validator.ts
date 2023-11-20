import { body } from 'express-validator';

export const registerValidator = [
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('please provide a valid email address'),
  body('password')
    .notEmpty()
    .isLength({ min: 8, max: 32 })
    .withMessage('password must be between 8 and 32 characters long')
    .matches(/[A-Z]/)
    .withMessage('password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('password must contain at least one lowercase letter')
    .matches(/\d/)
    .withMessage('password must contain at least one digit'),
];

export const loginValidator = [
  body('email')
    .notEmpty()
    .isEmail()
    .withMessage('please provide a valid email address'),
  body('password')
    .notEmpty()
];