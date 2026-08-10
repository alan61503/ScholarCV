import React from 'react';
import { FundedProject, Grant } from '../../types/faculty';
import { Briefcase, CreditCard, Calendar, Landmark, CheckCircle, Clock } from 'lucide-react';

interface ProjectsGrantsProps {
  fundedProjects: FundedProject[];
  grantsReceived: Grant[];
}

export default function ProjectsGrants({ fundedProjects, grantsReceived }: ProjectsGrantsProps) {
  return (
    <section id="projects-grants" className="scroll-mt-24 space-y-6">
      {/* Funded Projects */}
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle/80 relative">
            <div className="flex items-center gap-3">
              <div 
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
              >
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Funded Projects
              </h2>
            </div>
            <span 
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
            >
              {fundedProjects.length} {fundedProjects.length === 1 ? 'Project' : 'Projects'}
            </span>
            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#1d4ed8] to-transparent" />
          </div>

          {fundedProjects.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No funded projects recorded.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {fundedProjects.map((project) => (
                <div
                  key={project.id}
                  className="flex flex-col justify-between project-card p-5 transition-all"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={project.status === 'Ongoing' 
                          ? { background: 'rgba(184,150,46,0.1)', color: '#b8962e', border: '1px solid rgba(184,150,46,0.2)' } 
                          : { background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }
                        }
                      >
                        {project.status === 'Ongoing' ? (
                          <Clock className="h-3 w-3" />
                        ) : (
                          <CheckCircle className="h-3 w-3" />
                        )}
                        <span>{project.status}</span>
                      </span>

                      <span className="text-xs font-mono font-bold text-foreground bg-surface px-2.5 py-1 rounded-md border border-border-subtle">
                        {project.amount}
                      </span>
                    </div>

                    <h3 
                      className="text-base font-bold text-foreground leading-snug"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      {project.title}
                    </h3>

                    <p className="text-xs text-accent-700 dark:text-accent-400 font-bold">
                      {project.role}
                    </p>

                    {project.description && (
                      <p className="text-xs md:text-sm text-foreground-muted leading-relaxed">
                        {project.description}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-foreground-muted mt-4 pt-3 border-t border-border-subtle/70">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Landmark className="h-3.5 w-3.5 text-accent-500" />
                      {project.fundingAgency}
                    </span>
                    <span className="flex items-center gap-1.5 font-mono">
                      <Calendar className="h-3.5 w-3.5 text-accent-500" />
                      {project.startDate} – {project.endDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Grants Received */}
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-border-subtle/80 relative">
            <div className="flex items-center gap-3">
              <div 
                className="p-2.5 rounded-xl shrink-0"
                style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
              >
                <CreditCard className="h-5 w-5" />
              </div>
              <h2 
                className="text-xl font-bold text-foreground tracking-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Grants Received
              </h2>
            </div>
            <span 
              className="text-xs font-semibold px-3 py-1 rounded-full"
              style={{ background: 'rgba(29,78,216,0.1)', color: '#1d4ed8' }}
            >
              {grantsReceived.length} {grantsReceived.length === 1 ? 'Grant' : 'Grants'}
            </span>
            <div className="absolute bottom-0 left-0 h-[2px] w-16 bg-gradient-to-r from-[#1d4ed8] to-transparent" />
          </div>

          {grantsReceived.length === 0 ? (
            <p className="text-sm text-foreground-muted py-6 text-center">
              No grants recorded.
            </p>
          ) : (
            <div className="space-y-4">
              {grantsReceived.map((grant) => (
                <div
                  key={grant.id}
                  className="grant-row p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-colors"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 
                        className="text-base font-bold text-foreground"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {grant.title}
                      </h3>
                      <span className="text-[11px] font-semibold bg-accent-500/10 text-accent-700 dark:text-accent-400 px-2 py-0.5 rounded-full font-mono">
                        {grant.year}
                      </span>
                    </div>
                    {grant.purpose && (
                      <p className="text-xs text-foreground-muted">
                        <strong className="text-foreground">Purpose:</strong> {grant.purpose}
                      </p>
                    )}
                    {grant.agency && (
                      <p className="text-xs text-foreground-muted">
                        <strong className="text-foreground">Agency:</strong> {grant.agency}
                      </p>
                    )}
                  </div>

                  <div className="text-right shrink-0">
                    <span 
                      className="inline-block px-3 py-1.5 rounded-lg text-sm font-bold font-mono"
                      style={{ background: 'rgba(5,150,105,0.1)', color: '#059669', border: '1px solid rgba(5,150,105,0.2)' }}
                    >
                      {grant.amount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
