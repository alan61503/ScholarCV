'use client';

import React from 'react';
import { Sparkles, Star, BookOpen, Award, Lightbulb } from 'lucide-react';
import { FacultyProfile } from '../../types/faculty';

interface HighlightsTickerProps {
  profile: FacultyProfile;
}

export default function HighlightsTicker({ profile }: HighlightsTickerProps) {
  const highlights = [
    { icon: Star, text: 'NAAC Accredited Institution' },
    { icon: BookOpen, text: `Research Excellence in AI & Machine Learning` },
    { icon: Award, text: 'Best Faculty Award 2024' },
    { icon: Lightbulb, text: `${profile.fundedProjects.length}+ Funded Research Projects` },
    { icon: Sparkles, text: `${profile.publications.length}+ Publications in Indexed Journals` },
    { icon: Star, text: `PhD Scholars Mentored: ${profile.phdScholars.length}` },
    { icon: BookOpen, text: 'International Collaborations & Exchange Programs' },
  ];

  // Duplicate for seamless loop
  const allHighlights = [...highlights, ...highlights];

  return (
    <div
      className="no-print relative z-30 border-b overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #1e3a8a 0%, #1d4ed8 40%, #1e40af 60%, #1e3a8a 100%)',
        borderColor: 'rgba(212, 175, 55, 0.3)',
        height: '36px',
      }}
    >
      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #d4af37 30%, #fbbf24 50%, #d4af37 70%, transparent)',
        }}
      />

      {/* Highlights label */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 gap-2 text-xs font-bold uppercase tracking-widest"
        style={{
          background: 'linear-gradient(90deg, #0f1e4d, #1e3a8a)',
          color: '#fbbf24',
          borderRight: '1px solid rgba(212, 175, 55, 0.25)',
          minWidth: '120px',
        }}
      >
        <Sparkles className="h-3 w-3 animate-pulse-dot" aria-hidden="true" />
        Highlights
      </div>

      {/* Scrolling ticker */}
      <div className="ml-[120px] h-full overflow-hidden">
        <div className="ticker-wrap h-full flex items-center">
          <div className="ticker-track animate-ticker">
            {allHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  <span style={{ color: '#fbbf24' }}>
                    <Icon className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {item.text}
                  <span
                    className="mx-4 inline-block w-1 h-1 rounded-full"
                    style={{ background: 'rgba(212, 175, 55, 0.5)' }}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
