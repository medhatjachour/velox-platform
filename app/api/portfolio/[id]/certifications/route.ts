import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { prisma } from "@/lib/db/prisma";

// GET - List all certifications for a portfolio
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

    const certifications = await prisma.certification.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(certifications);
  } catch (error: any) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json(
      { error: "Failed to fetch certifications" },
      { status: 500 }
    );
  }
}

// PATCH - Batch update/create certifications
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

    // Delete existing certifications
    await prisma.certification.deleteMany({
      where: { portfolioId },
    });

    // Create new certifications
    await prisma.certification.createMany({
      data: items.map((item: any, index: number) => ({
        portfolioId,
        name: item.name,
        issuer: item.issuer,
        date: item.date,
        expiryDate: item.expiryDate,
        credentialUrl: item.credentialUrl,
        order: index,
      })),
    });

    const certifications = await prisma.certification.findMany({
      where: { portfolioId },
      orderBy: { order: "asc" },
    });

    return NextResponse.json(certifications);
  } catch (error: any) {
    console.error("Error updating certifications:", error);
    return NextResponse.json(
      { error: "Failed to update certifications" },
      { status: 500 }
    );
  }
}
