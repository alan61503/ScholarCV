import React from 'react';
import { ResourcePersonRole, ExternalExaminerRole } from '../../types/faculty';
import { Presentation, ShieldCheck, Landmark, Award } from 'lucide-react';

interface RolesRecognitionProps {
  resourcePersonRoles: ResourcePersonRole[];
  externalExaminerRoles: ExternalExaminerRole[];
}

export default function RolesRecognition({
  resourcePersonRoles,
  externalExaminerRoles,
}: RolesRecognitionProps) {
  return (
    <section id="roles-recognition" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Resource Person Roles */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="p-3 rounded-2xl shrink-0" style={{ background: '#7c3aed18', color: '#7c3aed', boxShadow: '0 4px 12px #7c3aed20' }}>
                <Presentation className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Resource Person Roles</h2>
                <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #7c3aed, #d4af37)', boxShadow: '0 2px 8px #7c3aed40' }} />
              </div>
            </div>

            {resourcePersonRoles.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>No resource person roles recorded.</p>
            ) : (
              <div className="space-y-5">
                {resourcePersonRoles.map((role) => (
                  <div key={role.id} className="flex gap-4 p-3 rounded-xl transition-colors" style={{ ':hover': { background: 'var(--surface-muted)' } } as React.CSSProperties}>
                    <div className="mt-1 shrink-0 h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: '#7c3aed15', color: '#7c3aed' }}>
                      <Award className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-bold leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>
                          {role.eventTitle}
                        </h3>
                        <span className="text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(124,58,237,0.1)', color: '#7c3aed', border: '1px solid rgba(124,58,237,0.2)' }}>
                          {role.date}
                        </span>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--foreground-muted)' }}>
                        Topic: <span style={{ color: 'var(--foreground)' }}>"{role.topic}"</span>
                      </p>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        Organized by: {role.organizedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* External Examiner Roles */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="p-3 rounded-2xl shrink-0" style={{ background: '#10b98118', color: '#10b981', boxShadow: '0 4px 12px #10b98120' }}>
                <ShieldCheck className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>External Examiner Roles</h2>
                <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #10b981, #d4af37)', boxShadow: '0 2px 8px #10b98140' }} />
              </div>
            </div>

            {externalExaminerRoles.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>No examiner roles recorded.</p>
            ) : (
              <div className="space-y-5">
                {externalExaminerRoles.map((role) => (
                  <div key={role.id} className="flex gap-4 p-3 rounded-xl transition-colors" style={{ ':hover': { background: 'var(--surface-muted)' } } as React.CSSProperties}>
                    <div className="mt-1 shrink-0 h-10 w-10 rounded-xl flex items-center justify-center" style={{ background: '#10b98115', color: '#10b981' }}>
                      <Landmark className="h-5 w-5" />
                    </div>

                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-sm md:text-base font-bold leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>
                          {role.roleType} Examiner
                        </h3>
                        <span className="text-xs font-semibold font-mono px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)' }}>
                          {role.year}
                        </span>
                      </div>
                      <p className="text-xs font-semibold" style={{ color: 'var(--foreground-muted)' }}>
                        {role.department}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--foreground-muted)' }}>
                        University: {role.university}
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
