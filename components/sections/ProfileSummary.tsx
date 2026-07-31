import React from 'react';
import { FacultyProfile } from '../../types/faculty';
import { Card, CardContent } from '../ui/Card';
import { Mail, Phone, MapPin, Globe, Award, BookOpen, Briefcase, FileCheck, Printer } from 'lucide-react';

interface ProfileSummaryProps {
  profile: FacultyProfile;
}

export default function ProfileSummary({ profile }: ProfileSummaryProps) {
  const { personalInfo, experience, publications, fundedProjects } = profile;

  // Calculate quick stats
  const yearsOfExp = experience.reduce((acc, exp) => {
    const startYear = parseInt(exp.startDate.split('-')[0]);
    const endYear = exp.endDate === 'Present' ? new Date().getFullYear() : parseInt(exp.endDate.split('-')[0]);
    return acc + (endYear - startYear);
  }, 0);

  const stats = [
    { label: 'Publications', value: publications.length, icon: BookOpen },
    { label: 'Funded Projects', value: fundedProjects.length, icon: FileCheck },
    { label: 'Years Experience', value: Math.max(yearsOfExp, 1), icon: Briefcase },
    { label: 'Awards Received', value: profile.awardsReceived.length, icon: Award },
  ];

  return (
    <section id="summary" className="scroll-mt-24 space-y-6">
      {/* Hero Card - Solid Navy Background */}
      <Card className="relative overflow-hidden border border-slate-800 bg-slate-900 text-white p-6 lg:p-10 shadow-lg">
        <div className="relative flex flex-col md:flex-row gap-6 lg:gap-8 md:items-center">
          {personalInfo.avatarUrl && (
            <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden border border-slate-700 shadow-xl shrink-0 bg-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={personalInfo.avatarUrl}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="space-y-3 flex-1">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-500/20 text-accent-300 text-xs font-semibold uppercase tracking-wider mb-2 border border-accent-500/30">
                <span>Academic Profile</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-white">
                {personalInfo.name}
              </h1>
              <p className="text-accent-300 font-medium text-base md:text-lg mt-1">{personalInfo.title}</p>
              <p className="text-slate-200 text-xs md:text-sm font-medium">{personalInfo.department}</p>
              <p className="text-slate-400 text-xs md:text-sm">{personalInfo.institution}</p>
            </div>

            <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs md:text-sm text-slate-300 pt-3 border-t border-slate-800">
              <a href={`mailto:${personalInfo.email}`} className="flex items-center gap-1.5 hover:text-white transition-colors">
                <Mail className="h-4 w-4 text-accent-400 shrink-0" />
                <span>{personalInfo.email}</span>
              </a>
              {personalInfo.phone && (
                <div className="flex items-center gap-1.5">
                  <Phone className="h-4 w-4 text-accent-400 shrink-0" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.officeAddress && (
                <div className="flex items-center gap-1.5 max-w-xs md:max-w-sm">
                  <MapPin className="h-4 w-4 text-accent-400 shrink-0" />
                  <span className="truncate" title={personalInfo.officeAddress}>{personalInfo.officeAddress}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Tagline */}
        {personalInfo.biography && (
          <div className="mt-6 pt-5 border-t border-slate-800">
            <p className="text-base md:text-lg italic text-slate-200 leading-relaxed font-serif">
              "{personalInfo.biography.split('.')[0]}."
            </p>
          </div>
        )}

        {/* Action Links & Solid Badges */}
        <div className="relative flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-slate-800 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            {personalInfo.websiteUrl && (
              <a
                href={personalInfo.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors font-medium text-slate-100 border border-slate-700"
              >
                <Globe className="h-3.5 w-3.5 text-accent-400" />
                <span>Personal Website</span>
              </a>
            )}
            {personalInfo.googleScholarUrl && (
              <a
                href={personalInfo.googleScholarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors font-medium text-slate-100 border border-slate-700"
              >
                <BookOpen className="h-3.5 w-3.5 text-accent-400" />
                <span>Google Scholar</span>
              </a>
            )}
            {personalInfo.linkedInUrl && (
              <a
                href={personalInfo.linkedInUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 transition-colors font-medium text-slate-100 border border-slate-700"
              >
                <Briefcase className="h-3.5 w-3.5 text-accent-400" />
                <span>LinkedIn</span>
              </a>
            )}
            {personalInfo.orcid && (
              <div className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 text-slate-200 font-mono text-xs border border-slate-700">
                <span>ORCID: {personalInfo.orcid}</span>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-600 hover:bg-accent-500 text-white transition-all font-semibold text-xs shadow-md active:scale-95 ml-auto"
          >
            <Printer className="h-4 w-4" />
            <span>Print Full CV / Resume</span>
          </button>
        </div>
      </Card>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <p className="text-2xl md:text-3xl font-bold text-foreground font-serif">{stat.value}</p>
                  <p className="text-xs font-medium text-foreground-muted mt-1">{stat.label}</p>
                </div>
                <div className="p-3 rounded-xl bg-accent-500/10 text-accent-700 dark:text-accent-400">
                  <Icon className="h-5 w-5" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Biography & Research Interests */}
      <Card>
        <CardContent className="p-6 md:p-8 space-y-6">
          <div className="space-y-3">
            <h2 className="text-xl font-bold font-serif text-foreground">Biography</h2>
            <p className="text-foreground-muted leading-relaxed text-sm md:text-base">
              {personalInfo.biography}
            </p>
          </div>

          {personalInfo.researchInterests?.length > 0 && (
            <div className="space-y-3 pt-5 border-t border-border-subtle/70">
              <h3 className="text-xs font-bold uppercase tracking-wider text-foreground-muted">
                Primary Research Interests
              </h3>
              <div className="flex flex-wrap gap-2">
                {personalInfo.researchInterests.map((interest) => (
                  <span
                    key={interest}
                    className="px-3.5 py-1.5 rounded-full bg-accent-500/10 text-accent-700 dark:text-accent-400 text-xs md:text-sm font-medium border border-accent-500/20 hover:border-accent-500/40 transition-colors"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
