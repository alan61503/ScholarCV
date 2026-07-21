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
} from 'lucide-react';

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
      const offset = 88;
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
    <header className="sticky top-0 z-50 bg-white/85 dark:bg-slate-950/85 backdrop-blur-md border-b border-slate-100 dark:border-slate-850">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <a
          href="#summary"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('summary');
          }}
          className="flex items-center gap-3 group"
        >
          <span className="flex items-center justify-center h-9 w-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold tracking-wide">
            {initials}
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900 dark:text-white">{name}</span>
            <span className="text-[11px] text-slate-400 dark:text-slate-500">{title}</span>
          </span>
        </a>

        {/* Menu trigger + dropdown */}
        <div className="relative" ref={containerRef}>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-haspopup="true"
            aria-label="Toggle navigation menu"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-medium"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            <span className="hidden xs:inline">Menu</span>
          </button>

          {open && (
            <div
              role="menu"
              className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xl shadow-slate-900/5 dark:shadow-black/30 py-2 animate-in fade-in slide-in-from-top-2 duration-150"
            >
              {items.map((item) => {
                const Icon = iconMap[item.icon] || User;
                return (
                  <button
                    key={item.id}
                    role="menuitem"
                    onClick={() => scrollToSection(item.id)}
                    className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white transition-colors text-left"
                  >
                    <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
