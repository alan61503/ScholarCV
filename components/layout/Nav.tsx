'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Menu,
  X,
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Trophy,
  Presentation,
  Users,
  ShieldCheck,
  Award,
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
  items: NavItem[];
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  user: User,
  education: GraduationCap,
  publications: BookOpen,
  projects: Briefcase,
  awards: Trophy,
  conferences: Presentation,
  scholars: Users,
  roles: ShieldCheck,
  patents: Award,
};

export default function Nav({ name, title, items }: NavProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 96;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
    setOpen(false);
  };

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <header className="sticky top-0 z-50">
      {/* Institutional gradient top accent bar */}
      <div className="h-1 bg-gradient-to-r from-accent-700 via-accent-500 to-amber-500" />
      
      <div className="bg-surface/85 backdrop-blur-xl border-b border-border-subtle/80 transition-colors">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 h-[68px] flex items-center justify-between gap-4">
          {/* Brand */}
          <a
            href="#summary"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('summary');
            }}
            className="flex items-center gap-3 group min-w-0"
          >
            <span className="flex items-center justify-center h-10 w-10 shrink-0 rounded-xl bg-gradient-to-br from-accent-700 to-accent-900 dark:from-accent-600 dark:to-accent-800 text-white text-xs font-semibold tracking-wider font-serif shadow-md group-hover:scale-105 transition-transform">
              {initials}
            </span>
            <span className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="text-[15px] font-serif font-bold text-foreground truncate group-hover:text-accent-600 dark:group-hover:text-accent-400 transition-colors">
                {name}
              </span>
              <span className="text-[11px] font-medium tracking-wide uppercase text-foreground-muted truncate">
                {title}
              </span>
            </span>
          </a>

          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              title="Print Resume / CV"
              className="flex items-center gap-1.5 px-3.5 h-9 rounded-full border border-border-subtle/80 bg-surface-muted/50 hover:bg-surface text-foreground-muted hover:text-foreground transition-all text-xs font-semibold tracking-wider uppercase shadow-xs"
            >
              <Printer className="h-4 w-4 text-accent-500" />
              <span className="hidden sm:inline">Print CV</span>
            </button>

            <ThemeToggle />

            {/* Menu trigger + dropdown */}
            <div className="relative" ref={containerRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Toggle navigation menu"
                className="flex items-center gap-2 px-4 h-9 rounded-full border border-border-subtle/80 bg-surface-muted/50 hover:bg-surface text-foreground-muted hover:text-foreground transition-all text-xs font-semibold tracking-wider uppercase shadow-xs"
              >
                {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                <span className="hidden xs:inline">Sections</span>
              </button>

              {open && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-border-subtle bg-surface shadow-2xl shadow-black/10 dark:shadow-black/60 p-2 space-y-1"
                >
                  {items.map((item) => {
                    const Icon = iconMap[item.icon] || User;
                    return (
                      <button
                        key={item.id}
                        role="menuitem"
                        onClick={() => scrollToSection(item.id)}
                        className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-foreground-muted hover:bg-surface-muted hover:text-foreground transition-all text-left"
                      >
                        <span className="p-1.5 rounded-lg bg-accent-500/10 text-accent-700 dark:text-accent-400 shrink-0">
                          <Icon className="h-4 w-4" />
                        </span>
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
