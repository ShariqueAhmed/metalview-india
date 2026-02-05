/**
 * Dynamic OG Image Generation
 * Generates Open Graph images for social media sharing
 */

import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metal = searchParams.get('metal') || 'gold';
    const city = searchParams.get('city') || 'India';
    const price = searchParams.get('price') || '';
    const change = searchParams.get('change') || '';

    const metalColors: Record<string, string> = {
      gold: '#f59e0b',
      silver: '#6b7280',
      copper: '#f97316',
      platinum: '#3b82f6',
    };

    const metalColor = metalColors[metal] || '#f59e0b';
    const metalName = metal.charAt(0).toUpperCase() + metal.slice(1);
    const cityName = city.charAt(0).toUpperCase() + city.slice(1);

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              marginBottom: '40px',
            }}
          >
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                backgroundColor: metalColor,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '40px',
              }}
            >
              💰
            </div>
            <div>
              <div
                style={{
                  fontSize: '48px',
                  fontWeight: 'bold',
                  color: '#ffffff',
                  marginBottom: '8px',
                }}
              >
                MetalView India
              </div>
              <div
                style={{
                  fontSize: '24px',
                  color: '#94a3b8',
                }}
              >
                Real-time Precious Metals Pricing
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '20px',
              padding: '60px',
              backgroundColor: '#1e293b',
              borderRadius: '24px',
              border: `3px solid ${metalColor}`,
            }}
          >
            <div
              style={{
                fontSize: '36px',
                color: '#94a3b8',
                marginBottom: '10px',
              }}
            >
              {metalName} Price in {cityName}
            </div>
            {price && (
              <div
                style={{
                  fontSize: '72px',
                  fontWeight: 'bold',
                  color: metalColor,
                  marginBottom: '10px',
                }}
              >
                ₹{price}
              </div>
            )}
            {change && (
              <div
                style={{
                  fontSize: '32px',
                  color: change.startsWith('-') ? '#ef4444' : '#10b981',
                }}
              >
                {change.startsWith('-') ? '' : '+'}{change}%
              </div>
            )}
          </div>

          {/* Footer */}
          <div
            style={{
              marginTop: '40px',
              fontSize: '20px',
              color: '#64748b',
            }}
          >
            metalview.in
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (error) {
    console.error('OG image generation error:', error);
    // Return a simple fallback image
    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            color: '#ffffff',
            fontSize: '48px',
          }}
        >
          MetalView India
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  }
}
