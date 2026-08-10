'use client';

import React from 'react';
import { FacultyProfile } from '../../types/faculty';
import {
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  FileCheck,
  Printer,
  Star,
  Quote,
  Microscope,
  Trophy,
  Users,
  FlaskConical,
} from 'lucide-react';

interface ProfileSummaryProps {
  profile: FacultyProfile;
}

export default function ProfileSummary({ profile }: ProfileSummaryProps) {
  const { personalInfo, experience, publications, fundedProjects } = profile;

  const yearsOfExp = experience.reduce((acc, exp) => {
    const startYear = parseInt(exp.startDate.split('-')[0]);
    const endYear = exp.endDate === 'Present' ? new Date().getFullYear() : parseInt(exp.endDate.split('-')[0]);
    return acc + (endYear - startYear);
  }, 0);

  const stats = [
    { label: 'Publications', sub: 'Indexed journals & conferences', value: publications.length, suffix: '+', icon: BookOpen, color: '#1d4ed8' },
    { label: 'Funded Projects', sub: 'National & international grants', value: fundedProjects.length, suffix: '', icon: FileCheck, color: '#7c3aed' },
    { label: 'Years Experience', sub: 'Academic & research experience', value: Math.max(yearsOfExp, 1), suffix: '+', icon: Briefcase, color: '#0891b2' },
    { label: 'Awards & Honors', sub: 'Recognitions & distinctions', value: profile.awardsReceived.length, suffix: '', icon: Award, color: '#b8962e' },
  ];

  const featureCards = [
    { href: '#publications', icon: BookOpen, label: 'Publications', color: '#1d4ed8' },
    { href: '#projects-grants', icon: Microscope, label: 'Research', color: '#7c3aed' },
    { href: '#awards-achievements', icon: Trophy, label: 'Awards', color: '#d4af37' },
    { href: '#scholars', icon: Users, label: 'PhD Scholars', color: '#0891b2' },
    { href: '#patents-copyrights', icon: FlaskConical, label: 'Patents', color: '#8b1a1a' },
  ];

  return (
    <section id="summary" className="scroll-mt-24 space-y-6">
      {/* ===== HERO CARD ===== */}
      <div
        className="relative rounded-3xl overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #060c1e 0%, #0f1e4d 35%, #1e3270 65%, #0a1628 100%)',
          boxShadow: '0 24px 64px rgba(6,12,30,0.7), 0 0 0 1px rgba(29,78,216,0.25)',
        }}
      >
        {/* Ambient glow effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: 'radial-gradient(circle, #1d4ed8 0%, transparent 70%)' }} />
          <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full blur-3xl opacity-15" style={{ background: 'radial-gradient(circle, #d4af37 0%, transparent 70%)' }} />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        </div>

        {/* Gold top line */}
        <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #d4af37 25%, #fbbf24 50%, #d4af37 75%, transparent)' }} />

        <div className="relative p-6 lg:p-10">
          {/* Badges row */}
          <div className="mb-5 flex items-center justify-between flex-wrap gap-3">
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest"
              style={{
                background: 'rgba(212,175,55,0.15)',
                color: '#fbbf24',
                border: '1px solid rgba(212,175,55,0.3)',
                boxShadow: '0 0 16px rgba(212,175,55,0.08)',
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full animate-pulse-dot" style={{ background: '#fbbf24', boxShadow: '0 0 6px #fbbf24' }} />
              Academic Profile
            </span>
            <span
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[10px] font-semibold"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <Star className="h-3 w-3 text-yellow-400" aria-hidden="true" />
              NAAC A+ Accredited
            </span>
          </div>

          {/* Profile content */}
          <div className="flex flex-col md:flex-row gap-6 md:items-start">
            {/* Avatar */}
            {personalInfo.avatarUrl && (
              <div className="relative shrink-0">
                <div
                  className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden"
                  style={{ border: '3px solid rgba(212,175,55,0.5)', boxShadow: '0 0 0 6px rgba(29,78,216,0.15), 0 12px 40px rgba(0,0,0,0.5)' }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={personalInfo.avatarUrl} alt={personalInfo.name} className="w-full h-full object-cover" />
                </div>
                <div
                  className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #d4af37, #fbbf24)', boxShadow: '0 4px 12px rgba(212,175,55,0.5)' }}
                >
                  <Star className="h-3.5 w-3.5 text-white" aria-hidden="true" />
                </div>
              </div>
            )}

            {/* Info */}
            <div className="space-y-3 flex-1 min-w-0">
              <div>
                <h1
                  className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff', textShadow: '0 2px 20px rgba(29,78,216,0.4)' }}
                >
                  {personalInfo.name}
                </h1>
                <p className="font-semibold text-base md:text-lg mt-2" style={{ background: 'linear-gradient(90deg, #93c5fd, #60a5fa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {personalInfo.title}
                </p>
                <p className="text-sm mt-1" style={{ color: 'rgba(147,197,253,0.6)' }}>
                  {personalInfo.department} · {personalInfo.institution}
                </p>
              </div>

              {/* Contact info */}
              <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors" style={{ color: 'rgba(191,219,254,0.8)' }}>
                  <Mail className="h-3.5 w-3.5 shrink-0" style={{ color: '#60a5fa' }} />
                  {personalInfo.email}
                </a>
                {personalInfo.phone && (
                  <div className="flex items-center gap-1.5" style={{ color: 'rgba(191,219,254,0.7)' }}>
                    <Phone className="h-3.5 w-3.5 shrink-0" style={{ color: '#60a5fa' }} />
                    {personalInfo.phone}
                  </div>
                )}
                {personalInfo.officeAddress && (
                  <div className="flex items-center gap-1.5" style={{ color: 'rgba(191,219,254,0.7)' }}>
                    <MapPin className="h-3.5 w-3.5 shrink-0" style={{ color: '#60a5fa' }} />
                    <span className="truncate max-w-xs">{personalInfo.officeAddress}</span>
                  </div>
                )}
              </div>

              {/* Quote / tagline */}
              {personalInfo.biography && (
                <div className="mt-3 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex gap-2">
                    <Quote className="h-4 w-4 shrink-0 mt-1" style={{ color: '#d4af37' }} />
                    <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Crimson Text', 'Playfair Display', Georgia, serif", color: 'rgba(219,234,254,0.85)', fontSize: '15px' }}>
                      {personalInfo.biography.split('.')[0]}.
                    </p>
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap items-center gap-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {personalInfo.websiteUrl && (
                  <a href={personalInfo.websiteUrl} target="_blank" rel="noopener noreferrer" className="royal-link-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/90 hover:text-white">
                    <Globe className="h-3.5 w-3.5" style={{ color: '#93c5fd' }} />
                    Website
                  </a>
                )}
                {personalInfo.googleScholarUrl && (
                  <a href={personalInfo.googleScholarUrl} target="_blank" rel="noopener noreferrer" className="royal-link-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/90 hover:text-white">
                    <BookOpen className="h-3.5 w-3.5" style={{ color: '#93c5fd' }} />
                    Google Scholar
                  </a>
                )}
                {personalInfo.linkedInUrl && (
                  <a href={personalInfo.linkedInUrl} target="_blank" rel="noopener noreferrer" className="royal-link-btn inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-white/90 hover:text-white">
                    <Briefcase className="h-3.5 w-3.5" style={{ color: '#93c5fd' }} />
                    LinkedIn
                  </a>
                )}
                {personalInfo.orcid && (
                  <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono" style={{ background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.4)' }}>
                    ORCID: {personalInfo.orcid}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="relative mt-8 rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', backdropFilter: 'blur(10px)' }}>
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="stats-bar-item flex flex-col items-center text-center gap-1.5 py-4 px-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-1" style={{ background: `${stat.color}25`, color: stat.color }}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-2xl md:text-3xl font-bold leading-none" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: '#ffffff' }}>
                      {stat.value}{stat.suffix}
                    </span>
                    <span className="text-[11px] font-semibold" style={{ color: 'rgba(255,255,255,0.7)' }}>{stat.label}</span>
                    <span className="text-[10px] hidden md:block" style={{ color: 'rgba(255,255,255,0.35)' }}>{stat.sub}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ===== QUICK JUMP FEATURE CARDS ===== */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {featureCards.map((card) => {
          const Icon = card.icon;
          return (
            <a key={card.href} href={card.href} className="christ-feature-card group">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-all duration-300 group-hover:scale-110"
                style={{ background: `${card.color}15`, color: card.color, boxShadow: `0 4px 12px ${card.color}20` }}
              >
                <Icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{card.label}</p>
            </a>
          );
        })}
      </div>

      {/* ===== BIOGRAPHY & RESEARCH INTERESTS ===== */}
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, #1d4ed8, #d4af37)' }} />
              <h2 className="text-xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Biography</h2>
            </div>
            <p className="leading-relaxed text-sm md:text-base" style={{ color: 'var(--foreground-muted)' }}>
              {personalInfo.biography}
            </p>
          </div>

          {personalInfo.researchInterests?.length > 0 && (
            <div className="space-y-3 pt-5" style={{ borderTop: '1px solid var(--border-color)' }}>
              <div className="flex items-center gap-2">
                <Microscope className="h-4 w-4" style={{ color: '#1d4ed8' }} />
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--foreground-subtle)' }}>Primary Research Interests</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {personalInfo.researchInterests.map((interest) => (
                  <span key={interest} className="royal-tag px-3.5 py-1.5 rounded-full text-xs md:text-sm font-medium cursor-default">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Hidden Print button kept for accessibility — PRESERVED */}
      <button
        type="button"
        onClick={() => window.print()}
        className="hidden"
        aria-label="Print Full CV / Resume"
      >
        <Printer className="h-4 w-4" />
        Print Full CV / Resume
      </button>
    </section>
  );
}
