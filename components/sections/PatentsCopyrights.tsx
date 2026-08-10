import React from 'react';
import { Patent, Copyright } from '../../types/faculty';
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
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80 relative">
              <div 
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
              >
                <Award className="h-5 w-5" />
              </div>
              <h2 
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Patents
              </h2>
              <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#1d4ed8] to-transparent" />
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
                        className="px-3 py-0.5 rounded-full text-xs font-semibold"
                        style={
                          patent.status === 'Granted'
                            ? { background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }
                            : patent.status === 'Published'
                            ? { background: 'rgba(29,78,216,0.1)', color: '#1d4ed8', border: '1px solid rgba(29,78,216,0.2)' }
                            : { background: 'rgba(212,175,55,0.1)', color: '#d4af37', border: '1px solid rgba(212,175,55,0.2)' }
                        }
                      >
                        {patent.status}
                      </span>

                      <span className="text-xs font-mono text-foreground-muted">
                        Filing Date: {patent.filingDate}
                      </span>
                    </div>

                    <h3 
                      className="text-base font-bold text-foreground leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
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
          </div>
        </div>

        {/* Copyrights */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-3 border-b border-border-subtle/80 relative">
              <div 
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(212,175,55,0.1)', color: '#d4af37' }}
              >
                <FileText className="h-5 w-5" />
              </div>
              <h2 
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Registered Copyrights
              </h2>
              <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#d4af37] to-transparent" />
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
                      <span 
                        className="text-xs font-semibold px-3 py-0.5 rounded-full"
                        style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }}
                      >
                        {copyright.status}
                      </span>
                      <span className="text-xs text-foreground-muted font-mono font-semibold">
                        Registered: {copyright.year}
                      </span>
                    </div>

                    <h3 
                      className="text-base font-bold text-foreground leading-tight"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
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
          </div>
        </div>
      </div>
    </section>
  );
}
