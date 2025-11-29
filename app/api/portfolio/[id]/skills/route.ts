import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { prisma } from "@/lib/db/prisma";

// GET - List all skills for a portfolio
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

    const skills = await prisma.skill.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(skills);
  } catch (error: any) {
    console.error("Error fetching skills:", error);
    return NextResponse.json(
      { error: "Failed to fetch skills" },
      { status: 500 }
    );
  }
}

// PATCH - Batch update/create skills
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

    // Delete existing skills
    await prisma.skill.deleteMany({
      where: { portfolioId },
    });

    // Create new skills
    await prisma.skill.createMany({
      data: items.map((item: any, index: number) => ({
        portfolioId,
        name: item.name,
        category: item.category || "technical",
        level: item.level,
        order: index,
      })),
    });

    const skills = await prisma.skill.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(skills);
  } catch (error: any) {
    console.error("Error updating skills:", error);
    return NextResponse.json(
      { error: "Failed to update skills" },
      { status: 500 }
    );
  }
}
