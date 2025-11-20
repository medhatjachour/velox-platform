/**
 * User Subscription Upgrade API Route
 * POST /api/users/me/upgrade - Upgrade user subscription
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { UserService } from '@/lib/services';
import { ValidationError, NotFoundError } from '@/lib/errors';
import { SubscriptionTier } from '@/types';

const userService = new UserService();

/**
 * POST /api/users/me/upgrade
 * Upgrade the current user's subscription
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { tier } = body;

    if (!tier) {
      return NextResponse.json(
        { error: 'Subscription tier is required' },
        { status: 400 }
      );
    }

    // Validate tier
    const validTiers: SubscriptionTier[] = ['free', 'pro', 'premium'];
    if (!validTiers.includes(tier)) {
      return NextResponse.json(
        { error: 'Invalid subscription tier' },
        { status: 400 }
      );
    }

    const user = await userService.upgradeSubscription(userId, tier);
    
    return NextResponse.json({ user });
  } catch (error) {
    console.error('POST /api/users/me/upgrade error:', error);
    
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
      { error: 'Failed to upgrade subscription' },
      { status: 500 }
    );
  }
}
