/**
 * Portfolio API Routes - Single Portfolio
 * GET /api/portfolios/[id] - Get portfolio by ID
 * PATCH /api/portfolios/[id] - Update portfolio
 * DELETE /api/portfolios/[id] - Delete portfolio
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { PortfolioService } from '@/lib/services';
import { UpdatePortfolioDTO } from '@/types';
import { ValidationError, NotFoundError, ForbiddenError } from '@/lib/errors';

const portfolioService = new PortfolioService();

/**
 * GET /api/portfolios/[id]
 * Get a portfolio by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const portfolio = await portfolioService.getPortfolioById(id);
    
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error(`GET /api/portfolios/${(await params).id} error:`, error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch portfolio' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/portfolios/[id]
 * Update a portfolio
 */
export async function PATCH(
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
    const body = await request.json();
    
    const updateData: UpdatePortfolioDTO = {
      slug: body.slug,
      title: body.title,
      bio: body.bio,
      headline: body.headline,
      avatarUrl: body.avatarUrl,
      theme: body.theme,
      customColors: body.customColors,
      contactInfo: body.contactInfo,
      socialLinks: body.socialLinks,
      isPublished: body.isPublished,
    };

    const portfolio = await portfolioService.updatePortfolio(id, userId, updateData);
    
    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error(`PATCH /api/portfolios/${(await params).id} error:`, error);
    
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
    
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to update portfolio' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/portfolios/[id]
 * Delete a portfolio
 */
export async function DELETE(
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
    await portfolioService.deletePortfolio(id, userId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(`DELETE /api/portfolios/${(await params).id} error:`, error);
    
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
      { error: 'Failed to delete portfolio' },
      { status: 500 }
    );
  }
}
