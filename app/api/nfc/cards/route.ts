/**
 * NFC Cards API Routes
 * GET /api/nfc/cards - List user's NFC cards
 * POST /api/nfc/cards - Create a new NFC card
 */

import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { NfcService } from '@/lib/services';
import { ValidationError, NotFoundError } from '@/lib/errors';

const nfcService = new NfcService();

/**
 * GET /api/nfc/cards
 * List all NFC cards for the authenticated user
 */
export async function GET() {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const cards = await nfcService.getUserNfcCards(userId);
    
    return NextResponse.json({ cards });
  } catch (error) {
    console.error('GET /api/nfc/cards error:', error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to fetch NFC cards' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/nfc/cards
 * Create a new NFC card
 */
export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { portfolioId } = body;

    if (!portfolioId) {
      return NextResponse.json(
        { error: 'Portfolio ID is required' },
        { status: 400 }
      );
    }

    const card = await nfcService.createNfcCard(userId, { portfolioId });
    
    return NextResponse.json({ card }, { status: 201 });
  } catch (error) {
    console.error('POST /api/nfc/cards error:', error);
    
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to create NFC card' },
      { status: 500 }
    );
  }
}
