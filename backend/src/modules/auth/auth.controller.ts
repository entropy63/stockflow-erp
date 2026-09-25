import type { Request, Response } from 'express';
import {login} from './auth.service';
import type {LoginInput} from './auth.schema';

export async function loginHandler(req: Request, res: Response){
    const {email,password} = req.body as LoginInput;
    const result = await login(email,password);
    res.json(result);
}
