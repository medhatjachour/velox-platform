/**
 * Analytics API Route
 * GET /api/analytics/portfolios/[id] - Get portfolio analytics
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { AnalyticsService } from '@/lib/services';
import { NotFoundError, ForbiddenError } from '@/lib/errors';

const analyticsService = new AnalyticsService();

/**
 * GET /api/analytics/portfolios/[id]
 * Get analytics for a portfolio
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = await params;
    
    // Get query params for date range
    const searchParams = request.nextUrl.searchParams;
    const startDateStr = searchParams.get('startDate');
    const endDateStr = searchParams.get('endDate');
    
    const startDate = startDateStr ? new Date(startDateStr) : undefined;
    const endDate = endDateStr ? new Date(endDateStr) : undefined;

    const analytics = await analyticsService.getPortfolioAnalytics(
      id,
      userId,
      startDate,
      endDate
    );
    
    return NextResponse.json({ analytics });
  } catch (error) {
    console.error(`GET /api/analytics/portfolios/${(await params).id} error:`, error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    if (error instanceof ForbiddenError) {
      return NextResponse.json(
        { error: error.message },
        { status: 403 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
