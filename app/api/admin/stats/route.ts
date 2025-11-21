import { NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { requireAdmin } from "@/lib/auth/admin-guard";

// GET /api/admin/stats - Get platform statistics
export async function GET() {
  try {
    await requireAdmin();

    // Get counts
    const [
      totalUsers,
      activeUsers,
      totalPortfolios,
      publishedPortfolios,
      totalTeams,
      totalNFCCards,
      totalOrders,
      totalRevenue
    ] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { isActive: true } }),
      prisma.portfolio.count(),
      prisma.portfolio.count({ where: { isPublished: true } }),
      prisma.team.count(),
      prisma.nFCCard.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: 'DELIVERED' }
      })
    ]);

    // Get recent signups (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentSignups = await prisma.user.count({
      where: {
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    // Get user growth by day (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const dailySignups = await prisma.$queryRaw<Array<{ date: Date; count: bigint }>>`
      SELECT DATE(created_at) as date, COUNT(*)::int as count
      FROM users
      WHERE created_at >= ${sevenDaysAgo}
      GROUP BY DATE(created_at)
      ORDER BY date ASC
    `;

    // Get subscription distribution
    const subscriptionStats = await prisma.user.groupBy({
      by: ['subscriptionTier'],
      _count: true
    });

    return NextResponse.json({
      users: {
        total: totalUsers,
        active: activeUsers,
        recentSignups,
        bySubscription: subscriptionStats.map(s => ({
          tier: s.subscriptionTier,
          count: s._count
        }))
      },
      portfolios: {
        total: totalPortfolios,
        published: publishedPortfolios
      },
      teams: {
        total: totalTeams
      },
      nfcCards: {
        total: totalNFCCards
      },
      orders: {
        total: totalOrders,
        revenue: totalRevenue._sum.total || 0
      },
      growth: {
        daily: dailySignups.map(d => ({
          date: d.date,
          count: Number(d.count)
        }))
      }
    });
  } catch (error: any) {
    console.error("Get admin stats error:", error);
    
    if (error.message === "Unauthorized" || error.message.startsWith("Forbidden")) {
      return NextResponse.json(
        { error: error.message },
        { status: error.message === "Unauthorized" ? 401 : 403 }
      );
    }
    
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
