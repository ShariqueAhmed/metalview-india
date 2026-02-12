/**
 * LastUpdated Component
 * Displays a visible "Last updated" timestamp for better freshness signals and user trust
 */

'use client';

import { Clock } from 'lucide-react';
import { useMemo } from 'react';

interface LastUpdatedProps {
  date: string | null | undefined;
  className?: string;
  showIcon?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

export default function LastUpdated({ 
  date, 
  className = '', 
  showIcon = true,
  variant = 'default'
}: LastUpdatedProps) {
  // Memoize the formatted date to prevent constant re-renders
  // Round to nearest minute to avoid flickering on rapid updates
  const formattedDate = useMemo(() => {
    if (!date) {
      return null;
    }

    try {
      const dateObj = new Date(date);
      
      // Validate date
      if (isNaN(dateObj.getTime())) {
        return null;
      }

      // Round to nearest minute to prevent constant updates
      const roundedDate = new Date(dateObj);
      roundedDate.setSeconds(0);
      roundedDate.setMilliseconds(0);

      let formatted: string;
      
      switch (variant) {
        case 'compact':
          formatted = roundedDate.toLocaleString('en-IN', {
            dateStyle: 'short',
            timeStyle: 'short',
          });
          break;
        case 'detailed':
          formatted = roundedDate.toLocaleString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZoneName: 'short',
          });
          break;
        default:
          formatted = roundedDate.toLocaleString('en-IN', {
            dateStyle: 'long',
            timeStyle: 'short',
          });
      }

      return {
        formatted,
        iso: roundedDate.toISOString(),
      };
    } catch (error) {
      console.error('Error formatting date in LastUpdated:', error);
      return null;
    }
  }, [date, variant]);

  if (!formattedDate) {
    return null;
  }

  return (
    <div className={`text-xs sm:text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5 ${className}`}>
      {showIcon && (
        <Clock 
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" 
          aria-hidden="true"
        />
      )}
      <time 
        dateTime={formattedDate.iso}
        className="flex items-center"
      >
        <span className="font-medium">Last updated:</span>{' '}
        <span>{formattedDate.formatted}</span>
      </time>
    </div>
  );
}
