import React from 'react';
import { PhdScholar } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { Users, GraduationCap, Clock, Award, CheckCircle } from 'lucide-react';

interface ScholarsScholarlyProps {
  phdScholars: PhdScholar[];
}

export default function ScholarsScholarly({ phdScholars }: ScholarsScholarlyProps) {
  return (
    <section id="scholars" className="scroll-mt-24 space-y-6">
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle/80">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Research Scholars</h2>
            </div>

            {/* Quick summary badges */}
            <div className="flex gap-2">
              <span className="text-xs font-semibold px-3 py-1 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 rounded-full border border-emerald-500/20">
                {phdScholars.filter((s) => s.status === 'Completed').length} Completed
              </span>
              <span className="text-xs font-semibold px-3 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 rounded-full border border-amber-500/20">
                {phdScholars.filter((s) => s.status === 'Ongoing').length} Ongoing
              </span>
            </div>
          </div>

          {phdScholars.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No doctoral scholars guided.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phdScholars.map((scholar) => (
                <div
                  key={scholar.id}
                  className="flex flex-col justify-between p-5 border border-border-subtle/80 rounded-xl hover:border-accent-500/30 transition-all bg-surface-muted/30"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold font-mono text-foreground-muted">
                        Joined: {scholar.joiningYear}
                      </span>

                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          scholar.status === 'Completed'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : scholar.status === 'Submitted'
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {scholar.status === 'Completed' ? (
                          <CheckCircle className="h-3 w-3" />
                        ) : scholar.status === 'Submitted' ? (
                          <Award className="h-3 w-3" />
                        ) : (
                          <Clock className="h-3 w-3" />
                        )}
                        <span>{scholar.status}</span>
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base font-serif font-bold text-foreground flex items-center gap-2">
                        <GraduationCap className="h-4.5 w-4.5 text-accent-500 shrink-0" />
                        {scholar.scholarName}
                      </h3>
                      <p className="text-xs font-semibold text-accent-700 dark:text-accent-400 mt-1">
                        Role: {scholar.role}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm text-foreground-muted leading-relaxed border-t border-border-subtle/70 pt-2 italic">
                      "{scholar.thesisTitle}"
                    </p>
                  </div>

                  {scholar.completionYear && (
                    <div className="text-xs text-foreground-muted mt-4 pt-2 border-t border-border-subtle/70 font-mono">
                      Completed in: <span className="font-bold text-foreground">{scholar.completionYear}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
