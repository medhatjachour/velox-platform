import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// GET /api/teams - Get user's teams
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Get teams where user is owner or member
    const ownedTeams = await prisma.team.findMany({
      where: { ownerId: user.id },
      include: {
        _count: {
          select: {
            members: true,
            portfolios: true
          }
        }
      }
    });

    const memberTeams = await prisma.teamMember.findMany({
      where: { userId: user.id },
      include: {
        team: {
          include: {
            _count: {
              select: {
                members: true,
                portfolios: true
              }
            }
          }
        }
      }
    });

    const teams = [
      ...ownedTeams.map(team => ({ ...team, isOwner: true })),
      ...memberTeams.map(tm => ({ ...tm.team, isOwner: false, memberRole: tm.role }))
    ];

    return NextResponse.json({ teams });
  } catch (error) {
    console.error("Get teams error:", error);
    return NextResponse.json(
      { error: "Failed to fetch teams" },
      { status: 500 }
    );
  }
}

// POST /api/teams - Create new team
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
    const { name, slug, description, logoUrl } = body;

    if (!name || !slug) {
      return NextResponse.json(
        { error: "Name and slug are required" },
        { status: 400 }
      );
    }

    // Check if slug is taken
    const existingTeam = await prisma.team.findUnique({
      where: { slug }
    });

    if (existingTeam) {
      return NextResponse.json(
        { error: "Slug already taken" },
        { status: 409 }
      );
    }

    // Create team
    const team = await prisma.team.create({
      data: {
        name,
        slug,
        description,
        logoUrl,
        ownerId: user.id
      },
      include: {
        _count: {
          select: {
            members: true,
            portfolios: true
          }
        }
      }
    });

    return NextResponse.json({ team }, { status: 201 });
  } catch (error) {
    console.error("Create team error:", error);
    return NextResponse.json(
      { error: "Failed to create team" },
      { status: 500 }
    );
  }
}
