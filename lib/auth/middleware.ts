/**
 * Authentication Middleware
 * 
 * Middleware functions for protecting API routes and validating permissions.
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { UserRepository } from '@/lib/repositories';
import { UnauthorizedError, ForbiddenError, InsufficientPermissionsError } from '@/lib/errors';
import { Role, SubscriptionTier, User } from '@/types';
import { requireRole, requireSubscription } from './helpers';

/**
 * Middleware context with authenticated user
 */
export interface AuthContext {
  userId: string;
  user: User;
}

/**
 * Authenticated route handler type
 */
export type AuthenticatedHandler<T = any> = (
  request: NextRequest,
  context: AuthContext
) => Promise<NextResponse<T>>;

/**
 * Protect API route - require authentication
 */
export function withAuth(handler: AuthenticatedHandler) {
  return async (request: NextRequest): Promise<NextResponse> => {
    try {
      // Get Clerk auth
      const { userId } = await auth();
      
      if (!userId) {
        throw new UnauthorizedError('Authentication required');
      }

      // Get user from database
      const userRepo = new UserRepository();
      const user = await userRepo.findByClerkId(userId);

      if (!user) {
        throw new UnauthorizedError('User not found in database');
      }

      // Call the handler with auth context
      return await handler(request, { userId, user });
    } catch (error) {
      // Re-throw to be caught by error handler
      throw error;
    }
  };
}

/**
 * Protect route and require specific role
 */
export function withRole(requiredRole: Role | Role[]) {
  return function (handler: AuthenticatedHandler) {
    return withAuth(async (request: NextRequest, context: AuthContext) => {
      requireRole(context.user.role, requiredRole);
      return handler(request, context);
    });
  };
}

/**
 * Protect route and require specific subscription tier
 */
export function withSubscription(requiredTier: SubscriptionTier | SubscriptionTier[]) {
  return function (handler: AuthenticatedHandler) {
    return withAuth(async (request: NextRequest, context: AuthContext) => {
      requireSubscription(context.user.subscriptionTier, requiredTier);
      return handler(request, context);
    });
  };
}

/**
 * Validate user owns a resource
 */
export function requireOwnership(resourceUserId: string, requestUserId: string, userRole: Role) {
  // Admins can access any resource
  if (userRole === 'SUPER_ADMIN' || userRole === 'TEAM_ADMIN') {
    return;
  }
  
  // Regular users can only access their own resources
  if (resourceUserId !== requestUserId) {
    throw new ForbiddenError('You do not have permission to access this resource');
  }
}

/**
 * Validate team membership
 */
export async function requireTeamMembership(userId: string, teamId: string) {
  const userRepo = new UserRepository();
  const user = await userRepo.findById(userId);
  
  if (!user) {
    throw new UnauthorizedError('User not found');
  }
  
  if (user.teamId !== teamId && user.role !== 'SUPER_ADMIN') {
    throw new InsufficientPermissionsError('You are not a member of this team');
  }
}
