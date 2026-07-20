'use client';

import React, { useEffect, useState } from 'react';
import {
  User,
  GraduationCap,
  BookOpen,
  Briefcase,
  Trophy,
  Presentation,
  Users,
  Award,
  ShieldCheck,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: string; // Changed to string
}

interface SidebarNavProps {
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

export default function SidebarNav({ items }: SidebarNavProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is in the middle of viewport
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Account for sticky headers/padding
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  return (
    <aside className="w-full lg:w-64 lg:shrink-0 lg:sticky lg:top-24 self-start bg-slate-50 dark:bg-slate-900/40 p-4 lg:p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80">
      <h2 className="hidden lg:block text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4 px-3">
        Portfolio Sections
      </h2>
      {/* Mobile Top Horizontal Scroll */}
      <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-none snap-x -mx-4 px-4 lg:mx-0 lg:px-0">
        {items.map((item) => {
          const Icon = iconMap[item.icon] || User;
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 snap-center whitespace-nowrap lg:w-full text-left
                ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white'
                }
              `}
            >
              <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-current' : 'text-slate-400 dark:text-slate-500'}`} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}

