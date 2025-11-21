import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// POST /api/portfolio/[id]/projects - Add project to portfolio
export async function POST(
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
    const body = await request.json();
    const { title, description, imageUrl, url, technologies, featured } = body;

    // Check if portfolio exists and user owns it
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: portfolioId },
      include: {
        projects: true
      }
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

    // Get max order value
    const maxOrder = portfolio.projects.reduce((max, p) => Math.max(max, p.order), -1);

    // Create project
    const project = await prisma.project.create({
      data: {
        portfolioId,
        title,
        description,
        imageUrl,
        url,
        technologies: technologies || [],
        featured: featured || false,
        order: maxOrder + 1
      }
    });

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Create project error:", error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    );
  }
}

// GET /api/portfolio/[id]/projects - Get all projects for portfolio
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: portfolioId } = params;

    const projects = await prisma.project.findMany({
      where: { portfolioId },
      orderBy: { order: 'asc' }
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("Get projects error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
