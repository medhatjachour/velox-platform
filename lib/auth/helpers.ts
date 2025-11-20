/**
 * Authentication Helper Functions
 * 
 * Provides utilities for working with Clerk authentication in the app.
 */

import { auth, currentUser } from '@clerk/nextjs/server';
import { UnauthorizedError, ForbiddenError } from '@/lib/errors';
import { Role, SubscriptionTier } from '@/types';

/**
 * Get the current authenticated user's session
 * Throws UnauthorizedError if not authenticated
 */
export async function requireAuth() {
  const { userId } = await auth();
  
  if (!userId) {
    throw new UnauthorizedError('You must be logged in to access this resource');
  }
  
  return { userId };
}

/**
 * Get the current authenticated user with Clerk data
 */
export async function getCurrentUser() {
  const user = await currentUser();
  
  if (!user) {
    throw new UnauthorizedError('You must be logged in to access this resource');
  }
  
  return user;
}

/**
 * Get the authenticated user's ID, or null if not authenticated
 */
export async function getOptionalAuth() {
  const { userId } = await auth();
  return userId ? { userId } : null;
}

/**
 * Check if the user has a specific role
 */
export function hasRole(userRole: Role, requiredRole: Role | Role[]): boolean {
  const roles: Role[] = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  
  // Role hierarchy: SUPER_ADMIN > TEAM_ADMIN > USER
  const roleHierarchy: Record<Role, number> = {
    USER: 1,
    TEAM_ADMIN: 2,
    SUPER_ADMIN: 3,
  };
  
  const userRoleLevel = roleHierarchy[userRole];
  
  return roles.some(role => {
    const requiredLevel = roleHierarchy[role];
    return userRoleLevel >= requiredLevel;
  });
}

/**
 * Require a specific role, throw ForbiddenError if not authorized
 */
export function requireRole(userRole: Role, requiredRole: Role | Role[]) {
  if (!hasRole(userRole, requiredRole)) {
    throw new ForbiddenError(`This action requires ${Array.isArray(requiredRole) ? requiredRole.join(' or ') : requiredRole} role`);
  }
}

/**
 * Check if user has a specific subscription tier or higher
 */
export function hasSubscription(
  userTier: SubscriptionTier,
  requiredTier: SubscriptionTier | SubscriptionTier[]
): boolean {
  const tiers: SubscriptionTier[] = Array.isArray(requiredTier) ? requiredTier : [requiredTier];
  
  // Tier hierarchy: ENTERPRISE > TEAM > PRO > FREE
  const tierHierarchy: Record<SubscriptionTier, number> = {
    FREE: 1,
    PRO: 2,
    TEAM: 3,
    ENTERPRISE: 4,
  };
  
  const userTierLevel = tierHierarchy[userTier];
  
  return tiers.some(tier => {
    const requiredLevel = tierHierarchy[tier];
    return userTierLevel >= requiredLevel;
  });
}

/**
 * Require a specific subscription tier
 */
export function requireSubscription(
  userTier: SubscriptionTier,
  requiredTier: SubscriptionTier | SubscriptionTier[]
) {
  if (!hasSubscription(userTier, requiredTier)) {
    throw new ForbiddenError(
      `This feature requires ${Array.isArray(requiredTier) ? requiredTier.join(' or ') : requiredTier} subscription`
    );
  }
}

/**
 * Check feature access based on subscription tier
 */
export interface FeatureAccess {
  canUseAI: boolean;
  canUseCustomDomain: boolean;
  canAccessAnalytics: boolean;
  canRemoveBranding: boolean;
  canUseCRMIntegration: boolean;
  maxPortfolios: number;
  maxNfcCards: number;
  maxLeadsPerMonth: number;
}

export function getFeatureAccess(tier: SubscriptionTier): FeatureAccess {
  const features: Record<SubscriptionTier, FeatureAccess> = {
    FREE: {
      canUseAI: true, // Basic AI only
      canUseCustomDomain: false,
      canAccessAnalytics: false,
      canRemoveBranding: false,
      canUseCRMIntegration: false,
      maxPortfolios: 1,
      maxNfcCards: 1,
      maxLeadsPerMonth: 10,
    },
    PRO: {
      canUseAI: true, // Advanced AI
      canUseCustomDomain: true,
      canAccessAnalytics: true,
      canRemoveBranding: true,
      canUseCRMIntegration: false,
      maxPortfolios: 5,
      maxNfcCards: 3,
      maxLeadsPerMonth: 100,
    },
    TEAM: {
      canUseAI: true,
      canUseCustomDomain: true,
      canAccessAnalytics: true,
      canRemoveBranding: true,
      canUseCRMIntegration: true,
      maxPortfolios: -1, // Unlimited
      maxNfcCards: 10,
      maxLeadsPerMonth: 500,
    },
    ENTERPRISE: {
      canUseAI: true,
      canUseCustomDomain: true,
      canAccessAnalytics: true,
      canRemoveBranding: true,
      canUseCRMIntegration: true,
      maxPortfolios: -1, // Unlimited
      maxNfcCards: -1, // Unlimited
      maxLeadsPerMonth: -1, // Unlimited
    },
  };
  
  return features[tier];
}

/**
 * Validate user can perform action based on quota
 */
export function canPerformAction(
  currentCount: number,
  maxAllowed: number
): boolean {
  if (maxAllowed === -1) return true; // Unlimited
  return currentCount < maxAllowed;
}

/**
 * Check if user owns a resource or has admin privileges
 * Throws ForbiddenError if user doesn't own the resource and isn't an admin
 */
export function requireOwnership(
  resourceOwnerId: string,
  currentUserId: string,
  userRole: Role
): void {
  // Super admins can access anything
  if (userRole === 'SUPER_ADMIN') {
    return;
  }
  
  // User must be the owner
  if (resourceOwnerId !== currentUserId) {
    throw new ForbiddenError('You do not have permission to access this resource');
  }
}
