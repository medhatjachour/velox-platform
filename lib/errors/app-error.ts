/**
 * Custom Application Errors
 * 
 * Defines custom error classes for different types of application errors.
 * These errors can be caught and handled appropriately in API routes.
 */

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly code: string;
  public readonly details?: Record<string, unknown>;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    details?: Record<string, unknown>
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);

    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.code = code;
    this.details = details;

    Error.captureStackTrace(this);
  }
}

// ============================================================================
// 400 - BAD REQUEST ERRORS
// ============================================================================

export class ValidationError extends AppError {
  constructor(message: string = 'Validation failed', details?: Record<string, unknown>) {
    super(message, 400, 'VALIDATION_ERROR', true, details);
  }
}

export class InvalidInputError extends AppError {
  constructor(message: string = 'Invalid input provided') {
    super(message, 400, 'INVALID_INPUT', true);
  }
}

// ============================================================================
// 401 - UNAUTHORIZED ERRORS
// ============================================================================

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401, 'UNAUTHORIZED', true);
  }
}

export class InvalidTokenError extends AppError {
  constructor(message: string = 'Invalid or expired token') {
    super(message, 401, 'INVALID_TOKEN', true);
  }
}

// ============================================================================
// 403 - FORBIDDEN ERRORS
// ============================================================================

export class ForbiddenError extends AppError {
  constructor(message: string = 'Access forbidden') {
    super(message, 403, 'FORBIDDEN', true);
  }
}

export class InsufficientPermissionsError extends AppError {
  constructor(message: string = 'Insufficient permissions to perform this action') {
    super(message, 403, 'INSUFFICIENT_PERMISSIONS', true);
  }
}

// ============================================================================
// 404 - NOT FOUND ERRORS
// ============================================================================

export class NotFoundError extends AppError {
  constructor(resource: string = 'Resource', id?: string) {
    const message = id 
      ? `${resource} with ID '${id}' not found`
      : `${resource} not found`;
    super(message, 404, 'NOT_FOUND', true);
  }
}

export class UserNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super('User', id);
  }
}

export class PortfolioNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super('Portfolio', id);
  }
}

export class NfcCardNotFoundError extends NotFoundError {
  constructor(id?: string) {
    super('NFC Card', id);
  }
}

// ============================================================================
// 409 - CONFLICT ERRORS
// ============================================================================

export class ConflictError extends AppError {
  constructor(message: string = 'Resource already exists') {
    super(message, 409, 'CONFLICT', true);
  }
}

export class DuplicateError extends AppError {
  constructor(field: string) {
    super(`A record with this ${field} already exists`, 409, 'DUPLICATE_ENTRY', true);
  }
}

// ============================================================================
// 429 - RATE LIMIT ERRORS
// ============================================================================

export class RateLimitError extends AppError {
  constructor(message: string = 'Too many requests, please try again later') {
    super(message, 429, 'RATE_LIMIT_EXCEEDED', true);
  }
}

export class AIRateLimitError extends RateLimitError {
  constructor(message: string = 'AI generation limit exceeded for your subscription tier') {
    super(message);
  }
}

// ============================================================================
// 500 - INTERNAL SERVER ERRORS
// ============================================================================

export class InternalServerError extends AppError {
  constructor(message: string = 'An internal server error occurred') {
    super(message, 500, 'INTERNAL_SERVER_ERROR', false);
  }
}

export class DatabaseError extends AppError {
  constructor(message: string = 'Database operation failed') {
    super(message, 500, 'DATABASE_ERROR', false);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: string, message?: string) {
    super(
      message || `External service '${service}' is unavailable`,
      503,
      'EXTERNAL_SERVICE_ERROR',
      true
    );
  }
}

// ============================================================================
// BUSINESS LOGIC ERRORS
// ============================================================================

export class SubscriptionError extends AppError {
  constructor(message: string = 'Subscription required for this feature') {
    super(message, 402, 'SUBSCRIPTION_REQUIRED', true);
  }
}

export class QuotaExceededError extends AppError {
  constructor(resource: string = 'resource') {
    super(
      `You have exceeded your ${resource} quota. Please upgrade your plan.`,
      429,
      'QUOTA_EXCEEDED',
      true
    );
  }
}

export class PaymentRequiredError extends AppError {
  constructor(message: string = 'Payment required to continue') {
    super(message, 402, 'PAYMENT_REQUIRED', true);
  }
}
