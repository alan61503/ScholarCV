'use client';

import React, { useEffect, useState } from 'react';
import { FacultyProfile } from '../types/faculty';
import { subscribeToCloudProfile } from '../lib/profileService';
import { sortByDateDesc } from '../lib/sortHelper';

import HighlightsTicker from './layout/HighlightsTicker';
import Nav from './layout/Nav';
import SidebarNav, { NavItem } from './layout/SidebarNav';
import ProfileSummary from './sections/ProfileSummary';
import EducationExperience from './sections/EducationExperience';
import Publications from './sections/Publications';
import ProjectsGrants from './sections/ProjectsGrants';
import AwardsAchievements from './sections/AwardsAchievements';
import ConferencesWorkshops from './sections/ConferencesWorkshops';
import Workshops from './sections/Workshops';
import Seminars from './sections/Seminars';
import ScholarsScholarly from './sections/ScholarsScholarly';
import RolesRecognition from './sections/RolesRecognition';
import Patents from './sections/Patents';
import Copyrights from './sections/Copyrights';
import PrintableCV, { SelectedChapters, defaultSelectedChapters } from './cv/PrintableCV';
import PrintCustomizationModal from './cv/PrintCustomizationModal';
import ThemeToggle from './ui/ThemeToggle';
import { FadeIn } from './ui/FadeIn';

interface HomeClientProps {
  initialProfile: FacultyProfile;
  profileId?: string;
}

export default function HomeClient({ initialProfile, profileId = 'default' }: HomeClientProps) {
  const [profileData, setProfileData] = useState<FacultyProfile>(initialProfile);
  const [isPrintModalOpen, setIsPrintModalOpen] = useState<boolean>(false);
  const [selectedChapters, setSelectedChapters] = useState<SelectedChapters>(defaultSelectedChapters);

  useEffect(() => {
    const unsubscribe = subscribeToCloudProfile((liveData) => {
      if (liveData && liveData.personalInfo) {
        const mergedProfile = {
          ...liveData,
          personalInfo: {
            ...liveData.personalInfo,
            avatarUrl: liveData.personalInfo.avatarUrl || initialProfile.personalInfo.avatarUrl || '/Profile_Picture.png',
          },
        };
        setProfileData(mergedProfile);
        // Dynamically update the browser tab title to match the live loaded data
        document.title = `${liveData.personalInfo.name} — ${liveData.personalInfo.title}`;
      }
    }, profileId);
    return () => unsubscribe();
  }, [initialProfile, profileId]);

  const p = profileData;

  const navItems: NavItem[] = React.useMemo(() => [
    { id: 'summary', label: 'Summary', icon: 'user', count: 1 },
    {
      id: 'education-experience',
      label: 'Education & Skills',
      icon: 'education',
      count: (p.education?.length || 0) + (p.experience?.length || 0),
    },
    { id: 'publications', label: 'Publications', icon: 'publications', count: p.publications?.length || 0 },
    {
      id: 'projects-grants',
      label: 'Projects & Grants',
      icon: 'projects',
      count: (p.fundedProjects?.length || 0) + (p.grantsReceived?.length || 0),
    },
    {
      id: 'awards-achievements',
      label: 'Awards & Honors',
      icon: 'awards',
      count: (p.awardsReceived?.length || 0) + (p.academicAchievements?.length || 0),
    },
    { id: 'conferences-workshops', label: 'Conferences', icon: 'conferences', count: p.conferencesAttended?.length || 0 },
    {
      id: 'workshops',
      label: 'Workshops',
      icon: 'workshops',
      count: (p.workshopsAttended?.length || 0) + (p.workshopsConducted?.length || 0),
    },
    { id: 'seminars', label: 'Seminars', icon: 'seminar', count: p.seminars?.length || 0 },
    { id: 'scholars', label: 'Research Scholars', icon: 'scholars', count: p.phdScholars?.length || 0 },
    {
      id: 'roles-recognition',
      label: 'Roles & Recognitions',
      icon: 'roles',
      count: (p.resourcePersonRoles?.length || 0) + (p.externalExaminerRoles?.length || 0),
    },
    { id: 'patents', label: 'Patents', icon: 'patents', count: p.patents?.length || 0 },
    { id: 'copyrights', label: 'Copyrights', icon: 'copyrights', count: p.copyrights?.length || 0 },
  ], [p]);

  return (
    <>
      <div className="min-h-screen print:hidden" style={{ background: 'var(--background)', color: 'var(--foreground)' }}>
        <HighlightsTicker profile={p} />
        <Nav
          name={p.personalInfo.name}
          title={p.personalInfo.title}
          institution={p.personalInfo.institution}
          department={p.personalInfo.department}
          items={navItems}
          onOpenPrintModal={() => setIsPrintModalOpen(true)}
        />

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

        {/* Floating Theme Toggle (Bottom-Right) */}
        <ThemeToggle variant="floating" />
      </div>

      {/* Printable Academic CV view (rendered only when printing) */}
      <PrintableCV profile={p} selectedChapters={selectedChapters} />

      {/* Interactive CV Customization Modal (hidden when printing) */}
      <PrintCustomizationModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        profile={p}
        selectedChapters={selectedChapters}
        onChangeSelectedChapters={setSelectedChapters}
      />
    </>
  );
}
