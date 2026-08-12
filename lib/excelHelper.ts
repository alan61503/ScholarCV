import * as XLSX from 'xlsx';
import { FacultyProfile } from '../types/faculty';

/**
 * Generates an Excel workbook with separate worksheets for each section
 * and triggers an automatic browser file download (.xlsx).
 */
export function exportProfileToExcelWorkbook(profile: FacultyProfile, fileNamePrefix = 'Faculty_Portfolio_Data') {
  const wb = XLSX.utils.book_new();

  // 1. Summary & Personal Info
  const summaryRows = [
    {
      'Full Name': profile.personalInfo?.name || '',
      'Title / Designation': profile.personalInfo?.title || '',
      'Department': profile.personalInfo?.department || '',
      'Institution / University': profile.personalInfo?.institution || '',
      'Email Address': profile.personalInfo?.email || '',
      'Phone Number': profile.personalInfo?.phone || '',
      'Office Address': profile.personalInfo?.officeAddress || '',
      'Biography / Executive Summary': profile.personalInfo?.biography || '',
      'Research Interests': Array.isArray(profile.personalInfo?.researchInterests)
        ? profile.personalInfo.researchInterests.join(', ')
        : '',
      'Google Scholar': profile.personalInfo?.googleScholarUrl || '',
      'ORCID': profile.personalInfo?.orcid || '',
      'LinkedIn': profile.personalInfo?.linkedInUrl || '',
      'Personal Website': profile.personalInfo?.websiteUrl || '',
    },
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  // 2. Education & Skills
  const eduRows = (profile.education || []).map((edu) => ({
    'Degree': edu.degree,
    'Field of Study': edu.field,
    'Institution / University': edu.institution,
    'Graduation Year': edu.year,
    'Grade / Marks / GPA': edu.grade || '',
    'Thesis Title': edu.thesisTitle || '',
  }));
  const wsEdu = XLSX.utils.json_to_sheet(eduRows.length > 0 ? eduRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsEdu, 'Education & Skills');

  // 3. Publications
  const pubRows = (profile.publications || []).map((pub) => ({
    'Paper Title': pub.title,
    'Journal / Book / Venue': pub.journalName,
    'Publication Year': pub.year,
    'Authors': Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors,
    'Category / Type': (pub as unknown as Record<string, unknown>).category as string || '',
    'DOI': pub.doi || '',
    'Volume': pub.volume || '',
    'Issue': pub.issue || '',
    'Pages': pub.pages || '',
    'Document URL / Link': (pub as unknown as Record<string, unknown>).journalUrl as string || pub.doi || '',
  }));
  const wsPub = XLSX.utils.json_to_sheet(pubRows.length > 0 ? pubRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsPub, 'Publications');

  // 4. Projects & Grants
  const projRows = (profile.fundedProjects || []).map((proj) => ({
    'Project Title': proj.title,
    'Funding Agency': proj.fundingAgency,
    'Role (PI / Co-PI)': proj.role,
    'Amount / Sanctioned Budget': proj.amount,
    'Start Date': proj.startDate,
    'End Date': proj.endDate,
    'Project Status': proj.status || '',
    'Description': proj.description || '',
  }));
  const wsProj = XLSX.utils.json_to_sheet(projRows.length > 0 ? projRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsProj, 'Projects & Grants');

  // 5. Awards & Honors
  const awardRows = (profile.awardsReceived || []).map((award) => ({
    'Award Title': award.title,
    'Awarding Body / Agency': award.awardingBody,
    'Year Received': award.year,
    'Description / Citation': award.description || '',
  }));
  const wsAward = XLSX.utils.json_to_sheet(awardRows.length > 0 ? awardRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsAward, 'Awards & Honors');

  // 6. Conferences
  const confRows = (profile.conferencesAttended || []).map((conf) => ({
    'Conference Title': conf.title,
    'Paper / Session Title': conf.paperTitle || '',
    'Role (Presenter / Chair / Keynote)': conf.role || 'Presenter',
    'Location / Venue': conf.location || '',
    'Date / Date Range': conf.date,
  }));
  const wsConf = XLSX.utils.json_to_sheet(confRows.length > 0 ? confRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsConf, 'Conferences');

  // 7. Workshops
  const wsAttended = (profile.workshopsAttended || []).map((w) => ({ ...w, type: w.type || 'Attended' }));
  const wsConducted = (profile.workshopsConducted || []).map((w) => ({ ...w, type: w.type || 'Conducted' }));
  const allWorkshops = [...wsAttended, ...wsConducted];
  const workshopRows = allWorkshops.map((ws) => ({
    'Workshop Name': ws.title,
    'Workshop Type': ws.type || 'Attended',
    'Organization Name': ws.organizerName || ws.organizedBy || '',
    'Organization Address': ws.organizerAddress || ws.location || '',
    'Type of Organization': ws.organizationType || '',
    'Topic / Theme': ws.topic || '',
    'Mode of Session': ws.mode || 'Offline',
    'Start Date': ws.startDate,
    'End Date': ws.endDate,
    'Description & Key Learnings': ws.description || '',
    'Certificate Document Name': ws.documentProofName || '',
  }));
  const wsWorkshops = XLSX.utils.json_to_sheet(workshopRows.length > 0 ? workshopRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsWorkshops, 'Workshops');

  // 8. Seminars
  const seminarRows = (profile.seminars || []).map((sem) => ({
    'Seminar Title': sem.title,
    'Level (International / National)': sem.level,
    'Organization Name': sem.organizerName || sem.organizedBy || '',
    'Organization Address': sem.organizerAddress || '',
    'Type of Organization': sem.organizationType || '',
    'Topic / Theme': sem.topic || '',
    'Mode of Session': sem.mode,
    'Start Date': sem.startDate,
    'End Date': sem.endDate || '',
    'Description & Conclusion': sem.description || '',
    'Certificate Document Name': sem.documentProofName || '',
  }));
  const wsSeminars = XLSX.utils.json_to_sheet(seminarRows.length > 0 ? seminarRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsSeminars, 'Seminars');

  // 9. Research Scholars
  const scholarRows = (profile.phdScholars || []).map((sch) => ({
    'Scholar Name': sch.scholarName,
    'Thesis Title': sch.thesisTitle,
    'Supervision Role': sch.role,
    'Status (Ongoing / Completed)': sch.status,
    'Joining Year': sch.joiningYear,
    'Completion Year': sch.completionYear || '',
  }));
  const wsScholars = XLSX.utils.json_to_sheet(scholarRows.length > 0 ? scholarRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsScholars, 'Research Scholars');

  // 10. Roles & Recognitions
  const rprRows = (profile.resourcePersonRoles || []).map((rpr) => ({
    'Role Category': 'Resource Person',
    'Event Title': rpr.eventTitle,
    'Topic': rpr.topic,
    'Organized By': rpr.organizedBy,
    'Date / Year': rpr.date,
  }));
  const eerRows = (profile.externalExaminerRoles || []).map((eer) => ({
    'Role Category': 'External Examiner',
    'Event Title': `External Examiner — ${eer.roleType}`,
    'Topic': eer.department,
    'Organized By': eer.university,
    'Date / Year': eer.year,
  }));
  const allRoles = [...rprRows, ...eerRows];
  const wsRoles = XLSX.utils.json_to_sheet(allRoles.length > 0 ? allRoles : [{}]);
  XLSX.utils.book_append_sheet(wb, wsRoles, 'Roles & Recognitions');

  // 11. Patents
  const patentRows = (profile.patents || []).map((pat) => ({
    'Patent Title': pat.title,
    'Status (Filed / Published / Granted)': pat.status,
    'Inventors': Array.isArray(pat.inventors) ? pat.inventors.join(', ') : pat.inventors,
    'Application Number': pat.applicationNumber,
    'Patent Number': pat.patentNumber || '',
    'Country': pat.country,
    'Filing Date': pat.filingDate,
    'Grant Date': pat.grantDate || '',
    'Patent Description': pat.description || '',
    'Patent Link / URL': pat.url || '',
  }));
  const wsPatents = XLSX.utils.json_to_sheet(patentRows.length > 0 ? patentRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsPatents, 'Patents');

  // 12. Copyrights
  const copyrightRows = (profile.copyrights || []).map((cpy) => ({
    'Copyright Title': cpy.title,
    'Status (Registered / Pending)': cpy.status,
    'Registration Number': cpy.registrationNumber,
    'Copyright Owners': Array.isArray(cpy.owners) ? cpy.owners.join(', ') : cpy.owners,
    'Registration Year': cpy.year,
    'Copyright Description': cpy.description || '',
    'Content Link / URL': cpy.url || '',
  }));
  const wsCopyrights = XLSX.utils.json_to_sheet(copyrightRows.length > 0 ? copyrightRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsCopyrights, 'Copyrights');

  // Generate and download .xlsx file
  const dateStr = new Date().toISOString().split('T')[0];
  const fullFileName = `${fileNamePrefix}_${dateStr}.xlsx`;
  XLSX.writeFile(wb, fullFileName);
}

/**
 * Export an individual section as a single standalone Excel sheet (.xlsx).
 */
export function exportSingleSectionToExcel(
  profile: FacultyProfile,
  sectionKey: string,
  sectionTitle: string
) {
  const wb = XLSX.utils.book_new();
  let rows: Record<string, unknown>[] = [];

  switch (sectionKey) {
    case 'summary':
    case 'personalInfo':
    case 'personal':
      rows = [
        {
          'Full Name': profile.personalInfo?.name || '',
          'Title / Designation': profile.personalInfo?.title || '',
          'Department': profile.personalInfo?.department || '',
          'Institution / University': profile.personalInfo?.institution || '',
          'Email Address': profile.personalInfo?.email || '',
          'Phone Number': profile.personalInfo?.phone || '',
          'Office Address': profile.personalInfo?.officeAddress || '',
          'Biography / Executive Summary': profile.personalInfo?.biography || '',
          'Research Interests': Array.isArray(profile.personalInfo?.researchInterests)
            ? profile.personalInfo.researchInterests.join(', ')
            : '',
        },
      ];
      break;

    case 'education':
      rows = (profile.education || []).map((edu) => ({
        'Degree': edu.degree,
        'Field of Study': edu.field,
        'Institution / University': edu.institution,
        'Graduation Year': edu.year,
        'Grade / Marks / GPA': edu.grade || '',
        'Thesis Title': edu.thesisTitle || '',
      }));
      break;

    case 'publications':
      rows = (profile.publications || []).map((pub) => ({
        'Paper Title': pub.title,
        'Journal / Book / Venue': pub.journalName,
        'Publication Year': pub.year,
        'Authors': Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors,
        'Category / Type': (pub as unknown as Record<string, unknown>).category as string || '',
        'DOI': pub.doi || '',
        'Volume': pub.volume || '',
        'Issue': pub.issue || '',
        'Pages': pub.pages || '',
        'Document URL': (pub as unknown as Record<string, unknown>).journalUrl as string || pub.doi || '',
      }));
      break;

    case 'projects':
      rows = (profile.fundedProjects || []).map((proj) => ({
        'Project Title': proj.title,
        'Funding Agency': proj.fundingAgency,
        'Role (PI / Co-PI)': proj.role,
        'Amount / Sanctioned Budget': proj.amount,
        'Start Date': proj.startDate,
        'End Date': proj.endDate,
        'Description': proj.description || '',
      }));
      break;

    case 'awards':
      rows = (profile.awardsReceived || []).map((award) => ({
        'Award Title': award.title,
        'Awarding Body': award.awardingBody,
        'Year': award.year,
        'Description': award.description || '',
      }));
      break;

    case 'conferences':
      rows = (profile.conferencesAttended || []).map((conf) => ({
        'Conference Title': conf.title,
        'Paper Title': conf.paperTitle || '',
        'Role': conf.role || 'Presenter',
        'Location': conf.location || '',
        'Date': conf.date,
      }));
      break;

    case 'workshops':
      rows = [
        ...(profile.workshopsAttended || []).map((w) => ({ ...w, type: 'Attended' })),
        ...(profile.workshopsConducted || []).map((w) => ({ ...w, type: 'Conducted' })),
      ].map((ws) => ({
        'Workshop Name': ws.title,
        'Workshop Type': ws.type,
        'Organization Name': ws.organizerName || ws.organizedBy || '',
        'Organization Address': ws.organizerAddress || ws.location || '',
        'Type of Organization': ws.organizationType || '',
        'Topic / Theme': ws.topic || '',
        'Mode': ws.mode || 'Offline',
        'Start Date': ws.startDate,
        'End Date': ws.endDate,
        'Description': ws.description || '',
        'Certificate Proof': ws.documentProofName || '',
      }));
      break;

    case 'seminars':
      rows = (profile.seminars || []).map((sem) => ({
        'Seminar Title': sem.title,
        'Level': sem.level,
        'Organization Name': sem.organizerName || sem.organizedBy || '',
        'Organization Address': sem.organizerAddress || '',
        'Type of Organization': sem.organizationType || '',
        'Topic / Theme': sem.topic || '',
        'Mode': sem.mode,
        'Start Date': sem.startDate,
        'End Date': sem.endDate || '',
        'Description': sem.description || '',
        'Certificate Proof': sem.documentProofName || '',
      }));
      break;

    case 'scholars':
      rows = (profile.phdScholars || []).map((sch) => ({
        'Scholar Name': sch.scholarName,
        'Thesis Title': sch.thesisTitle,
        'Role': sch.role,
        'Status': sch.status,
        'Joining Year': sch.joiningYear,
        'Completion Year': sch.completionYear || '',
      }));
      break;

    case 'roles':
      rows = [
        ...(profile.resourcePersonRoles || []).map((rpr) => ({
          'Category': 'Resource Person',
          'Title': rpr.eventTitle,
          'Topic': rpr.topic,
          'Organization': rpr.organizedBy,
          'Date': rpr.date,
        })),
        ...(profile.externalExaminerRoles || []).map((eer) => ({
          'Category': 'External Examiner',
          'Title': `External Examiner — ${eer.roleType}`,
          'Topic': eer.department,
          'Organization': eer.university,
          'Date': eer.year,
        })),
      ];
      break;

    case 'patents':
      rows = (profile.patents || []).map((pat) => ({
        'Patent Title': pat.title,
        'Status': pat.status,
        'Inventors': Array.isArray(pat.inventors) ? pat.inventors.join(', ') : pat.inventors,
        'App Number': pat.applicationNumber,
        'Patent Number': pat.patentNumber || '',
        'Country': pat.country,
        'Filing Date': pat.filingDate,
        'Grant Date': pat.grantDate || '',
        'Description': pat.description || '',
        'URL Link': pat.url || '',
      }));
      break;

    case 'copyrights':
      rows = (profile.copyrights || []).map((cpy) => ({
        'Copyright Title': cpy.title,
        'Status': cpy.status,
        'Registration Number': cpy.registrationNumber,
        'Owners': Array.isArray(cpy.owners) ? cpy.owners.join(', ') : cpy.owners,
        'Year': cpy.year,
        'Description': cpy.description || '',
        'URL Link': cpy.url || '',
      }));
      break;

    default:
      rows = [{}];
  }

  const ws = XLSX.utils.json_to_sheet(rows.length > 0 ? rows : [{}]);
  const sheetName = sectionTitle.slice(0, 31);
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  const cleanName = sectionTitle.replace(/[^a-zA-Z0-9]/g, '_');
  const dateStr = new Date().toISOString().split('T')[0];
  XLSX.writeFile(wb, `${cleanName}_Data_${dateStr}.xlsx`);
}
