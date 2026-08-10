import React from 'react';
import { Award, AcademicAchievement } from '../../types/faculty';
import { Trophy, Award as AwardIcon, Calendar, CheckSquare } from 'lucide-react';

interface AwardsAchievementsProps {
  awardsReceived: Award[];
  academicAchievements: AcademicAchievement[];
}

export default function AwardsAchievements({ awardsReceived, academicAchievements }: AwardsAchievementsProps) {
  return (
    <section id="awards-achievements" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Awards */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="p-3 rounded-2xl shrink-0" style={{ background: '#d4af3718', color: '#d4af37', boxShadow: '0 4px 12px #d4af3720' }}>
                <Trophy className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Awards & Honors</h2>
                <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #d4af37, #1d4ed8)', boxShadow: '0 2px 8px #d4af3740' }} />
              </div>
            </div>

            {awardsReceived.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>No awards recorded.</p>
            ) : (
              <div className="space-y-5">
                {awardsReceived.map((award) => (
                  <div key={award.id} className="flex gap-4 p-3 rounded-xl transition-colors" style={{ ':hover': { background: 'var(--surface-muted)' } } as React.CSSProperties}>
                    <div className="mt-1 shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#d4af3715', color: '#d4af37' }}>
                      <AwardIcon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>{award.title}</h3>
                        <span className="text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(212,175,55,0.1)', color: '#b8962e', border: '1px solid rgba(212,175,55,0.2)' }}>
                          {award.year}
                        </span>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: '#1d4ed8' }}>{award.awardingBody}</p>
                      {award.description && (
                        <p className="text-xs md:text-sm leading-relaxed pt-1" style={{ color: 'var(--foreground-muted)' }}>
                          {award.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Academic Achievements */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="p-3 rounded-2xl shrink-0" style={{ background: '#1d4ed818', color: '#1d4ed8', boxShadow: '0 4px 12px #1d4ed820' }}>
                <CheckSquare className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Academic Achievements</h2>
                <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #1d4ed8, #d4af37)', boxShadow: '0 2px 8px #1d4ed840' }} />
              </div>
            </div>

            {academicAchievements.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>No achievements recorded.</p>
            ) : (
              <div className="space-y-5">
                {academicAchievements.map((ach) => (
                  <div key={ach.id} className="flex gap-4 p-3 rounded-xl transition-colors">
                    <div className="mt-1 shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#1d4ed815', color: '#1d4ed8' }}>
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>{ach.title}</h3>
                        <span className="text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(29,78,216,0.08)', color: '#1d4ed8', border: '1px solid rgba(29,78,216,0.15)' }}>
                          {ach.date}
                        </span>
                      </div>
                      {ach.description && (
                        <p className="text-xs md:text-sm leading-relaxed pt-1" style={{ color: 'var(--foreground-muted)' }}>
                          {ach.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
