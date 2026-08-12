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
  Sparkles,
  Settings,
} from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

interface SidebarNavProps {
  items: NavItem[];
  name: string;
  title: string;
  avatarUrl?: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  user: User,
  education: GraduationCap,
  publications: BookOpen,
  projects: Briefcase,
  awards: Trophy,
  conferences: Presentation,
  workshops: Settings,
  seminar: Sparkles,
  scholars: Users,
  roles: ShieldCheck,
  patents: Award,
};

export default function SidebarNav({ items, name, title, avatarUrl }: SidebarNavProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
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
      if (element) observer.observe(element);
    });

    return () => {
      items.forEach((item) => {
        const element = document.getElementById(item.id);
        if (element) observer.unobserve(element);
      });
    };
  }, [items]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const offsetPosition = elementRect - bodyRect - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <aside
      className="w-full lg:w-64 xl:w-72 lg:shrink-0 lg:sticky lg:top-28 self-start rounded-2xl overflow-hidden"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border-color)',
        boxShadow: '0 8px 32px rgba(29, 78, 216, 0.1)',
      }}
    >
      {/* Desktop: Dark navy header with avatar */}
      <div
        className="hidden lg:block px-5 pt-5 pb-4"
        style={{
          background: 'linear-gradient(135deg, #060c1e 0%, #0f1e4d 60%, #1e3a8a 100%)',
          borderBottom: '1px solid rgba(212,175,55,0.2)',
        }}
      >
        {/* Gold accent line */}
        <div
          className="h-[2px] rounded-full mb-4"
          style={{ background: 'linear-gradient(90deg, #d4af37, #fbbf24, #d4af37)' }}
        />

        <div className="flex items-center gap-3">
          {avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarUrl}
              alt={name}
              className="w-10 h-10 rounded-xl object-cover shrink-0"
              style={{ border: '2px solid rgba(212,175,55,0.4)' }}
            />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <User className="h-5 w-5 text-white/60" />
            </div>
          )}
          <div className="min-w-0">
            <p className="text-sm font-bold truncate leading-tight" style={{ color: '#e8eeff' }}>
              {name}
            </p>
            <p className="text-[10px] truncate leading-tight mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
              {title}
            </p>
          </div>
        </div>

        {/* Portfolio Sections label */}
        <div className="flex items-center gap-2 mt-4">
          <div
            className="w-1 h-3 rounded-full"
            style={{ background: 'linear-gradient(180deg, #d4af37, #1d4ed8)' }}
          />
          <span
            className="text-[10px] font-bold uppercase tracking-widest"
            style={{ color: 'rgba(255,255,255,0.4)' }}
          >
            Portfolio Sections
          </span>
        </div>
      </div>

      {/* Navigation items */}
      <nav className="p-3 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-x-visible pb-3 scrollbar-none snap-x -mx-0">
        {items.map((item, index) => {
          const Icon = iconMap[item.icon] || User;
          const isActive = activeSection === item.id;
          const padded = String(index + 1).padStart(2, '0');

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-btn flex items-center gap-3 px-3.5 py-2.5 text-sm font-medium snap-center whitespace-nowrap lg:w-full text-left ${
                isActive ? 'active' : ''
              }`}
              style={{
                color: isActive ? '#fff' : 'var(--foreground-muted)',
                background: isActive
                  ? 'linear-gradient(135deg, #1d4ed8, #1e40af)'
                  : 'transparent',
                borderRadius: '12px',
                boxShadow: isActive ? '0 4px 16px rgba(29,78,216,0.35)' : 'none',
              }}
            >
              <div
                className="nav-btn-icon shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold"
                style={{
                  background: isActive ? 'rgba(255,255,255,0.15)' : 'var(--background)',
                  color: isActive ? '#fff' : 'var(--foreground-subtle)',
                }}
              >
                <Icon className="h-3.5 w-3.5" />
              </div>
              <span className="flex-1 text-left text-sm">{item.label}</span>
              {isActive ? (
                <span className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse-dot" style={{ background: '#fbbf24', boxShadow: '0 0 8px #fbbf24' }} />
              ) : (
                <span
                  className="nav-btn-number shrink-0 text-[10px] font-bold opacity-30"
                  style={{ color: 'var(--foreground-subtle)' }}
                >
                  {padded}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Desktop footer */}
      <div className="hidden lg:block px-4 pb-4">
        <div
          className="h-[2px] rounded-full"
          style={{ background: 'linear-gradient(90deg, #1d4ed8, #d4af37, #1d4ed8)' }}
        />
        <p
          className="text-center text-[10px] mt-3 font-medium"
          style={{ color: 'var(--foreground-subtle)' }}
        >
          ScholarCV · Academic Portfolio
        </p>
      </div>
    </aside>
  );
}
