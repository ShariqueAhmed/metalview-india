/**
 * LastUpdated Component
 * Displays a visible "Last updated" timestamp for better freshness signals and user trust
 */

import { Clock } from 'lucide-react';

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
  if (!date) {
    return null;
  }

  try {
    const dateObj = new Date(date);
    
    // Validate date
    if (isNaN(dateObj.getTime())) {
      return null;
    }

    let formattedDate: string;
    
    switch (variant) {
      case 'compact':
        formattedDate = dateObj.toLocaleString('en-IN', {
          dateStyle: 'short',
          timeStyle: 'short',
        });
        break;
      case 'detailed':
        formattedDate = dateObj.toLocaleString('en-IN', {
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
        formattedDate = dateObj.toLocaleString('en-IN', {
          dateStyle: 'long',
          timeStyle: 'short',
        });
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
          dateTime={dateObj.toISOString()}
          className="flex items-center"
        >
          <span className="font-medium">Last updated:</span>{' '}
          <span>{formattedDate}</span>
        </time>
      </div>
    );
  } catch (error) {
    console.error('Error formatting date in LastUpdated:', error);
    return null;
  }
}
