'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useEffect } from 'react';

interface HeaderProps {
  lastUpdated?: string;
}

export default function Header({ lastUpdated }: HeaderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const formatTime = (timestamp?: string) => {
    if (!timestamp) return 'Loading...';
    
    try {
      const date = new Date(timestamp);
      return new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      }).format(date);
    } catch {
      return 'Invalid date';
    }
  };

  return (
    <header className="bg-white/95 dark:bg-gray-950/95 backdrop-blur-md border-b border-gray-200/60 dark:border-gray-800/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-amber-700 dark:from-amber-500 dark:to-amber-600 flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-lg">M</span>
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white tracking-tight">
                MetalView
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 font-normal">
                Live Gold Prices in India
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {lastUpdated && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-gray-50 dark:bg-gray-900/50 rounded-md border border-gray-200/60 dark:border-gray-800/60">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  <span className="font-medium">Updated:</span>{' '}
                  <span className="text-gray-900 dark:text-gray-100">
                    {formatTime(lastUpdated)}
                  </span>
                </div>
              </div>
            )}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md bg-gray-100/80 dark:bg-gray-800/80 hover:bg-gray-200 dark:hover:bg-gray-700/80 transition-colors border border-gray-200/60 dark:border-gray-700/60"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              ) : (
                <Moon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
