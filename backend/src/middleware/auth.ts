import type { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../lib/token';
import { UnauthorizedError} from  "../domain/errors"
import {Role} from "@prisma/client";
import { ForbiddenError } from '../domain/errors';
export function authenticate(req: Request, _res: Response, next: NextFunction) {
    const header = req.headers.authorization;

    if (!header || !header.startsWith('Bearer ')){
        return next(new UnauthorizedError('Missing or invalid authorization header'));
    }
const token = header.slice('Bearer '.length);

try {
    req.user = verifyToken(token);
    next();
} catch{
    next(new UnauthorizedError('Invalid token'));
}}
export function authorize(...allowed:Role[]){
    return  (req: Request, _res: Response,next: NextFunction)=>{
        if (!req.user){
            return next(new UnauthorizedError("Authentication required"))
        }
        if (!allowed.includes(req.user.role)){
            return next(new ForbiddenError())
        }
        next()
    }
}