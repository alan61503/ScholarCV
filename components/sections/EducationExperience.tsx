import React from 'react';
import { Education, Experience, SkillGroup } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
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
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                <Briefcase className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Professional Experience</h2>
            </div>

            {experience.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No experience records available.</p>
            ) : (
              <div className="relative pl-6 border-l border-slate-100 dark:border-slate-800/80 space-y-8 py-2">
                {experience.map((exp) => (
                  <div key={exp.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-indigo-200 dark:border-indigo-800 bg-white dark:bg-slate-900">
                      <span className="h-2 w-2 rounded-full bg-indigo-600 dark:bg-indigo-400" />
                    </span>
                    
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
                        {exp.startDate} – {exp.endDate}
                      </span>
                      <h3 className="text-base font-bold text-slate-950 dark:text-white pt-1">{exp.role}</h3>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                        {exp.organization} {exp.location && `• ${exp.location}`}
                      </p>
                      {exp.description && (
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                          {exp.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Education Timeline */}
        <Card>
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
              <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                <GraduationCap className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Education Background</h2>
            </div>

            {education.length === 0 ? (
              <p className="text-sm text-slate-500 dark:text-slate-400">No education records available.</p>
            ) : (
              <div className="relative pl-6 border-l border-slate-100 dark:border-slate-800/80 space-y-8 py-2">
                {education.map((edu) => (
                  <div key={edu.id} className="relative">
                    {/* Circle marker */}
                    <span className="absolute -left-[31px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full border border-emerald-200 dark:border-emerald-800 bg-white dark:bg-slate-900">
                      <span className="h-2 w-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                    </span>
                    
                    <div className="space-y-1">
                      <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
                        Class of {edu.year}
                      </span>
                      <h3 className="text-base font-bold text-slate-950 dark:text-white pt-1">{edu.degree}</h3>
                      <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">{edu.field}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{edu.institution}</p>
                      {edu.grade && (
                        <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">Grade/GPA: {edu.grade}</p>
                      )}
                      {edu.thesisTitle && (
                        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 italic leading-relaxed pt-1.5 border-t border-slate-50 dark:border-slate-800/40 mt-2">
                          Thesis: "{edu.thesisTitle}"
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

      {/* Skills Group Card */}
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="flex items-center gap-3 pb-2 border-b border-slate-50 dark:border-slate-800/60">
            <div className="p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Code className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-bold font-serif text-slate-900 dark:text-white">Areas of Expertise</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skills.map((group, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 rounded-md bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-xs font-medium border border-slate-100 dark:border-slate-800/50 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/20 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-100 dark:hover:border-indigo-950 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
