import type { Request, Response } from 'express';
import {login} from './service';
import type {LoginInput} from './schema';

export async function loginHandler(req: Request, res: Response){
    const {email,password} = req.body as LoginInput;
    const result = await login(email,password);
    res.json(result);
}
