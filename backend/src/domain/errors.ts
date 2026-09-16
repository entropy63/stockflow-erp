/**
 * Application error hierarchy.
 * Services throw these; the central error middleware maps them to HTTP responses.
 * Never throw a raw Error for expected business failures.
 */
export class AppError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
  ) {
    super(message);
    this.name = 'AppError';
  }
}

/** 400 — semantically invalid input that zod can't catch (e.g. empty order lines). */
export class ValidationError extends AppError {
  constructor(message: string) {
    super(400, 'VALIDATION_ERROR', message);
    this.name = 'ValidationError';
  }
}

/** 401 — missing or invalid credentials. */
export class UnauthorizedError extends AppError {
  constructor(message = 'Authentication required') {
    super(401, 'UNAUTHORIZED', message);
    this.name = 'UnauthorizedError';
  }
}

/** 403 — authenticated but lacking the required permission. */
export class ForbiddenError extends AppError {
  constructor(message = 'You do not have permission to perform this action') {
    super(403, 'FORBIDDEN', message);
    this.name = 'ForbiddenError';
  }
}

/** 404 — resource does not exist. Message is built from the resource name and optional id. */
export class NotFoundError extends AppError {
  constructor(resource: string, id?: string | number) {
    super(404, 'NOT_FOUND', id ? `${resource} ${id} not found` : `${resource} not found`);
    this.name = 'NotFoundError';
  }
}

/** 409 — state conflict, e.g. duplicate key or invalid status transition. */
export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, 'CONFLICT', message);
    this.name = 'ConflictError';
  }
}

/** 422 — business rule violation, e.g. insufficient stock. */
export class BusinessRuleError extends AppError {
  constructor(message: string) {
    super(422, 'BUSINESS_RULE', message);
    this.name = 'BusinessRuleError';
  }
}
