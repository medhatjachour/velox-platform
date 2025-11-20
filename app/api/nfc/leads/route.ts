/**
 * Lead Capture API Route
 * POST /api/nfc/leads - Capture lead information from NFC tap
 */

import { NextRequest, NextResponse } from 'next/server';
import { NfcService } from '@/lib/services';
import { ValidationError, NotFoundError } from '@/lib/errors';

const nfcService = new NfcService();

/**
 * POST /api/nfc/leads
 * Capture lead information from an NFC tap
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { shortCode, name, email, phone, company, message } = body;

    if (!shortCode) {
      return NextResponse.json(
        { error: 'Short code is required' },
        { status: 400 }
      );
    }

    if (!email && !phone) {
      return NextResponse.json(
        { error: 'At least one contact method (email or phone) is required' },
        { status: 400 }
      );
    }

    const lead = await nfcService.captureLead(shortCode, {
      name,
      email,
      phone,
      company,
      message,
    });
    
    return NextResponse.json({ lead }, { status: 201 });
  } catch (error) {
    console.error('POST /api/nfc/leads error:', error);
    
    if (error instanceof NotFoundError) {
      return NextResponse.json(
        { error: error.message },
        { status: 404 }
      );
    }
    
    if (error instanceof ValidationError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Failed to capture lead' },
      { status: 500 }
    );
  }
}
