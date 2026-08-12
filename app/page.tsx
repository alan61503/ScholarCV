'use client';

import React, { useEffect, useState } from 'react';
import { profile as initialProfile } from '../data/profile';
import { FacultyProfile } from '../types/faculty';
import { subscribeToCloudProfile } from '../lib/profileService';
import { sortByDateDesc } from '../lib/sortHelper';

import HighlightsTicker from '../components/layout/HighlightsTicker';
import Nav from '../components/layout/Nav';
import SidebarNav from '../components/layout/SidebarNav';
import ProfileSummary from '../components/sections/ProfileSummary';
import EducationExperience from '../components/sections/EducationExperience';
import Publications from '../components/sections/Publications';
import ProjectsGrants from '../components/sections/ProjectsGrants';
import AwardsAchievements from '../components/sections/AwardsAchievements';
import ConferencesWorkshops from '../components/sections/ConferencesWorkshops';
import Workshops from '../components/sections/Workshops';
import Seminars from '../components/sections/Seminars';
import ScholarsScholarly from '../components/sections/ScholarsScholarly';
import RolesRecognition from '../components/sections/RolesRecognition';
import Patents from '../components/sections/Patents';
import Copyrights from '../components/sections/Copyrights';
import PrintableCV from '../components/cv/PrintableCV';
import ThemeToggle from '../components/ui/ThemeToggle';
import { FadeIn } from '../components/ui/FadeIn';

const navItems = [
  { id: 'summary', label: 'Summary', icon: 'user' },
  { id: 'education-experience', label: 'Education & Skills', icon: 'education' },
  { id: 'publications', label: 'Publications', icon: 'publications' },
  { id: 'projects-grants', label: 'Projects & Grants', icon: 'projects' },
  { id: 'awards-achievements', label: 'Awards & Honors', icon: 'awards' },
  { id: 'conferences-workshops', label: 'Conferences', icon: 'conferences' },
  { id: 'workshops', label: 'Workshops', icon: 'workshops' },
  { id: 'seminars', label: 'Seminars', icon: 'seminar' },
  { id: 'scholars', label: 'Research Scholars', icon: 'scholars' },
  { id: 'roles-recognition', label: 'Roles & Recognitions', icon: 'roles' },
  { id: 'patents', label: 'Patents', icon: 'patents' },
  { id: 'copyrights', label: 'Copyrights', icon: 'copyrights' },
];

export default function Home() {
  const [profileData, setProfileData] = useState<FacultyProfile>(initialProfile);

  useEffect(() => {
    const unsubscribe = subscribeToCloudProfile((liveData) => {
      if (liveData && liveData.personalInfo) {
        setProfileData(liveData);
        // Dynamically update the browser tab title to match the live loaded data
        document.title = `${liveData.personalInfo.name} — ${liveData.personalInfo.title}`;
      }
    });
    return () => unsubscribe();
  }, []);

  const p = profileData;

  return (
    <div className="min-h-screen" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
      <HighlightsTicker profile={p} />
      <Nav name={p.personalInfo.name} title={p.personalInfo.title} institution={p.personalInfo.institution} department={p.personalInfo.department} items={navItems} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <SidebarNav
            items={navItems}
            name={p.personalInfo.name}
            title={p.personalInfo.title}
            avatarUrl={p.personalInfo.avatarUrl}
          />

          <div className="flex-1 min-w-0 space-y-10">
            <FadeIn>
              <ProfileSummary profile={p} />
            </FadeIn>
            <FadeIn>
              <EducationExperience
                education={sortByDateDesc(p.education, 'year')}
                experience={sortByDateDesc(p.experience, 'startDate')}
                skills={p.skills || []}
              />
            </FadeIn>
            <FadeIn>
              <Publications publications={sortByDateDesc(p.publications, 'year')} />
            </FadeIn>
            <FadeIn>
              <ProjectsGrants
                fundedProjects={sortByDateDesc(p.fundedProjects, 'startDate')}
                grantsReceived={sortByDateDesc(p.grantsReceived, 'year')}
              />
            </FadeIn>
            <FadeIn>
              <AwardsAchievements
                awardsReceived={sortByDateDesc(p.awardsReceived, 'year')}
                academicAchievements={sortByDateDesc(p.academicAchievements, 'date')}
              />
            </FadeIn>
            <FadeIn>
              <ConferencesWorkshops
                conferencesAttended={sortByDateDesc(p.conferencesAttended, 'date')}
              />
            </FadeIn>
            <FadeIn>
              <Workshops
                workshopsAttended={sortByDateDesc(p.workshopsAttended, 'startDate')}
                workshopsConducted={sortByDateDesc(p.workshopsConducted, 'startDate')}
              />
            </FadeIn>
            <FadeIn>
              <Seminars seminars={sortByDateDesc(p.seminars, 'startDate')} />
            </FadeIn>
            <FadeIn>
              <ScholarsScholarly phdScholars={sortByDateDesc(p.phdScholars, 'joiningYear')} />
            </FadeIn>
            <FadeIn>
              <RolesRecognition
                resourcePersonRoles={sortByDateDesc(p.resourcePersonRoles, 'date')}
                externalExaminerRoles={sortByDateDesc(p.externalExaminerRoles, 'year')}
              />
            </FadeIn>
            <FadeIn>
              <Patents patents={sortByDateDesc(p.patents, 'filingDate')} />
            </FadeIn>
            <FadeIn>
              <Copyrights copyrights={sortByDateDesc(p.copyrights, 'year')} />
            </FadeIn>
          </div>
        </div>
      </main>

      <footer className="border-t bg-surface py-8 text-center text-xs" style={{ borderColor: 'var(--border-color)', color: 'var(--foreground-muted)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-1">
          <p style={{ fontFamily: "'Playfair Display', Georgia, serif", color: 'var(--foreground)', opacity: 0.7 }}>{p.personalInfo.institution}</p>
          <p>© {new Date().getFullYear()} {p.personalInfo.name}. All rights reserved.</p>
        </div>
      </footer>

      {/* Printable Academic CV view (rendered only when printing) */}
      <PrintableCV profile={p} />

      {/* Floating Theme Toggle (Bottom-Right) */}
      <ThemeToggle variant="floating" />
    </div>
  );
}
