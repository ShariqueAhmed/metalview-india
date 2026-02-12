/**
 * Google AdSense Component
 * Displays Google AdSense ads with proper responsive sizing
 */

'use client';

import { useEffect } from 'react';

// AdSense client ID from the script tag
const ADSENSE_CLIENT_ID = 'ca-pub-7313067850150544';

// Ad unit sizes
export type AdSize = 
  | 'responsive' 
  | 'auto' 
  | '728x90' // Leaderboard
  | '300x250' // Medium Rectangle
  | '336x280' // Large Rectangle
  | '320x100' // Large Mobile Banner
  | '320x50'; // Mobile Banner

interface AdSenseProps {
  /**
   * Ad slot ID (get from AdSense dashboard after creating ad units)
   * Format: "1234567890" or leave empty for auto ads
   */
  adSlot?: string;
  
  /**
   * Ad format/size
   */
  format?: AdSize;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Ad style (for responsive ads)
   */
  style?: React.CSSProperties;
  
  /**
   * Whether to use full-width responsive ads
   */
  fullWidthResponsive?: boolean;
}

/**
 * AdSense Ad Component
 * 
 * Usage:
 * <AdSense adSlot="1234567890" format="responsive" />
 * <AdSense adSlot="1234567890" format="300x250" />
 */
export default function AdSense({
  adSlot,
  format = 'auto',
  className = '',
  style,
  fullWidthResponsive = true,
}: AdSenseProps) {
  useEffect(() => {
    try {
      // Initialize AdSense ads
      if (typeof window !== 'undefined' && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, []);

  // If no ad slot is provided, return null (for auto ads, use the script in layout)
  if (!adSlot && format !== 'auto') {
    return null;
  }

  // Responsive ad configuration
  const adStyle: React.CSSProperties = {
    display: 'block',
    textAlign: 'center',
    minHeight: format === '300x250' ? '250px' : format === '728x90' ? '90px' : format === '336x280' ? '280px' : '100px',
    ...style,
  };

  // For auto ads without ad slot, render a placeholder container
  // Google Auto Ads will automatically place ads in these containers
  if (format === 'auto' && !adSlot) {
    return (
      <div 
        className={`adsense-container adsense-auto ${className}`} 
        style={adStyle}
        data-ad-client={ADSENSE_CLIENT_ID}
      />
    );
  }

  // For specific ad units with ad slot IDs
  return (
    <div className={`adsense-container ${className}`} style={adStyle}>
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          ...(fullWidthResponsive && format === 'responsive' ? {} : {
            width: format === '728x90' ? '728px' : 
                   format === '300x250' ? '300px' : 
                   format === '336x280' ? '336px' : 
                   format === '320x100' ? '320px' : 
                   format === '320x50' ? '320px' : 'auto',
            height: format === '728x90' ? '90px' : 
                    format === '300x250' ? '250px' : 
                    format === '336x280' ? '280px' : 
                    format === '320x100' ? '100px' : 
                    format === '320x50' ? '50px' : 'auto',
          }),
        }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={adSlot}
        data-ad-format={format === 'responsive' ? 'auto' : format}
        data-full-width-responsive={fullWidthResponsive ? 'true' : 'false'}
      />
    </div>
  );
}

/**
 * AdSense Banner Component (728x90 Leaderboard)
 * Best for desktop, above the fold
 */
export function AdSenseBanner({ className = '' }: { className?: string }) {
  return (
    <AdSense
      format="728x90"
      className={`max-w-full mx-auto ${className}`}
      fullWidthResponsive={true}
    />
  );
}

/**
 * AdSense Rectangle Component (300x250 Medium Rectangle)
 * Best for sidebar or between content
 */
export function AdSenseRectangle({ className = '' }: { className?: string }) {
  return (
    <AdSense
      format="300x250"
      className={`max-w-full mx-auto ${className}`}
      fullWidthResponsive={true}
    />
  );
}

/**
 * AdSense Responsive Component
 * Automatically adjusts to container size
 */
export function AdSenseResponsive({ className = '' }: { className?: string }) {
  return (
    <AdSense
      format="responsive"
      className={`w-full ${className}`}
      fullWidthResponsive={true}
    />
  );
}
