import express from 'express'
import { loginValidator, registerValidator } from './users.validator';
import { loginController, registerController } from './users.controller';
import { validatorMiddleware } from '../../middleware/validatorMiddleware';

const router = express.Router();

router.post('/register', registerValidator, validatorMiddleware, registerController)
router.post('/login', loginValidator, validatorMiddleware, loginController)

export default router