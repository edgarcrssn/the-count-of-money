import { body } from 'express-validator'

export const postCryptoValidator = [body('name').notEmpty().isString().withMessage('must be a string')]
