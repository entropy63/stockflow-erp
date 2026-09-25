import { Router } from 'express';
import {validateBody} from '../../middleware/validate';
import { loginSchema } from './schema';
import { loginHandler } from './controller';

export const authRouter = Router();

authRouter.post('/login', validateBody(loginSchema), loginHandler);