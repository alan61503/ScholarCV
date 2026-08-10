import React from 'react';
import { Education, Experience, SkillGroup } from '../../types/faculty';
import { GraduationCap, Briefcase, Code } from 'lucide-react';

interface EducationExperienceProps {
  education: Education[];
  experience: Experience[];
  skills: SkillGroup[];
}

export default function EducationExperience({ education, experience, skills }: EducationExperienceProps) {
  return (
    <section id="education-experience" className="scroll-mt-24 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Experience Timeline */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="p-3 rounded-2xl shrink-0" style={{ background: '#1d4ed818', color: '#1d4ed8', boxShadow: '0 4px 12px #1d4ed820' }}>
                <Briefcase className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Professional Experience</h2>
                <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #1d4ed8, #d4af37)', boxShadow: '0 2px 8px #1d4ed840' }} />
              </div>
            </div>

            {experience.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>No experience records available.</p>
            ) : (
              <div className="relative pl-6 space-y-8 py-2" style={{ borderLeft: '2px solid rgba(29,78,216,0.15)' }}>
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    <span className="absolute -left-[25px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full" style={{ border: '2px solid rgba(29,78,216,0.3)', background: 'var(--surface)' }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: '#1d4ed8' }} />
                    </span>
                    <div className="space-y-1.5">
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-mono" style={{ background: 'rgba(29,78,216,0.08)', color: '#1d4ed8', border: '1px solid rgba(29,78,216,0.15)' }}>
                        {exp.startDate} – {exp.endDate}
                      </span>
                      <h3 className="text-base font-bold pt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>{exp.role}</h3>
                      <p className="text-sm font-medium" style={{ color: 'var(--foreground-muted)' }}>
                        {exp.organization} {exp.location && `• ${exp.location}`}
                      </p>
                      {exp.description && (
                        <p className="text-xs md:text-sm leading-relaxed pt-1" style={{ color: 'var(--foreground-muted)' }}>
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Education Timeline */}
        <div className="royal-card">
          <div className="p-6 md:p-8 space-y-6">
            <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
              <div className="p-3 rounded-2xl shrink-0" style={{ background: '#d4af3718', color: '#d4af37', boxShadow: '0 4px 12px #d4af3720' }}>
                <GraduationCap className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Education Background</h2>
                <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #d4af37, #1d4ed8)', boxShadow: '0 2px 8px #d4af3740' }} />
              </div>
            </div>

            {education.length === 0 ? (
              <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>No education records available.</p>
            ) : (
              <div className="relative pl-6 space-y-8 py-2" style={{ borderLeft: '2px solid rgba(212,175,55,0.2)' }}>
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    <span className="absolute -left-[25px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full" style={{ border: '2px solid rgba(212,175,55,0.35)', background: 'var(--surface)' }}>
                      <span className="h-2 w-2 rounded-full" style={{ background: '#d4af37' }} />
                    </span>
                    <div className="space-y-1.5">
                      <span className="inline-block px-3 py-0.5 rounded-full text-xs font-semibold font-mono" style={{ background: 'rgba(212,175,55,0.1)', color: '#b8962e', border: '1px solid rgba(212,175,55,0.2)' }}>
                        Class of {edu.year}
                      </span>
                      <h3 className="text-base font-bold pt-1" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>{edu.degree}</h3>
                      <p className="text-sm font-semibold" style={{ color: 'var(--foreground)' }}>{edu.field}</p>
                      <p className="text-sm" style={{ color: 'var(--foreground-muted)' }}>{edu.institution}</p>
                      {edu.grade && (
                        <p className="text-xs font-medium font-mono" style={{ color: 'var(--foreground-muted)' }}>Grade/GPA: {edu.grade}</p>
                      )}
                      {edu.thesisTitle && (
                        <p className="text-xs md:text-sm italic leading-relaxed pt-2 mt-2" style={{ color: 'var(--foreground-muted)', borderTop: '1px solid var(--border-color)' }}>
                          Thesis: "{edu.thesisTitle}"
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

      {/* Skills */}
      <div className="royal-card">
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-start gap-4 pb-5 mb-2" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <div className="p-3 rounded-2xl shrink-0" style={{ background: '#7c3aed18', color: '#7c3aed', boxShadow: '0 4px 12px #7c3aed20' }}>
              <Code className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)' }}>Areas of Expertise</h2>
              <div className="mt-2 h-[3px] rounded-full" style={{ width: '56px', background: 'linear-gradient(90deg, #7c3aed, #d4af37)', boxShadow: '0 2px 8px #7c3aed40' }} />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((group, idx) => (
              <div key={idx} className="space-y-3 p-4 rounded-xl" style={{ border: '1px solid var(--border-color)', background: 'var(--surface)' }}>
                <h3 className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--foreground)' }}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span key={skill} className="skill-tag px-3 py-1 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
