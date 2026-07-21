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
  Settings,
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
      {/* institutional accent bar */}
      <div className="h-1 bg-gradient-to-r from-accent-800 via-accent-600 to-brass-500" />
      <div className="bg-surface/90 backdrop-blur-md border-b border-border-subtle">
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
            <span className="flex items-center justify-center h-10 w-10 shrink-0 rounded-full bg-accent-700 dark:bg-accent-600 text-white text-xs font-semibold tracking-wide font-serif">
              {initials}
            </span>
            <span className="hidden sm:flex flex-col leading-tight min-w-0">
              <span className="text-[15px] font-serif font-semibold text-foreground truncate">{name}</span>
              <span className="text-[11px] tracking-wide uppercase text-foreground-muted truncate">{title}</span>
            </span>
          </a>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />

            {/* Menu trigger + dropdown */}
            <div className="relative" ref={containerRef}>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-haspopup="true"
                aria-label="Toggle navigation menu"
                className="flex items-center gap-2 px-3.5 h-8 rounded-full border border-border-subtle text-foreground-muted hover:border-accent-300 dark:hover:border-accent-500 hover:text-foreground transition-colors text-xs font-medium tracking-wide"
              >
                {open ? <X className="h-3.5 w-3.5" /> : <Menu className="h-3.5 w-3.5" />}
                <span className="hidden xs:inline uppercase">Sections</span>
              </button>

              {open && (
                <div
                  role="menu"
                  className="absolute right-0 mt-2 w-72 origin-top-right rounded-lg border border-border-subtle bg-surface shadow-xl shadow-black/5 dark:shadow-black/40 py-2"
                >
                  {items.map((item) => {
                    const Icon = iconMap[item.icon] || User;
                    return (
                      <button
                        key={item.id}
                        role="menuitem"
                        onClick={() => scrollToSection(item.id)}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground-muted hover:bg-surface-muted hover:text-foreground transition-colors text-left"
                      >
                        <Icon className="h-4 w-4 text-accent-500 shrink-0" />
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
