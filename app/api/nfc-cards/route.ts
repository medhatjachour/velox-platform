import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db/prisma";
import { getCurrentUser } from "@/lib/auth/get-current-user";

// GET /api/nfc-cards - Get user's NFC cards
export async function GET() {
  try {
    const user = await getCurrentUser();
    
    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const cards = await prisma.nFCCard.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json({ cards });
  } catch (error) {
    console.error("Get NFC cards error:", error);
    return NextResponse.json(
      { error: "Failed to fetch NFC cards" },
      { status: 500 }
    );
  }
}

// POST /api/nfc-cards - Create/register new NFC card
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
    const { name, cardUid, portfolioSlug, design } = body;

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Generate short code if not provided (for new cards from orders)
    const shortCode = cardUid || `NFC-${Date.now().toString(36).toUpperCase()}`;

    // Check if card UID already exists
    if (cardUid) {
      const existingCard = await prisma.nFCCard.findUnique({
        where: { cardUid }
      });

      if (existingCard) {
        return NextResponse.json(
          { error: "Card already registered" },
          { status: 409 }
        );
      }
    }

    // Create card
    const card = await prisma.nFCCard.create({
      data: {
        userId: user.id,
        name,
        cardUid: shortCode,
        shortCode,
        portfolioSlug,
        design: design || null,
        status: 'PENDING'
      }
    });

    return NextResponse.json({ card }, { status: 201 });
  } catch (error) {
    console.error("Create NFC card error:", error);
    return NextResponse.json(
      { error: "Failed to create NFC card" },
      { status: 500 }
    );
  }
}
