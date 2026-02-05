import { NextResponse } from 'next/server';
import { getHistoricalPrices } from '@/utils/historicalStorage';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30', 10);

    // Validate days parameter
    const validDays = Math.min(Math.max(days, 1), 30); // Between 1 and 30 days

    let historicalData = getHistoricalPrices(validDays);
    
    // If we don't have enough data, try to get current price and generate sample data
    if (historicalData.length < 2) {
      // Try to get current price from metals API
      try {
        const metalsResponse = await fetch(`${request.url.split('/api/historical')[0]}/api/metals?city=delhi`);
        if (metalsResponse.ok) {
          const metalsData = await metalsResponse.json();
          if (metalsData.gold_10g) {
            // Import storePrice dynamically to generate sample data
            const { storePrice } = await import('@/utils/historicalStorage');
            storePrice(metalsData.gold_10g);
            // Get data again after storing
            historicalData = getHistoricalPrices(validDays);
          }
        }
      } catch (e) {
        console.error('Error fetching current price for sample data:', e);
      }
    }

    return NextResponse.json({
      success: true,
      data: historicalData,
      days: validDays,
      count: historicalData.length,
    });
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch historical data',
        data: [],
      },
      { status: 500 }
    );
  }
}
