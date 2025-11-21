import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";

// POST /api/analytics/track - Track portfolio view
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { portfolioId, portfolioSlug } = body;

    let finalPortfolioId = portfolioId;

    // If slug provided, get portfolio ID
    if (!finalPortfolioId && portfolioSlug) {
      const portfolio = await prisma.portfolio.findUnique({
        where: { slug: portfolioSlug },
        select: { id: true }
      });

      if (!portfolio) {
        return NextResponse.json(
          { error: "Portfolio not found" },
          { status: 404 }
        );
      }

      finalPortfolioId = portfolio.id;
    }

    if (!finalPortfolioId) {
      return NextResponse.json(
        { error: "Portfolio ID or slug required" },
        { status: 400 }
      );
    }

    // Get request metadata
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const referrer = request.headers.get('referer') || null;

    // Create view record
    await prisma.portfolioView.create({
      data: {
        portfolioId: finalPortfolioId,
        ipAddress,
        userAgent,
        referrer
      }
    });

    // Increment view count
    await prisma.portfolio.update({
      where: { id: finalPortfolioId },
      data: {
        viewCount: { increment: 1 }
      }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Track view error:", error);
    return NextResponse.json(
      { error: "Failed to track view" },
      { status: 500 }
    );
  }
}
