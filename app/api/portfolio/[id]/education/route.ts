import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { prisma } from "@/lib/db/prisma";

// GET - List all education for a portfolio
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

    const education = await prisma.education.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(education);
  } catch (error: any) {
    console.error("Error fetching education:", error);
    return NextResponse.json(
      { error: "Failed to fetch education" },
      { status: 500 }
    );
  }
}

// PATCH - Batch update/create education entries
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
    await prisma.education.deleteMany({
      where: { portfolioId },
    });

    // Create new entries
    await prisma.education.createMany({
      data: items.map((item: any, index: number) => ({
        portfolioId,
        institution: item.institution,
        degree: item.degree,
        field: item.field,
        location: item.location,
        startDate: item.startDate,
        endDate: item.endDate,
        gpa: item.gpa,
        achievements: item.achievements || [],
        order: index,
      })),
    });

    const education = await prisma.education.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(education);
  } catch (error: any) {
    console.error("Error updating education:", error);
    return NextResponse.json(
      { error: "Failed to update education" },
      { status: 500 }
    );
  }
}
