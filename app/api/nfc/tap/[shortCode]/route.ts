/**
 * NFC Tap Handler API Route
 * GET /api/nfc/tap/[shortCode] - Handle NFC tap and redirect
 */

import { NextRequest, NextResponse } from 'next/server';
import { NfcService } from '@/lib/services';
import { NotFoundError } from '@/lib/errors';

const nfcService = new NfcService();

/**
 * GET /api/nfc/tap/[shortCode]
 * Handle NFC tap and return redirect URL
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortCode: string }> }
) {
  try {
    const { shortCode } = await params;
    
    // Get user agent and IP for analytics
    const userAgent = request.headers.get('user-agent') || '';
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               '';

    const result = await nfcService.handleNfcTap(shortCode, {
      userAgent,
      ipAddress: ip,
    });
    
    // Redirect to the portfolio
    return NextResponse.redirect(result.redirectUrl);
  } catch (error) {
    console.error(`GET /api/nfc/tap/${(await params).shortCode} error:`, error);
    
    if (error instanceof NotFoundError) {
      // Redirect to a 404 page or landing page
      return NextResponse.redirect(new URL('/404', request.url));
    }
    
    // For other errors, redirect to home
    return NextResponse.redirect(new URL('/', request.url));
  }
}
