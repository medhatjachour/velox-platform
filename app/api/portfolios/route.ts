/**
 * Portfolio API Routes
 * GET /api/portfolios - List user's portfolios
 * POST /api/portfolios - Create a new portfolio
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PortfolioService, UserService } from '@/lib/services';
import { CreatePortfolioDTO } from '@/types';
import { ValidationError, NotFoundError } from '@/lib/errors';

const portfolioService = new PortfolioService();
const userService = new UserService();

/**
 * GET /api/portfolios
 * List all portfolios for the authenticated user
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

    // Ensure user exists in database (sync from Clerk)
    const user = await userService.ensureUserExists(userId);

    const portfolios = await portfolioService.getUserPortfolios(user.id);
    
    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error('GET /api/portfolios error:', error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch portfolios' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/portfolios
 * Create a new portfolio
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

    // Ensure user exists in database (sync from Clerk)
    const user = await userService.ensureUserExists(userId);

    const body = await request.json();
    
    const portfolioData: CreatePortfolioDTO = {
      userId: user.id,
      slug: body.slug,
      title: body.title,
      bio: body.bio,
      headline: body.headline,
      heroImageUrl: body.heroImageUrl,
      theme: body.theme,
      sections: body.sections,
    };

    const portfolio = await portfolioService.createPortfolio(user.id, portfolioData);
    
    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error('POST /api/portfolios error:', error);
    
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create portfolio' },
      { status: 500 }
    );
  }
}
