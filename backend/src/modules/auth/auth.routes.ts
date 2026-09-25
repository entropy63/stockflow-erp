import { Router } from 'express';
import {validateBody} from '../../middleware/validate';
import { loginSchema } from './auth.schema';
import { loginHandler } from './auth.controller';

export const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), loginHandler);