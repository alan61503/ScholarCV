import React from 'react';
import { FacultyProfile } from '../../types/faculty';

export interface SelectedChapters {
  summary: boolean;
  education: boolean;
  publications: boolean;
  projects: boolean;
  awards: boolean;
  conferences: boolean;
  workshops: boolean;
  seminars: boolean;
  scholars: boolean;
  roles: boolean;
  patents: boolean;
  copyrights: boolean;
}

export const defaultSelectedChapters: SelectedChapters = {
  summary: true,
  education: true,
  publications: true,
  projects: true,
  awards: true,
  conferences: true,
  workshops: true,
  seminars: true,
  scholars: true,
  roles: true,
  patents: true,
  copyrights: true,
};

interface PrintableCVProps {
  profile: FacultyProfile;
  selectedChapters?: SelectedChapters;
  isPreview?: boolean;
}

export default function PrintableCV({
  profile,
  selectedChapters = defaultSelectedChapters,
  isPreview = false,
}: PrintableCVProps) {
  const { personalInfo } = profile;
  const sel = selectedChapters;

  return (
    <div
      className={
        isPreview
          ? 'print-cv-root text-slate-900 bg-white p-6 md:p-8 max-w-4xl mx-auto font-sans leading-normal'
          : 'hidden print:block print-cv-root text-slate-900 bg-white p-8 max-w-4xl mx-auto font-sans leading-normal'
      }
    >
      {/* 1. Header Section */}
      <div className="cv-header mb-6 text-center space-y-2">
        <h1 className="text-3xl font-bold font-serif uppercase tracking-widest text-slate-900">
          {personalInfo.name.toUpperCase()}
        </h1>
        <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
          {personalInfo.title} • {personalInfo.department} • {personalInfo.institution}
        </p>
        <p className="text-xs font-serif text-slate-800 tracking-wide">
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.email && <span className="mx-2 text-slate-400">|</span>}
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.officeAddress && <span className="mx-2 text-slate-400">|</span>}
          {personalInfo.officeAddress && <span>{personalInfo.officeAddress}</span>}
        </p>
      </div>

      {/* 2. Executive Summary / Biography */}
      {sel.summary && personalInfo.biography && (
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

      {/* 3. Education & Experience */}
      {sel.education && (profile.education?.length > 0 || profile.experience?.length > 0) && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Education & Professional Appointments
          </h2>
          {profile.education?.length > 0 && (
            <div className="space-y-3 mb-4">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Education</h3>
              {profile.education.map((edu) => (
                <div key={edu.id} className="flex justify-between items-start text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900">
                      {edu.degree} in {edu.field}
                    </h4>
                    <p className="text-slate-700">{edu.institution}</p>
                    {edu.thesisTitle && (
                      <p className="text-slate-600 italic mt-0.5">Thesis: &quot;{edu.thesisTitle}&quot;</p>
                    )}
                  </div>
                  <div className="text-right shrink-0 font-mono font-semibold text-slate-800">
                    {edu.year} {edu.grade && `• ${edu.grade}`}
                  </div>
                </div>
              ))}
            </div>
          )}

          {profile.experience?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-900 uppercase">Appointments</h3>
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
          )}
        </section>
      )}

      {/* 4. Peer-Reviewed Publications */}
      {sel.publications && profile.publications?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Peer-Reviewed Publications ({profile.publications.length})
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-xs text-slate-800">
            {profile.publications.map((pub) => (
              <li key={pub.id} className="leading-relaxed pl-1">
                {pub.authors?.length > 0 ? pub.authors.join(', ') : personalInfo.name} ({pub.year}). &quot;{pub.title}.&quot;{' '}
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

      {/* 5. Sponsored Research Projects & Grants */}
      {sel.projects && (profile.fundedProjects?.length > 0 || profile.grantsReceived?.length > 0) && (
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

      {/* 6. Honors & Awards */}
      {sel.awards && profile.awardsReceived?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Honors & Awards ({profile.awardsReceived.length})
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

      {/* 7. Conferences */}
      {sel.conferences && profile.conferencesAttended?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Conferences ({profile.conferencesAttended.length})
          </h2>
          <div className="space-y-3 text-xs">
            {profile.conferencesAttended.map((conf) => (
              <div key={conf.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">
                    {conf.title} <span className="font-normal text-slate-600">({conf.role || 'Presenter'})</span>
                  </h3>
                  {conf.paperTitle && <p className="text-slate-700 italic">Paper: &quot;{conf.paperTitle}&quot;</p>}
                  {conf.location && <p className="text-slate-600">{conf.location}</p>}
                </div>
                <div className="text-right shrink-0 font-mono font-semibold text-slate-800 ml-4">
                  {conf.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 8. Workshops */}
      {sel.workshops && (profile.workshopsAttended?.length > 0 || profile.workshopsConducted?.length > 0) && (
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
                  <p className="text-slate-700">Organized by: {ws.organizerName || ws.organizedBy}</p>
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
                  <p className="text-slate-700">Organized by: {ws.organizerName || ws.organizedBy}</p>
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

      {/* 9. Seminars Attended */}
      {sel.seminars && profile.seminars && profile.seminars.length > 0 && (
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
                  <p className="text-slate-700">Organized by: {sem.organizerName || sem.organizedBy}</p>
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

      {/* 10. Doctoral Scholars Supervision */}
      {sel.scholars && profile.phdScholars?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Doctoral Scholars Supervision ({profile.phdScholars.length})
          </h2>
          <div className="space-y-2 text-xs">
            {profile.phdScholars.map((sch) => (
              <div key={sch.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-900">{sch.scholarName}</span> — Role: {sch.role} ({sch.status})
                  <p className="text-slate-700 italic">Thesis: &quot;{sch.thesisTitle}&quot;</p>
                </div>
                <span className="font-mono text-slate-700 shrink-0 ml-4">
                  {sch.joiningYear} {sch.completionYear && `– ${sch.completionYear}`}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 11. Key Roles & Recognitions */}
      {sel.roles && (profile.resourcePersonRoles?.length > 0 || profile.externalExaminerRoles?.length > 0) && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Key Resource Roles & Examiner Appointments
          </h2>
          <div className="space-y-3 text-xs">
            {profile.resourcePersonRoles?.map((rpr) => (
              <div key={rpr.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">{rpr.eventTitle}</h3>
                  <p className="text-slate-700">Topic: {rpr.topic} • Org: {rpr.organizedBy}</p>
                </div>
                <span className="font-mono font-semibold text-slate-800 shrink-0 ml-4">{rpr.date}</span>
              </div>
            ))}
            {profile.externalExaminerRoles?.map((eer) => (
              <div key={eer.id} className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-slate-900">External Examiner — {eer.roleType}</h3>
                  <p className="text-slate-700">{eer.university} ({eer.department})</p>
                </div>
                <span className="font-mono font-semibold text-slate-800 shrink-0 ml-4">{eer.year}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 12. Patents */}
      {sel.patents && profile.patents?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Patents ({profile.patents.length})
          </h2>
          <ul className="space-y-3 text-xs">
            {profile.patents.map((pat) => (
              <li key={pat.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-900">{pat.title}</span> ({pat.status})
                  <p className="text-slate-700 text-[11px]">
                    Inventors: {Array.isArray(pat.inventors) ? pat.inventors.join(', ') : pat.inventors} • App No: {pat.applicationNumber}
                    {pat.patentNumber && ` • Patent No: ${pat.patentNumber}`}
                  </p>
                  {pat.description && <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">{pat.description}</p>}
                </div>
                <span className="font-mono text-slate-700 shrink-0 ml-4">{pat.filingDate}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 13. Copyrights */}
      {sel.copyrights && profile.copyrights?.length > 0 && (
        <section className="mb-6 print-section">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-900 pb-1 mb-3 font-serif">
            Copyrights ({profile.copyrights.length})
          </h2>
          <ul className="space-y-3 text-xs">
            {profile.copyrights.map((cpy) => (
              <li key={cpy.id} className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-slate-900">{cpy.title}</span> ({cpy.status})
                  <p className="text-slate-700 text-[11px]">
                    Reg No: {cpy.registrationNumber} • Owners: {Array.isArray(cpy.owners) ? cpy.owners.join(', ') : cpy.owners}
                  </p>
                  {cpy.description && <p className="text-slate-600 mt-0.5 leading-relaxed text-[11px]">{cpy.description}</p>}
                </div>
                <span className="font-mono text-slate-700 shrink-0 ml-4">{cpy.year}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
