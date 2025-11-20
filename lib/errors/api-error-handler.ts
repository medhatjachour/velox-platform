/**
 * API Error Handler
 * 
 * Centralized error handling for API routes.
 * Converts errors to consistent API responses.
 */

import { NextResponse } from 'next/server';
import { AppError } from './app-error';
import { ApiResponse } from '@/types';

/**
 * Handle errors in API routes
 * 
 * @param error - The error to handle
 * @returns NextResponse with appropriate status code and error message
 */
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('[API Error]:', error);

  // Handle known AppErrors
  if (error instanceof AppError) {
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: {
          code: error.code,
          message: error.message,
          statusCode: error.statusCode,
          details: error.details,
        },
      },
      { status: error.statusCode }
    );
  }

  // Handle Zod validation errors
  if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
    const zodError = error as { issues: Array<{ path: string[]; message: string }> };
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Invalid request data',
          statusCode: 400,
          details: {
            issues: zodError.issues.map((issue) => ({
              field: issue.path.join('.'),
              message: issue.message,
            })),
          },
        },
      },
      { status: 400 }
    );
  }

  // Handle standard JavaScript errors
  if (error instanceof Error) {
    // Check for database errors (Drizzle/PostgreSQL)
    if (error.message.includes('violates') || error.message.includes('duplicate key')) {
      return NextResponse.json<ApiResponse>(
        {
          success: false,
          error: {
            code: 'DATABASE_CONSTRAINT_ERROR',
            message: 'A database constraint was violated',
            statusCode: 409,
          },
        },
        { status: 409 }
      );
    }

    // Generic error
    return NextResponse.json<ApiResponse>(
      {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: process.env.NODE_ENV === 'development' 
            ? error.message 
            : 'An unexpected error occurred',
          statusCode: 500,
        },
      },
      { status: 500 }
    );
  }

  // Unknown error type
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: {
        code: 'UNKNOWN_ERROR',
        message: 'An unknown error occurred',
        statusCode: 500,
      },
    },
    { status: 500 }
  );
}

/**
 * Async error wrapper for API route handlers
 * 
 * @param handler - The async handler function
 * @returns Wrapped handler with error handling
 */
export function withErrorHandler<T>(
  handler: (...args: T[]) => Promise<NextResponse>
) {
  return async (...args: T[]): Promise<NextResponse> => {
    try {
      return await handler(...args);
    } catch (error) {
      return handleApiError(error);
    }
  };
}

/**
 * Create a success response
 */
export function successResponse<T>(
  data: T,
  meta?: ApiResponse['meta'],
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json<ApiResponse<T>>(
    {
      success: true,
      data,
      meta,
    },
    { status }
  );
}

/**
 * Create an error response
 */
export function errorResponse(
  message: string,
  code: string = 'ERROR',
  statusCode: number = 500,
  details?: Record<string, unknown>
): NextResponse<ApiResponse> {
  return NextResponse.json<ApiResponse>(
    {
      success: false,
      error: {
        code,
        message,
        statusCode,
        details,
      },
    },
    { status: statusCode }
  );
}
