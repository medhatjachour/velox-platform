import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// GET /api/portfolio/[id] - Get single portfolio
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser();
    const { id } = await params;

    const portfolio = await prisma.portfolio.findUnique({
      where: { id },
      include: {
        projects: {
          orderBy: { order: 'asc' }
        },
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            username: true
          }
        }
      }
    });

    if (!portfolio) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 }
      );
    }

    // Check if user owns this portfolio
    if (user?.id !== portfolio.userId) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("Get portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio/[id] - Update portfolio
export async function PUT(
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

    // Extract all possible fields
    const {
      title,
      bio,
      headline,
      theme,
      metaTitle,
      metaDescription,
      heroImageUrl,
      avatarUrl,
      email,
      phone,
      location,
      linkedinUrl,
      githubUrl,
      websiteUrl,
      twitterUrl,
      instagramUrl,
      youtubeUrl,
      facebookUrl,
      currentRole,
      company,
      yearsOfExperience,
      services,
      interests,
      cvData,
      generatedHTML,
      metadata,
      personality,
      designPreferences,
      goals,
      targetAudience,
      favoriteColors,
      values,
    } = body;

    // Build update data object with only defined fields
    const updateData: any = {};
    if (title !== undefined) updateData.title = title;
    if (bio !== undefined) updateData.bio = bio;
    if (headline !== undefined) updateData.headline = headline;
    if (theme !== undefined) updateData.theme = theme;
    if (metaTitle !== undefined) updateData.metaTitle = metaTitle;
    if (metaDescription !== undefined) updateData.metaDescription = metaDescription;
    if (heroImageUrl !== undefined) updateData.heroImageUrl = heroImageUrl;
    if (avatarUrl !== undefined) updateData.avatarUrl = avatarUrl;
    if (email !== undefined) updateData.email = email;
    if (phone !== undefined) updateData.phone = phone;
    if (location !== undefined) updateData.location = location;
    if (linkedinUrl !== undefined) updateData.linkedinUrl = linkedinUrl;
    if (githubUrl !== undefined) updateData.githubUrl = githubUrl;
    if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl;
    if (twitterUrl !== undefined) updateData.twitterUrl = twitterUrl;
    if (instagramUrl !== undefined) updateData.instagramUrl = instagramUrl;
    if (youtubeUrl !== undefined) updateData.youtubeUrl = youtubeUrl;
    if (facebookUrl !== undefined) updateData.facebookUrl = facebookUrl;
    if (currentRole !== undefined) updateData.currentRole = currentRole;
    if (company !== undefined) updateData.company = company;
    if (yearsOfExperience !== undefined) updateData.yearsOfExperience = yearsOfExperience;
    if (services !== undefined) updateData.services = services;
    if (interests !== undefined) updateData.interests = interests;
    if (cvData !== undefined) updateData.cvData = cvData;
    if (generatedHTML !== undefined) updateData.generatedHTML = generatedHTML;
    if (metadata !== undefined) updateData.metadata = metadata;
    if (personality !== undefined) updateData.personality = personality;
    if (designPreferences !== undefined) updateData.designPreferences = designPreferences;
    if (goals !== undefined) updateData.goals = goals;
    if (targetAudience !== undefined) updateData.targetAudience = targetAudience;
    if (favoriteColors !== undefined) updateData.favoriteColors = favoriteColors;
    if (values !== undefined) updateData.values = values;

    // Update portfolio
    console.log('💾 Updating portfolio:', { id, fieldsToUpdate: Object.keys(updateData) });
    
    const portfolio = await prisma.portfolio.update({
      where: { id },
      data: updateData,
      include: {
        projects: {
          orderBy: { order: 'asc' }
        }
      }
    });

    console.log('✅ Portfolio updated successfully:', { id: portfolio.id, hasGeneratedHTML: !!portfolio.generatedHTML });

    return NextResponse.json({ portfolio });
  } catch (error) {
    console.error("❌ Update portfolio error:");
    console.error("Error details:", error);
    console.error("Update data keys:", Object.keys(updateData));
    console.error("Portfolio ID:", id);
    
    // Return detailed error for debugging
    const errorMessage = error instanceof Error ? error.message : "Failed to update portfolio";
    return NextResponse.json(
      { error: errorMessage, details: error },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolio/[id] - Delete portfolio
export async function DELETE(
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

    // Delete portfolio (cascade will delete projects)
    await prisma.portfolio.delete({
      where: { id }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete portfolio error:", error);
    return NextResponse.json(
      { error: "Failed to delete portfolio" },
      { status: 500 }
    );
  }
}
