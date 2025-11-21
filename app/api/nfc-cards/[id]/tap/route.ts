import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// POST /api/nfc-cards/[id]/tap - Track NFC card tap
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id: cardId } = params;

    // Find card by ID or shortCode
    const card = await prisma.nFCCard.findFirst({
      where: {
        OR: [
          { id: cardId },
          { shortCode: cardId },
          { cardUid: cardId }
        ]
      }
    });

    if (!card) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    // Increment tap count
    await prisma.nFCCard.update({
      where: { id: card.id },
      data: {
        tapCount: { increment: 1 }
      }
    });

    // Return redirect info
    let redirectUrl = '/';
    
    if (card.portfolioSlug) {
      redirectUrl = `/p/${card.portfolioSlug}`;
    }

    return NextResponse.json({ 
      success: true,
      redirectUrl,
      card: {
        id: card.id,
        name: card.name,
        tapCount: card.tapCount + 1
      }
    });
  } catch (error) {
    console.error("Track tap error:", error);
    return NextResponse.json(
      { error: "Failed to track tap" },
      { status: 500 }
    );
  }
}

// PUT /api/nfc-cards/[id]/activate - Activate NFC card
export async function PUT(
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

    const { id: cardId } = params;

    const card = await prisma.nFCCard.findUnique({
      where: { id: cardId }
    });

    if (!card) {
      return NextResponse.json(
        { error: "Card not found" },
        { status: 404 }
      );
    }

    if (card.userId !== user.id) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      );
    }

    // Activate card
    const updatedCard = await prisma.nFCCard.update({
      where: { id: cardId },
      data: {
        status: 'ACTIVE',
        activatedAt: new Date()
      }
    });

    return NextResponse.json({ card: updatedCard });
  } catch (error) {
    console.error("Activate card error:", error);
    return NextResponse.json(
      { error: "Failed to activate card" },
      { status: 500 }
    );
  }
}
