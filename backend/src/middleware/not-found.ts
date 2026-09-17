import type { NextFunction, Request, Response } from 'express';
import { NotFoundError } from '../domain/errors';

/** Turns any unmatched route into our standard 404 instead of Express's default HTML. */
export function notFoundHandler(_req: Request, _res: Response, next: NextFunction) {
  next(new NotFoundError('Route'));
}
