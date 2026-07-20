'use client';

import React, { useEffect, useState } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeCustomizer() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load state on mount
  useEffect(() => {
    const savedDark = localStorage.getItem('theme-dark') === 'true';
    setDarkMode(savedDark);
    
    if (savedDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    setMounted(true);
  }, []);

  // Toggle theme mode
  const toggleTheme = () => {
    const nextDark = !darkMode;
    setDarkMode(nextDark);
    
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme-dark', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme-dark', 'false');
    }
  };

  // Prevent render before client-side values are loaded
  if (!mounted) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        suppressHydrationWarning
        onClick={toggleTheme}
        className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg hover:shadow-xl text-slate-650 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-all cursor-pointer flex items-center justify-center"
        aria-label={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {darkMode ? (
          <Sun className="h-5 w-5 text-amber-500 animate-pulse" />
        ) : (
          <Moon className="h-5 w-5 text-slate-700" />
        )}
      </button>
    </div>
  );
}
