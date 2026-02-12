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

    const imageResponse = new ImageResponse(
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
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'baseline',
                  gap: '12px',
                }}
              >
                <span style={{ 
                  background: 'linear-gradient(to right, #f59e0b, #eab308, #f59e0b)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))'
                }}>Metal</span>
                <span style={{ 
                  background: 'linear-gradient(to right, #475569, #64748b, #475569)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>View</span>
                <span style={{ color: '#ffffff' }}> India</span>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 8px',
                  background: 'linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(234, 179, 8, 0.15))',
                  border: '1px solid rgba(245, 158, 11, 0.3)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#fbbf24'
                }}>
                  Trusted
                </span>
              </div>
              <div
                style={{
                  fontSize: '24px',
                  color: '#cbd5e1',
                  fontWeight: '500',
                }}
              >
                Real-time Precious Metals Pricing & Market Insights
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

    // Add optimized headers for successful image generation
    return new Response(imageResponse.body, {
      status: imageResponse.status,
      statusText: imageResponse.statusText,
      headers: {
        ...Object.fromEntries(imageResponse.headers.entries()),
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  } catch (error) {
    console.error('OG image generation error:', error);
    // Return a simple fallback image
    const fallbackResponse = new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            fontSize: '48px',
            fontWeight: 'bold',
            gap: '12px',
          }}
        >
          <span style={{ 
            background: 'linear-gradient(to right, #f59e0b, #eab308, #f59e0b)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 2px 4px rgba(245, 158, 11, 0.3))'
          }}>Metal</span>
          <span style={{ 
            background: 'linear-gradient(to right, #475569, #64748b, #475569)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>View</span>
          <span style={{ color: '#ffffff' }}> India</span>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );

    // Add optimized headers for fallback image
    return new Response(fallbackResponse.body, {
      status: fallbackResponse.status,
      statusText: fallbackResponse.statusText,
      headers: {
        ...Object.fromEntries(fallbackResponse.headers.entries()),
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        'X-Content-Type-Options': 'nosniff',
      },
    });
  }
}

// Add optimized headers for OG images (HEAD request)
export async function HEAD(_request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
      'X-Content-Type-Options': 'nosniff',
    },
  });
}
