import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// GET /api/analytics/portfolio/[id] - Get portfolio analytics
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id: portfolioId } = params;
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);

    // Check if portfolio belongs to user
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      select: { userId: true, viewCount: true }
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    if (portfolio.userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Get views in date range
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const views = await prisma.portfolioView.findMany({
      where: {
        portfolioId,
        viewedAt: {
          gte: startDate
        }
      },
      orderBy: { viewedAt: 'asc' }
    });

    // Aggregate by date
    const viewsByDate: Record<string, number> = {};
    views.forEach(view => {
      const date = view.viewedAt.toISOString().split('T')[0];
      viewsByDate[date] = (viewsByDate[date] || 0) + 1;
    });

    // Get referrer stats
    const referrerCounts: Record<string, number> = {};
    views.forEach(view => {
      if (view.referrer) {
        try {
          const url = new URL(view.referrer);
          const domain = url.hostname;
          referrerCounts[domain] = (referrerCounts[domain] || 0) + 1;
        } catch {
          // Invalid URL, skip
        }
      }
    });

    // Get country stats (if available)
    const countryCounts: Record<string, number> = {};
    views.forEach(view => {
      if (view.country) {
        countryCounts[view.country] = (countryCounts[view.country] || 0) + 1;
      }
    });

    return NextResponse.json({
      totalViews: portfolio.viewCount,
      recentViews: views.length,
      viewsByDate,
      topReferrers: Object.entries(referrerCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 10)
        .map(([domain, count]) => ({ domain, count })),
      viewsByCountry: Object.entries(countryCounts)
        .sort(([, a], [, b]) => b - a)
        .map(([country, count]) => ({ country, count }))
    });
  } catch (error) {
    console.error("Get analytics error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
