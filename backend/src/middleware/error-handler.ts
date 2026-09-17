import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client';
import { AppError } from '../domain/errors';
import { env } from '../env';


export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // 1. Handled, expected errors thrown by our services.
  if (err instanceof AppError) {
    res.status(err.status).json({ error: { code: err.code, message: err.message } });
    return;
  }

  // 2. zod validation failures at the route boundary.
  if (err instanceof ZodError) {
    res.status(400).json({
      error: {
        code: 'INVALID_REQUEST',
        message: 'Request validation failed',
        details: err.issues.map((i) => ({ path: i.path.join('.'), message: i.message })),
      },
    });
    return;
  }

  // 3. Prisma known request errors → meaningful 4xx responses.
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === 'P2002') {
      const target = Array.isArray(err.meta?.target)
        ? err.meta.target.join(', ')
        : err.meta?.target;
      res.status(409).json({
        error: { code: 'DUPLICATE', message: `A record with this value already exists: ${target}` },
      });
      return;
    }
    if (err.code === 'P2025') {
      res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Record not found' } });
      return;
    }
    // Any other Prisma code falls through to the generic handler below.
  }

  // 4. Unexpected errors — log fully, leak nothing to the client in production.
  console.error(err);
  res.status(500).json({
    error: {
      code: 'INTERNAL',
      message:
        env.NODE_ENV === 'production'
          ? 'An unexpected error occurred'
          : err instanceof Error
            ? err.message
            : 'An unexpected error occurred',
    },
  });
}
