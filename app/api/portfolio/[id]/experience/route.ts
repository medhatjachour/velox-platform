import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { prisma } from "@/lib/db/prisma";

// GET - List all experience for a portfolio
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolioId = params.id;
    
    // Check ownership
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      select: { userId: true },
    });

    if (!portfolio || portfolio.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const experience = await prisma.experience.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("Error fetching experience:", error);
    return NextResponse.json(
      { error: "Failed to fetch experience" },
      { status: 500 }
    );
  }
}

// POST - Create experience entry
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolioId = params.id;
    
    // Check ownership
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      select: { userId: true },
    });

    if (!portfolio || portfolio.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const {
      company,
      position,
      location,
      startDate,
      endDate,
      current,
      description,
      achievements,
      order,
    } = body;

    const experience = await prisma.experience.create({
      data: {
        portfolioId,
        company,
        position,
        location,
        startDate,
        endDate,
        current: current || false,
        description,
        achievements: achievements || [],
        order: order || 0,
      },
    });

    return NextResponse.json(experience, { status: 201 });
  } catch (error: any) {
    console.error("Error creating experience:", error);
    return NextResponse.json(
      { error: "Failed to create experience" },
      { status: 500 }
    );
  }
}

// PATCH - Batch update/create experience entries
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const portfolioId = params.id;
    
    // Check ownership
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      select: { userId: true },
    });

    if (!portfolio || portfolio.userId !== user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const { items } = body;

    // Delete existing entries
    await prisma.experience.deleteMany({
      where: { portfolioId },
    });

    // Create new entries
    const created = await prisma.experience.createMany({
      data: items.map((item: any, index: number) => ({
        portfolioId,
        company: item.company,
        position: item.position,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        current: item.current || false,
        description: item.description || "",
        achievements: item.achievements || [],
        order: index,
      })),
    });

    const experience = await prisma.experience.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(experience);
  } catch (error: any) {
    console.error("Error updating experience:", error);
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}
