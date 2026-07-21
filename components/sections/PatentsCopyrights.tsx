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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-accent-50 dark:bg-accent-950/40 text-accent-600 dark:text-accent-400">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Patents</h2>
            </div>

            {patents.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border-subtle/40 rounded-lg">
                <HelpCircle className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
                <p className="text-sm text-foreground-muted">No patents filed or granted yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {patents.map((patent) => (
                  <div
                    key={patent.id}
                    className="p-4 border border-border-subtle rounded-md space-y-3 hover:bg-surface-muted/60 transition-colors"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider
                          ${
                            patent.status === 'Granted'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                              : patent.status === 'Published'
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                          }
                        `}
                      >
                        {patent.status}
                      </span>
                      
                      <span className="text-[11px] font-mono text-foreground-muted">
                        Filing Date: {patent.filingDate}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-foreground leading-snug font-serif">
                      {patent.title}
                    </h3>

                    <div className="text-xs text-foreground-muted space-y-1">
                      <p>
                        <span className="font-semibold">Inventors:</span> {patent.inventors.join(', ')}
                      </p>
                      <p>
                        <span className="font-semibold">Application No:</span> {patent.applicationNumber}
                      </p>
                      {patent.patentNumber && (
                        <p>
                          <span className="font-semibold">Patent No:</span> {patent.patentNumber}
                        </p>
                      )}
                      <p className="flex items-center gap-1 text-[11px] text-foreground-muted mt-2">
                        <Landmark className="h-3 w-3" />
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
            <div className="flex items-center gap-3 pb-2 border-b border-border-subtle">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <FileText className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-foreground">Registered Copyrights</h2>
            </div>

            {copyrights.length === 0 ? (
              <div className="text-center py-8 border border-dashed border-border-subtle/40 rounded-lg">
                <HelpCircle className="h-8 w-8 text-foreground-muted mx-auto mb-2" />
                <p className="text-sm text-foreground-muted">No copyright filings recorded yet.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {copyrights.map((copyright) => (
                  <div
                    key={copyright.id}
                    className="p-4 border border-border-subtle rounded-md space-y-2 hover:bg-surface-muted/60 transition-colors"
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded">
                        {copyright.status}
                      </span>
                      <span className="text-xs text-foreground-muted font-semibold">
                        Registered Year: {copyright.year}
                      </span>
                    </div>

                    <h3 className="text-sm md:text-base font-bold text-foreground leading-tight font-serif">
                      {copyright.title}
                    </h3>

                    <div className="text-xs text-foreground-muted space-y-1">
                      <p>
                        <span className="font-semibold">Reg. Number:</span> {copyright.registrationNumber}
                      </p>
                      <p>
                        <span className="font-semibold">Owners:</span> {copyright.owners.join(', ')}
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
