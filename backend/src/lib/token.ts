import jwt from 'jsonwebtoken';
import type {Role} from  '@prisma/client';
import {env} from '../env';

export  interface TokenPayload {
    sub: string;
    email: string;
    role: Role;
}

const EXPIRES_IN_SECONDS = 60 * 60 * 24 * 7; // 7 days

export function signToken(payload: TokenPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {expiresIn: EXPIRES_IN_SECONDS});
}

export function verifyToken(token: string): TokenPayload {
    return jwt.verify(token, env.JWT_SECRET) as TokenPayload;
}   