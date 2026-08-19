'use client';

import React from 'react';
import { Sparkles, Star, BookOpen, Award, Lightbulb } from 'lucide-react';
import { FacultyProfile } from '../../types/faculty';

interface HighlightsTickerProps {
  profile: FacultyProfile;
}

export default function HighlightsTicker({ profile }: HighlightsTickerProps) {
  // 1. Basic Title & Institution (Dynamic)
  const title = profile.personalInfo?.title || 'Academic';
  const institution = profile.personalInfo?.institution || '';
  const institutionHighlight = institution ? `${title} at ${institution}` : title;

  // 2. Highest Education / PhD information (Dynamic)
  const phdBg = profile.education?.find(e => e.degree.toLowerCase().includes('phd') || e.degree.toLowerCase().includes('ph.d'));
  const eduHighlight = phdBg 
    ? `Ph.D. from ${phdBg.institution}`
    : profile.education?.length > 0 
      ? `Educated at ${profile.education[0].institution}`
      : '';

  // 3. Research Area of Expertise (Dynamic)
  const researchInterests = profile.personalInfo?.researchInterests;
  const researchAreaHighlight = researchInterests && researchInterests.length > 0
    ? `Research Focus: ${researchInterests.slice(0, 3).join(', ')}`
    : '';

  // 4. Years of Experience (Dynamic)
  let minYear = new Date().getFullYear();
  let maxYear = minYear;
  let hasExperience = false;
  profile.experience?.forEach((exp) => {
    if (!exp.startDate) return;
    const start = parseInt(exp.startDate.split('-')[0], 10);
    if (!isNaN(start)) {
      hasExperience = true;
      if (start < minYear) minYear = start;
      if (exp.endDate && exp.endDate.toLowerCase() !== 'present') {
        const end = parseInt(exp.endDate.split('-')[0], 10);
        if (!isNaN(end) && end > maxYear) maxYear = end;
      } else {
        maxYear = new Date().getFullYear();
      }
    }
  });
  const yearsOfExp = hasExperience ? Math.max(1, maxYear - minYear) : 0;
  const expHighlight = yearsOfExp > 0 ? `${yearsOfExp}+ Years of Academic & Research Experience` : '';

  // 5. Publications (Dynamic)
  const publicationsCount = profile.publications?.length || 0;
  const pubHighlight = publicationsCount > 0
    ? `${publicationsCount}+ Peer-Reviewed Research Publications`
    : '';

  // 6. Funded Projects & Grants (Dynamic)
  const fundedProjectsCount = profile.fundedProjects?.length || 0;
  const grantsCount = profile.grantsReceived?.length || 0;
  const totalProjects = fundedProjectsCount + grantsCount;
  const projHighlight = totalProjects > 0
    ? `${totalProjects}+ Research Projects & Grants`
    : '';

  // 7. PhD Scholars Supervised (Dynamic)
  const scholarsCount = profile.phdScholars?.length || 0;
  const scholarsHighlight = scholarsCount > 0
    ? `PhD Scholars Mentored: ${scholarsCount}`
    : '';

  // 8. Patents Filed/Granted (Dynamic)
  const patentsCount = profile.patents?.length || 0;
  const patentHighlight = patentsCount > 0
    ? `${patentsCount} Patent${patentsCount > 1 ? 's' : ''} Filed/Granted`
    : '';

  // 9. Copyrights Registered (Dynamic)
  const copyrightsCount = profile.copyrights?.length || 0;
  const copyrightHighlight = copyrightsCount > 0
    ? `${copyrightsCount} Registered Work Copyright${copyrightsCount > 1 ? 's' : ''}`
    : '';

  // 10. Awards received (Dynamic)
  const awardsCount = profile.awardsReceived?.length || 0;
  const recentAward = profile.awardsReceived?.[0]?.title;
  const awardHighlight = recentAward 
    ? `Recipient of ${recentAward}`
    : awardsCount > 0
      ? `${awardsCount} Academic Awards & Honors`
      : '';

  // 11. Key Roles / Resource Person (Dynamic)
  const resourceRolesCount = profile.resourcePersonRoles?.length || 0;
  const examinerRolesCount = profile.externalExaminerRoles?.length || 0;
  const totalRoles = resourceRolesCount + examinerRolesCount;
  const rolesHighlight = totalRoles > 0
    ? `Served as Resource Person / Examiner ${totalRoles} times`
    : '';

  // Assemble dynamic list of highlights
  const rawHighlights = [
    { icon: Star, text: institutionHighlight },
    { icon: BookOpen, text: researchAreaHighlight },
    { icon: Award, text: awardHighlight },
    { icon: Lightbulb, text: projHighlight },
    { icon: Sparkles, text: pubHighlight },
    { icon: Star, text: scholarsHighlight },
    { icon: BookOpen, text: expHighlight },
    { icon: Award, text: patentHighlight },
    { icon: Sparkles, text: copyrightHighlight },
    { icon: Lightbulb, text: rolesHighlight },
    { icon: Star, text: eduHighlight },
  ];

  // Filter out empty items
  const highlights = rawHighlights.filter(h => h.text);

  // Fallback to static defaults if not enough dynamic info is present
  if (highlights.length < 3) {
    highlights.push(
      { icon: Star, text: 'NAAC Accredited Institution' },
      { icon: BookOpen, text: 'International Collaborations & Exchange Programs' }
    );
  }

  // Duplicate for seamless loop
  const allHighlights = [...highlights, ...highlights];

  return (
    <div
      className="no-print relative z-30 border-b overflow-hidden"
      style={{
        background: 'linear-gradient(90deg, #1e3a8a 0%, #1d4ed8 40%, #1e40af 60%, #1e3a8a 100%)',
        borderColor: 'rgba(212, 175, 55, 0.3)',
        height: '36px',
      }}
    >
      {/* Gold top line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #d4af37 30%, #fbbf24 50%, #d4af37 70%, transparent)',
        }}
      />

      {/* Highlights label */}
      <div
        className="absolute left-0 top-0 bottom-0 z-10 flex items-center px-4 gap-2 text-xs font-bold uppercase tracking-widest"
        style={{
          background: 'linear-gradient(90deg, #0f1e4d, #1e3a8a)',
          color: '#fbbf24',
          borderRight: '1px solid rgba(212, 175, 55, 0.25)',
          minWidth: '120px',
        }}
      >
        <Sparkles className="h-3 w-3 animate-pulse-dot" aria-hidden="true" />
        Highlights
      </div>

      {/* Scrolling ticker */}
      <div className="ml-[120px] h-full overflow-hidden">
        <div className="ticker-wrap h-full flex items-center">
          <div className="ticker-track animate-ticker">
            {allHighlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <span
                  key={idx}
                  className="inline-flex items-center gap-2 text-xs font-medium"
                  style={{ color: 'rgba(255,255,255,0.9)' }}
                >
                  <span style={{ color: '#fbbf24' }}>
                    <Icon className="h-3 w-3" aria-hidden="true" />
                  </span>
                  {item.text}
                  <span
                    className="mx-4 inline-block w-1 h-1 rounded-full"
                    style={{ background: 'rgba(212, 175, 55, 0.5)' }}
                  />
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
