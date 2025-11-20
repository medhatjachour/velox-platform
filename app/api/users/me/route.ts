/**
 * User Profile API Route
 * GET /api/users/me - Get current user profile
 * PATCH /api/users/me - Update user profile
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { UserService } from '@/lib/services';
import { ValidationError, NotFoundError } from '@/lib/errors';

const userService = new UserService();

/**
 * GET /api/users/me
 * Get the current user's profile
 */
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await userService.getUserById(userId);
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('GET /api/users/me error:', error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/users/me
 * Update the current user's profile
 */
export async function PATCH(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { subscriptionTier, role } = body;

    // Prevent users from changing their own role via API
    if (role) {
      return NextResponse.json(
        { error: 'Cannot change user role via this endpoint' },
        { status: 403 }
      );
    }

    const user = await userService.updateUser(userId, {
      subscriptionTier,
    });
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('PATCH /api/users/me error:', error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update user profile' },
      { status: 500 }
    );
  }
}
