import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// POST /api/portfolio/[id]/publish - Publish/unpublish portfolio
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { isPublished } = body;

    // Check if portfolio exists and user owns it
    const existingPortfolio = await prisma.portfolio.findUnique({
      where: { id }
    });

    if (!existingPortfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    if (existingPortfolio.userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Update publish status
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: {
        isPublished,
        publishedAt: isPublished ? new Date() : null
      }
    });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Publish portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to update publish status" },
      { status: 500 }
    );
  }
}
