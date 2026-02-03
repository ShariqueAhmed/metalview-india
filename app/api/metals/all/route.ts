/**
 * API Route: /api/metals/all
 * Fetches all metal prices from Ebullion API
 */

import { NextResponse } from 'next/server';
import { fetchAllMetalPrices } from '@/utils/ebullionFetcher';

export const dynamic = 'force-dynamic';
export const revalidate = 60; // Revalidate every 60 seconds

export async function GET() {
  try {
    const data = await fetchAllMetalPrices();

    return NextResponse.json({
      success: true,
      data,
      updated_at: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/metals/all:', error);
    
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch metal prices',
        updated_at: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
