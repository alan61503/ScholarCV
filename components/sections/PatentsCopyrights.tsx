import React from 'react';
import { Patent, Copyright } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { FileText, Award, Calendar, Landmark, CheckCircle, HelpCircle } from 'lucide-react';

interface PatentsCopyrightsProps {
  patents: Patent[];
  copyrights: Copyright[];
}

export default function PatentsCopyrights({ patents, copyrights }: PatentsCopyrightsProps) {
  return (
    <section id="patents-copyrights" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patents */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400 shrink-0">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Patents</h2>
            </div>

            {patents.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border-subtle/60 rounded-xl">
                <HelpCircle className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
                <p className="text-sm text-foreground-muted">No patents filed or granted yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {patents.map((patent) => (
                  <div
                    key={patent.id}
                    className="p-4 border border-border-subtle/80 rounded-xl space-y-2.5 hover:bg-surface-muted/40 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold ${
                          patent.status === 'Granted'
                            ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                            : patent.status === 'Published'
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20'
                            : 'bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20'
                        }`}
                      >
                        {patent.status}
                      </span>

                      <span className="text-xs font-mono text-foreground-muted">
                        Filing Date: {patent.filingDate}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-foreground leading-snug font-serif">
                      {patent.title}
                    </h3>

                    <div className="text-xs text-foreground-muted space-y-1 pt-1 border-t border-border-subtle/60">
                      <p>
                        <strong className="text-foreground">Inventors:</strong> {patent.inventors.join(', ')}
                      </p>
                      <p>
                        <strong className="text-foreground">Application No:</strong> {patent.applicationNumber}
                      </p>
                      {patent.patentNumber && (
                        <p>
                          <strong className="text-foreground">Patent No:</strong> {patent.patentNumber}
                        </p>
                      )}
                      <p className="flex items-center gap-1.5 text-xs text-foreground-muted pt-1">
                        <Landmark className="h-3.5 w-3.5 text-accent-500" />
                        {patent.country}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Copyrights */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 shrink-0">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground tracking-tight">Registered Copyrights</h2>
            </div>

            {copyrights.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border-subtle/60 rounded-xl">
                <HelpCircle className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
                <p className="text-sm text-foreground-muted">No copyright filings recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {copyrights.map((copyright) => (
                  <div
                    key={copyright.id}
                    className="p-4 border border-border-subtle/80 rounded-xl space-y-2 hover:bg-surface-muted/40 transition-colors"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-3 py-0.5 rounded-full border border-emerald-500/20">
                        {copyright.status}
                      </span>
                      <span className="text-xs text-foreground-muted font-mono font-semibold">
                        Registered: {copyright.year}
                      </span>
                    </div>

                    <h3 className="text-base font-serif font-bold text-foreground leading-tight">
                      {copyright.title}
                    </h3>

                    <div className="text-xs text-foreground-muted space-y-1 pt-1 border-t border-border-subtle/60">
                      <p>
                        <strong className="text-foreground">Reg. Number:</strong> {copyright.registrationNumber}
                      </p>
                      <p>
                        <strong className="text-foreground">Owners:</strong> {copyright.owners.join(', ')}
                      </p>
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
