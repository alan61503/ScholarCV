import React from 'react';
import { Award, AcademicAchievement } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { Trophy, Award as AwardIcon, Calendar, CheckSquare } from 'lucide-react';

interface AwardsAchievementsProps {
  awardsReceived: Award[];
  academicAchievements: AcademicAchievement[];
}

export default function AwardsAchievements({ awardsReceived, academicAchievements }: AwardsAchievementsProps) {
  return (
    <section id="awards-achievements" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Awards Received */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 shrink-0">
                <Trophy className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Awards & Honors</h2>
            </div>

            {awardsReceived.length === 0 ? (
              <p className="text-sm text-foreground-muted">No awards recorded.</p>
            ) : (
              <div className="space-y-5">
                {awardsReceived.map((award) => (
                  <div key={award.id} className="flex gap-4 p-3 rounded-xl hover:bg-surface-muted/40 transition-colors">
                    <div className="mt-1 shrink-0 p-2.5 h-10 w-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                      <AwardIcon className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-serif font-bold text-foreground">{award.title}</h3>
                        <span className="text-xs font-semibold font-mono bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                          {award.year}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-accent-700 dark:text-accent-400">{award.awardingBody}</p>
                      {award.description && (
                        <p className="text-xs md:text-sm text-foreground-muted leading-relaxed pt-1">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Academic Achievements */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 shrink-0">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Academic Achievements</h2>
            </div>

            {academicAchievements.length === 0 ? (
              <p className="text-sm text-foreground-muted">No achievements recorded.</p>
            ) : (
              <div className="space-y-5">
                {academicAchievements.map((ach) => (
                  <div key={ach.id} className="flex gap-4 p-3 rounded-xl hover:bg-surface-muted/40 transition-colors">
                    <div className="mt-1 shrink-0 p-2.5 h-10 w-10 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 flex items-center justify-center">
                      <Calendar className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-serif font-bold text-foreground">{ach.title}</h3>
                        <span className="text-xs font-semibold font-mono bg-accent-500/10 text-accent-700 dark:text-accent-400 px-2.5 py-0.5 rounded-full border border-accent-500/20">
                          {ach.date}
                        </span>
                      </div>
                      {ach.description && (
                        <p className="text-xs md:text-sm text-foreground-muted leading-relaxed pt-1">
                          {ach.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
