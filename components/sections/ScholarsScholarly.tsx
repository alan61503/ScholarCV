import React from 'react';
import { PhdScholar } from '../../types/faculty';
import { Users, GraduationCap, Clock, Award, CheckCircle } from 'lucide-react';

interface ScholarsScholarlyProps {
  phdScholars: PhdScholar[];
}

export default function ScholarsScholarly({ phdScholars }: ScholarsScholarlyProps) {
  return (
    <section id="scholars" className="scroll-mt-24 space-y-6">
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start justify-between pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-2xl shrink-0" style={{ background: '#0891b218', color: '#0891b2', boxShadow: '0 4px 12px #0891b220' }}>
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Research Scholars</h2>
                <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #0891b2, #d4af37)', boxShadow: '0 2px 8px #0891b240' }} />
                <p className="mt-2 text-sm" style={{ color: 'var(--foreground-muted)' }}>Doctoral researchers under supervision</p>
              </div>
            </div>
            {/* Quick summary badges */}
            <div className="flex gap-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                {phdScholars.filter((s) => s.status === 'Completed').length} Completed
              </span>
              <span className="text-xs font-semibold px-3 py-1 rounded-full" style={{ background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }}>
                {phdScholars.filter((s) => s.status === 'Ongoing').length} Ongoing
              </span>
            </div>
          </div>

          {phdScholars.length === 0 ? (
            <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>
              No doctoral scholars guided.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {phdScholars.map((scholar) => (
                <div
                  key={scholar.id}
                  className="flex flex-col justify-between p-5 rounded-xl transition-all"
                  style={{ border: '1px solid var(--border-color)', background: 'var(--surface)', ':hover': { borderColor: 'rgba(8,145,178,0.3)' } } as React.CSSProperties}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-semibold font-mono" style={{ color: 'var(--foreground-muted)' }}>
                        Joined: {scholar.joiningYear}
                      </span>

                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={
                          scholar.status === 'Completed'
                            ? { background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }
                            : scholar.status === 'Submitted'
                            ? { background: 'rgba(59,130,246,0.1)', color: '#3b82f6', border: '1px solid rgba(59,130,246,0.2)' }
                            : { background: 'rgba(245,158,11,0.1)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.2)' }
                        }
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
                      <h3 className="text-base font-bold flex items-center gap-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>
                        <GraduationCap className="h-4.5 w-4.5 shrink-0" style={{ color: '#0891b2' }} />
                        {scholar.scholarName}
                      </h3>
                      <p className="text-xs font-semibold mt-1" style={{ color: '#0891b2' }}>
                        Role: {scholar.role}
                      </p>
                    </div>

                    <p className="text-xs md:text-sm leading-relaxed pt-2 italic" style={{ color: 'var(--foreground-muted)', borderTop: '1px solid var(--border-color)' }}>
                      "{scholar.thesisTitle}"
                    </p>
                  </div>

                  {scholar.completionYear && (
                    <div className="text-xs mt-4 pt-2 font-mono" style={{ color: 'var(--foreground-muted)', borderTop: '1px solid var(--border-color)' }}>
                      Completed in: <span className="font-bold" style={{ color: 'var(--foreground)' }}>{scholar.completionYear}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
