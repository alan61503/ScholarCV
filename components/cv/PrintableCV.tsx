import React from 'react';
import { FacultyProfile } from '../../types/faculty';

interface PrintableCVProps {
  profile: FacultyProfile;
}

export default function PrintableCV({ profile }: PrintableCVProps) {
  const { personalInfo } = profile;

  return (
    <div className="hidden print:block print-cv-root text-slate-900 bg-white p-8 max-w-4xl mx-auto font-sans leading-normal">
      {/* 1. Header Section */}
      <div className="cv-header mb-6 text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif uppercase tracking-widest text-slate-900">
          {personalInfo.name.toUpperCase()}
        </h1>
        <p className="text-sm font-serif text-slate-800 tracking-wide">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span className="mx-2 text-slate-400">|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
        </p>
      </div>

      {/* 2. Executive Summary / Biography */}
      {personalInfo.biography && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Executive Summary
          </h2>
          <p className="text-xs leading-relaxed text-slate-800 text-justify">{personalInfo.biography}</p>
          {personalInfo.researchInterests?.length > 0 && (
            <p className="text-xs text-slate-800 mt-2">
              <strong>Research Interests:</strong> {personalInfo.researchInterests.join(', ')}
            </p>
          )}
        </section>
      )}

      {/* 3. Education Background */}
      {profile.education?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Education
          </h2>
          <div className="space-y-3">
            {profile.education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start text-xs">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {edu.degree} in {edu.field}
                  </h3>
                  <p className="text-slate-700">{edu.institution}</p>
                  {edu.thesisTitle && (
                    <p className="text-slate-600 italic mt-0.5">Thesis: "{edu.thesisTitle}"</p>
                  )}
                </div>
                <div className="text-right shrink-0 font-mono font-semibold text-slate-800">
                  {edu.year} {edu.grade && `• ${edu.grade}`}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. Professional Appointments & Experience */}
      {profile.experience?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Academic & Professional Appointments
          </h2>
          <div className="space-y-3">
            {profile.experience.map((exp) => (
              <div key={exp.id} className="text-xs">
                <div className="flex justify-between items-baseline font-bold text-slate-900">
                  <span>
                    {exp.role} — <span className="font-semibold text-slate-800">{exp.organization}</span>
                  </span>
                  <span className="font-mono text-slate-700 shrink-0">
                    {exp.startDate} – {exp.endDate}
                  </span>
                </div>
                {exp.location && <p className="text-slate-600 text-[11px]">{exp.location}</p>}
                {exp.description && (
                  <p className="text-slate-700 leading-relaxed mt-1 text-justify">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 5. Peer-Reviewed Publications */}
      {profile.publications?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Peer-Reviewed Publications ({profile.publications.length})
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-800">
            {profile.publications.map((pub) => (
              <li key={pub.id} className="leading-relaxed pl-1">
                {pub.authors?.length > 0 ? pub.authors.join(', ') : personalInfo.name} ({pub.year}). "{pub.title}."{' '}
                <span className="italic font-semibold">{pub.journalName}</span>
                {pub.volume && `, Vol. ${pub.volume}`}
                {pub.issue && ` (${pub.issue})`}
                {pub.pages && `, pp. ${pub.pages}`}
                {pub.doi && `. DOI: ${pub.doi}`}
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* 6. Sponsored Research Projects & Grants */}
      {(profile.fundedProjects?.length > 0 || profile.grantsReceived?.length > 0) && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Funded Research & Grants
          </h2>
          <div className="space-y-3 text-xs">
            {profile.fundedProjects?.map((proj) => (
              <div key={proj.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{proj.title}</h3>
                  <p className="text-slate-700">
                    Role: {proj.role} • Agency: {proj.fundingAgency}
                  </p>
                  {proj.description && <p className="text-slate-600 mt-0.5">{proj.description}</p>}
                </div>
                <div className="text-right shrink-0 font-mono font-semibold text-slate-800 ml-4">
                  {proj.amount} <br />
                  <span className="text-[11px] font-normal text-slate-600">
                    {proj.startDate}–{proj.endDate}
                  </span>
                </div>
              </div>
            ))}
            {profile.grantsReceived?.map((grant) => (
              <div key={grant.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{grant.title}</h3>
                  <p className="text-slate-700">Agency: {grant.agency} • Purpose: {grant.purpose}</p>
                </div>
                <div className="text-right shrink-0 font-mono font-semibold text-slate-800 ml-4">
                  {grant.amount} ({grant.year})
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 7. Honors & Awards */}
      {profile.awardsReceived?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Honors & Awards
          </h2>
          <ul className="space-y-2 text-xs">
            {profile.awardsReceived.map((award) => (
              <li key={award.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-900">{award.title}</span> —{' '}
                  <span className="text-slate-700">{award.awardingBody}</span>
                  {award.description && <p className="text-slate-600 text-[11px]">{award.description}</p>}
                </div>
                <span className="font-mono font-semibold text-slate-800 shrink-0 ml-4">{award.year}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 8. Patents & Intellectual Property */}
      {profile.patents?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Patents & Intellectual Property
          </h2>
          <ul className="space-y-2 text-xs">
            {profile.patents.map((pat) => (
              <li key={pat.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-900">{pat.title}</span> ({pat.status})
                  <p className="text-slate-700 text-[11px]">
                    Inventors: {pat.inventors.join(', ')} • App No: {pat.applicationNumber}
                    {pat.patentNumber && ` • Patent No: ${pat.patentNumber}`}
                  </p>
                </div>
                <span className="font-mono text-slate-700 shrink-0 ml-4">{pat.filingDate}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 9. Doctoral Scholars Guided */}
      {profile.phdScholars?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Doctoral Scholars Supervision
          </h2>
          <div className="space-y-2 text-xs">
            {profile.phdScholars.map((sch) => (
              <div key={sch.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-900">{sch.scholarName}</span> — Role: {sch.role} ({sch.status})
                  <p className="text-slate-700 italic">Thesis: "{sch.thesisTitle}"</p>
                </div>
                <span className="font-mono text-slate-700 shrink-0 ml-4">
                  {sch.joiningYear} {sch.completionYear && `– ${sch.completionYear}`}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Workshops */}
      {(profile.workshopsAttended?.length > 0 || profile.workshopsConducted?.length > 0) && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Workshops Attended & Conducted
          </h2>
          <div className="space-y-3 text-xs">
            {profile.workshopsAttended?.map((ws) => (
              <div key={ws.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {ws.title} <span className="font-normal text-slate-600">(Attended • {ws.mode || 'Offline'})</span>
                  </h3>
                  <p className="text-slate-700">Organized by: {ws.organizedBy}</p>
                  {ws.topic && <p className="text-slate-700 font-medium">Topic: {ws.topic}</p>}
                  {ws.description && <p className="text-slate-600 mt-0.5 leading-relaxed">{ws.description}</p>}
                </div>
                <div className="text-right shrink-0 font-mono font-semibold text-slate-800 ml-4">
                  {ws.startDate}{ws.endDate && ws.endDate !== ws.startDate ? ` – ${ws.endDate}` : ''}
                </div>
              </div>
            ))}
            {profile.workshopsConducted?.map((ws) => (
              <div key={ws.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {ws.title} <span className="font-normal text-slate-600">(Conducted • {ws.mode || 'Offline'})</span>
                  </h3>
                  <p className="text-slate-700">Organized by: {ws.organizedBy}</p>
                  {ws.topic && <p className="text-slate-700 font-medium">Topic: {ws.topic}</p>}
                  {ws.description && <p className="text-slate-600 mt-0.5 leading-relaxed">{ws.description}</p>}
                </div>
                <div className="text-right shrink-0 font-mono font-semibold text-slate-800 ml-4">
                  {ws.startDate}{ws.endDate && ws.endDate !== ws.startDate ? ` – ${ws.endDate}` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 10. Seminars Attended */}
      {profile.seminars && profile.seminars.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Seminars Attended ({profile.seminars.length})
          </h2>
          <div className="space-y-3 text-xs">
            {profile.seminars.map((sem) => (
              <div key={sem.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {sem.title} <span className="font-normal text-slate-600">({sem.level} Level • {sem.mode})</span>
                  </h3>
                  <p className="text-slate-700">Organized by: {sem.organizedBy}</p>
                  {sem.topic && <p className="text-slate-700 font-medium">Topic: {sem.topic}</p>}
                  {sem.description && <p className="text-slate-600 mt-0.5 leading-relaxed">{sem.description}</p>}
                </div>
                <div className="text-right shrink-0 font-mono font-semibold text-slate-800 ml-4">
                  {sem.startDate}{sem.endDate && sem.endDate !== sem.startDate ? ` – ${sem.endDate}` : ''}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
