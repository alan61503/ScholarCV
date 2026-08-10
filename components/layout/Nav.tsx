'use client';

import React from 'react';
import {
  GraduationCap,
  ChevronRight,
  BookOpen,
  Printer,
} from 'lucide-react';
import ThemeToggle from '../ui/ThemeToggle';

export interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface NavProps {
  name: string;
  title: string;
  institution: string;
  department: string;
  items: NavItem[];
}

export default function Nav({ name, institution, department }: NavProps) {
  return (
    <header className="sticky top-0 z-40 glass border-b" style={{ borderColor: 'var(--border-subtle)' }}>
      {/* Animated gradient top bar */}
      <div
        className="h-[3px] animate-gradient-slow"
        style={{
          background: 'linear-gradient(90deg, #1e3a8a, #1d4ed8, #d4af37, #8b1a1a, #d4af37, #1d4ed8, #1e3a8a)',
          backgroundSize: '300% 100%',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-xl shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1e3a8a, #1d4ed8)',
              boxShadow: '0 4px 12px rgba(29,78,216,0.35)',
            }}
          >
            <GraduationCap className="h-5 w-5 text-white" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-1.5 text-sm min-w-0">
            <span className="hidden md:block font-semibold text-xs uppercase tracking-wider" style={{ color: '#1d4ed8' }}>
              ScholarCV
            </span>
            <ChevronRight
              className="hidden md:block h-3.5 w-3.5 shrink-0"
              aria-hidden="true"
              style={{ color: 'var(--foreground-subtle)' }}
            />
            <span className="font-bold truncate" style={{ color: 'var(--foreground)' }}>
              {name}
            </span>
          </div>
        </div>

        {/* Right: Badges + Print */}
        <div className="flex items-center gap-3 shrink-0">
          <div
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-semibold"
            style={{
              background: 'rgba(29,78,216,0.08)',
              color: '#1d4ed8',
              border: '1px solid rgba(29,78,216,0.15)',
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: 'linear-gradient(135deg, #1d4ed8, #d4af37)' }}
            />
            <span className="truncate max-w-[160px]">{institution}</span>
          </div>

          <div
            className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold"
            style={{
              background: 'rgba(212,175,55,0.1)',
              color: '#b8962e',
              border: '1px solid rgba(212,175,55,0.2)',
            }}
          >
            <BookOpen className="h-3 w-3" aria-hidden="true" />
            <span className="truncate max-w-[140px]">{department}</span>
          </div>

          {/* Print CV Button — PRESERVED */}
          <button
            type="button"
            onClick={() => window.print()}
            title="Print Resume / CV"
            className="flex items-center gap-1.5 px-3.5 h-9 rounded-full border text-xs font-semibold tracking-wider uppercase shadow-xs transition-all"
            style={{
              borderColor: 'var(--border-color)',
              background: 'var(--surface-muted)',
              color: 'var(--foreground-muted)',
            }}
          >
            <Printer className="h-4 w-4" style={{ color: '#1d4ed8' }} />
            <span className="hidden sm:inline">Print CV</span>
          </button>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
