import express from 'express'
import { registerValidator } from './users.validator';
import { registerController } from './users.controller';
import { validatorMiddleware } from '../../middleware/validatorMiddleware';

const router = express.Router();

router.post('/register', registerValidator, validatorMiddleware, registerController)

export default router