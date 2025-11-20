/**
 * Portfolio Publish API Route
 * POST /api/portfolios/[id]/publish - Publish portfolio
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PortfolioService } from '@/lib/services';
import { NotFoundError, ForbiddenError } from '@/lib/errors';

const portfolioService = new PortfolioService();

/**
 * POST /api/portfolios/[id]/publish
 * Publish a portfolio
 */
export async function POST(
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
    const portfolio = await portfolioService.publishPortfolio(id, userId);
    
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error(`POST /api/portfolios/${(await params).id}/publish error:`, error);
    
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
      { error: 'Failed to publish portfolio' },
      { status: 500 }
    );
  }
}
