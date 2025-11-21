import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// GET /api/portfolio - Get user's portfolios
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const portfolios = await prisma.portfolio.findMany({
      where: { userId: user.id },
      include: {
        projects: {
          orderBy: { order: 'asc' }
        },
        _count: {
          select: {
            views: true,
            leads: true
          }
        }
      },
      orderBy: { updatedAt: 'desc' }
    });

    return NextResponse.json({ portfolios });
  } catch (error) {
    console.error("Get portfolios error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolios" },
      { status: 500 }
    );
  }
}

// POST /api/portfolio - Create new portfolio
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { title, bio, headline, slug, theme } = body;

    // Validate required fields
    if (!title || !slug) {
      return NextResponse.json(
        { error: "Title and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug is already taken
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { slug }
    });

    if (existingPortfolio) {
      return NextResponse.json(
        { error: "Slug already taken" },
        { status: 409 }
      );
    }

    // Create portfolio
    const portfolio = await prisma.portfolio.create({
      data: {
        userId: user.id,
        title,
        bio,
        headline,
        slug,
        theme: theme || null,
        isPublished: false
      },
      include: {
        projects: true
      }
    });

    return NextResponse.json({ portfolio }, { status: 201 });
  } catch (error) {
    console.error("Create portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to create portfolio" },
      { status: 500 }
    );
  }
}
