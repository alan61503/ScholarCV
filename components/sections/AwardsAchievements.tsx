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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
                <Trophy className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Awards & Honors</h2>
            </div>

            {awardsReceived.length === 0 ? (
              <p className="text-sm text-foreground-muted">No awards recorded.</p>
            ) : (
              <div className="space-y-6">
                {awardsReceived.map((award) => (
                  <div key={award.id} className="flex gap-4">
                    <div className="mt-1 shrink-0 p-2 h-9 w-9 rounded-lg bg-surface-muted flex items-center justify-center text-amber-500">
                      <AwardIcon className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-foreground">{award.title}</h3>
                        <span className="text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded">
                          {award.year}
                        </span>
                      </div>
                      <p className="text-xs font-semibold text-foreground-muted">{award.awardingBody}</p>
                      {award.description && (
                        <p className="text-xs md:text-sm text-foreground-muted leading-relaxed pt-0.5">
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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400">
                <CheckSquare className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Academic Achievements</h2>
            </div>

            {academicAchievements.length === 0 ? (
              <p className="text-sm text-foreground-muted">No achievements recorded.</p>
            ) : (
              <div className="space-y-6">
                {academicAchievements.map((ach) => (
                  <div key={ach.id} className="flex gap-4">
                    <div className="mt-1 shrink-0 p-2 h-9 w-9 rounded-lg bg-surface-muted flex items-center justify-center text-accent-500">
                      <Calendar className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm md:text-base font-bold text-foreground">{ach.title}</h3>
                        <span className="text-[10px] font-semibold bg-accent-55/10 text-accent-650 dark:text-accent-400 px-2 py-0.5 rounded">
                          {ach.date}
                        </span>
                      </div>
                      {ach.description && (
                        <p className="text-xs md:text-sm text-foreground-muted leading-relaxed pt-0.5">
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
