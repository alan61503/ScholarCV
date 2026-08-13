import * as XLSX from 'xlsx';
import { FacultyProfile } from '../types/faculty';

/**
 * Generates a master Excel workbook containing dedicated, fully-detailed worksheets
 * for each section and triggers an automatic browser file download (.xlsx).
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
      'Google Scholar URL': profile.personalInfo?.googleScholarUrl || '',
      'ORCID': profile.personalInfo?.orcid || '',
      'LinkedIn URL': profile.personalInfo?.linkedInUrl || '',
      'Personal Website URL': profile.personalInfo?.websiteUrl || '',
    },
  ];
  const wsSummary = XLSX.utils.json_to_sheet(summaryRows);
  XLSX.utils.book_append_sheet(wb, wsSummary, 'Summary');

  // 2. Education & Professional Experience & Skills
  const eduRows = (profile.education || []).map((edu) => ({
    'Record Type': 'Education',
    'Title / Position / Degree': `${edu.degree} in ${edu.field}`,
    'Affiliated Institution / Organization': edu.institution,
    'Location': '',
    'From Date / Graduation Year': edu.year,
    'To Date': edu.year,
    'Grade / GPA': edu.grade || '',
    'Details / Description': edu.thesisTitle ? `Thesis: ${edu.thesisTitle}` : '',
  }));

  const expRows = (profile.experience || []).map((exp) => ({
    'Record Type': 'Professional Experience',
    'Title / Position / Degree': exp.role,
    'Affiliated Institution / Organization': exp.organization,
    'Location': exp.location || '',
    'From Date / Graduation Year': exp.startDate,
    'To Date': exp.endDate || 'Present',
    'Grade / GPA': '',
    'Details / Description': exp.description || '',
  }));

  const skillRows = (profile.skills || []).map((skillGroup) => ({
    'Record Type': 'Area of Expertise',
    'Title / Position / Degree': skillGroup.category,
    'Affiliated Institution / Organization': '',
    'Location': '',
    'From Date / Graduation Year': '',
    'To Date': '',
    'Grade / GPA': '',
    'Details / Description': Array.isArray(skillGroup.skills) ? skillGroup.skills.join(', ') : ((skillGroup as unknown as Record<string, unknown>).items as string[] || []).join(', '),
  }));

  const combinedEduExpRows = [...eduRows, ...expRows, ...skillRows];
  const wsEduExp = XLSX.utils.json_to_sheet(combinedEduExpRows.length > 0 ? combinedEduExpRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsEduExp, 'Education & Experience');

  // 3. Publications (All detailed fields)
  const pubRows = (profile.publications || []).map((pub) => {
    const indexingAgencies = (pub.indexingEntries || []).map((e) => e.agency).join('; ');
    const quartiles = (pub.indexingEntries || []).map((e) => e.quartileOrCategory).filter(Boolean).join('; ');
    const percentiles = (pub.indexingEntries || []).map((e) => e.percentile).filter(Boolean).join('; ');
    const authorsStr = Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors;
    const authorDetailsStr = pub.authorDetails
      ? pub.authorDetails
          .map((a) => `${a.name}${a.isCorresponding ? ' (Corresponding)' : ''}${a.affiliation ? ` - ${a.affiliation}` : ''}`)
          .join('; ')
      : '';

    return {
      'Paper Title': pub.title,
      'Journal / Book / Venue Name': pub.journalName,
      'Publication Year': pub.year,
      'Authors': authorsStr,
      'Author Information / Details': pub.authorship ? `${pub.authorship} | ${authorDetailsStr}` : authorDetailsStr,
      'Article Specific Keywords': Array.isArray(pub.articleKeywords) ? pub.articleKeywords.join(', ') : pub.articleKeywords || '',
      'Subject Area': Array.isArray(pub.subjectAreas) ? pub.subjectAreas.join(', ') : pub.subjectAreas || '',
      'Full Abstract': pub.abstract || '',
      'SDG Category': pub.sdgCategory || '',
      'Language': pub.language || '',
      'Publishing Type / Medium': pub.medium || pub.type || '',
      'Date of Submission': pub.dateOfSubmission || '',
      'Date of Revision': pub.dateOfRevision || '',
      'Date of Publication': pub.dateOfPublication || pub.year,
      'ISSN Number': pub.issn || '',
      'Publisher Name': pub.publisherName || '',
      'Publisher Address': pub.publisherAddress || '',
      'Indexing Agency': indexingAgencies,
      'Quartile / ABDC / IF Category': quartiles,
      'Journal Percentile': percentiles,
      'Peer Review Status': pub.peerReviewStatus || '',
      'Scope': pub.scope || '',
      'DOI': pub.doi || '',
      'Volume': pub.volume || '',
      'Issue': pub.issue || '',
      'Pages': pub.pages || '',
      'Documentation Proof': pub.documentProofName || pub.journalUrl || pub.doi || '',
    };
  });
  const wsPub = XLSX.utils.json_to_sheet(pubRows.length > 0 ? pubRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsPub, 'Publications');

  // 4. Projects & Grants
  const projRows = (profile.fundedProjects || []).map((proj) => ({
    'Type': 'Funded Research Project',
    'Title': proj.title,
    'Agency / Sponsor': proj.fundingAgency,
    'Role (PI / Co-PI)': proj.role,
    'Amount / Budget': proj.amount,
    'Start Date / Year': proj.startDate,
    'End Date': proj.endDate,
    'Status': proj.status || '',
    'Description': proj.description || '',
  }));
  const grantRows = (profile.grantsReceived || []).map((grant) => ({
    'Type': 'Grant Received',
    'Title': grant.title,
    'Agency / Sponsor': grant.agency,
    'Role (PI / Co-PI)': 'Recipient',
    'Amount / Budget': grant.amount,
    'Start Date / Year': grant.year,
    'End Date': grant.year,
    'Status': 'Awarded',
    'Description': grant.purpose || '',
  }));
  const combinedProjects = [...projRows, ...grantRows];
  const wsProjects = XLSX.utils.json_to_sheet(combinedProjects.length > 0 ? combinedProjects : [{}]);
  XLSX.utils.book_append_sheet(wb, wsProjects, 'Projects & Grants');

  // 5. Academic Achievements & Awards
  const awardRows = (profile.awardsReceived || []).map((award) => ({
    'Category': 'Honors & Award',
    'Title': award.title,
    'Awarding Body / Organization': award.awardingBody,
    'Date / Year': award.year,
    'Description': award.description || '',
  }));
  const achRows = (profile.academicAchievements || []).map((ach) => ({
    'Category': 'Academic Achievement',
    'Title': ach.title,
    'Awarding Body / Organization': '',
    'Date / Year': ach.date,
    'Description': ach.description || '',
  }));
  const combinedAchievements = [...awardRows, ...achRows];
  const wsAchievements = XLSX.utils.json_to_sheet(combinedAchievements.length > 0 ? combinedAchievements : [{}]);
  XLSX.utils.book_append_sheet(wb, wsAchievements, 'Academic Achievements & Awards');

  // 6. Conferences
  const confRows = (profile.conferencesAttended || []).map((conf) => ({
    'Conference Title': conf.title,
    'Paper Title': conf.paperTitle || '',
    'Role (Presenter / Chair / Keynote)': conf.role || 'Presenter',
    'Location / Venue': conf.location || '',
    'Date / Date Range': conf.date,
  }));
  const wsConf = XLSX.utils.json_to_sheet(confRows.length > 0 ? confRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsConf, 'Conferences');

  // 7. Workshops
  const wsAttended = (profile.workshopsAttended || []).map((w) => ({ ...w, type: 'Attended' }));
  const wsConducted = (profile.workshopsConducted || []).map((w) => ({ ...w, type: 'Conducted' }));
  const allWorkshops = [...wsAttended, ...wsConducted];
  const workshopRows = allWorkshops.map((ws) => ({
    'Workshop Name': ws.title,
    'Workshop Type (Attended / Conducted)': ws.type || 'Attended',
    'Organization Name': ws.organizerName || ws.organizedBy || '',
    'Organization Address': ws.organizerAddress || ws.location || '',
    'Type of Organization': ws.organizationType || '',
    'Topic / Theme': ws.topic || '',
    'Mode of Session': ws.mode || 'Offline',
    'Start Date': ws.startDate,
    'End Date': ws.endDate,
    'Description & Key Learnings': ws.description || '',
    'Document Proof': ws.documentProofName || '',
  }));
  const wsWorkshops = XLSX.utils.json_to_sheet(workshopRows.length > 0 ? workshopRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsWorkshops, 'Workshops');

  // 8. Seminars
  const seminarRows = (profile.seminars || []).map((sem) => ({
    'Seminar Title': sem.title,
    'Organization Name': sem.organizerName || sem.organizedBy || '',
    'Organization Address': sem.organizerAddress || '',
    'Type of Organization': sem.organizationType || '',
    'Topic / Theme': sem.topic || '',
    'Level': sem.level,
    'Mode of Session': sem.mode,
    'Start Date': sem.startDate,
    'End Date': sem.endDate || sem.startDate,
    'Description': sem.description || '',
    'Document Proof': sem.documentProofName || '',
  }));
  const wsSeminars = XLSX.utils.json_to_sheet(seminarRows.length > 0 ? seminarRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsSeminars, 'Seminars');

  // 9. Research (Unified: PhD Scholars, Resource Person Roles, External Examiner Roles)
  const scholarRows = (profile.phdScholars || []).map((sch) => ({
    'Category': 'PhD Scholar Supervision',
    'Title / Scholar Name': sch.scholarName,
    'Topic / Thesis / Role Type': sch.thesisTitle,
    'Organization / University': 'University Research Department',
    'Supervision Role / Position': sch.role,
    'Status (Ongoing / Completed)': sch.status,
    'Joining / Start Date': sch.joiningYear,
    'Completion Date / Year': sch.completionYear || '',
  }));

  const rprRows = (profile.resourcePersonRoles || []).map((rpr) => ({
    'Category': 'Resource Person Role',
    'Title / Scholar Name': rpr.eventTitle,
    'Topic / Thesis / Role Type': rpr.topic,
    'Organization / University': rpr.organizedBy,
    'Supervision Role / Position': 'Resource Person / Keynote Speaker',
    'Status (Ongoing / Completed)': 'Completed',
    'Joining / Start Date': rpr.date,
    'Completion Date / Year': rpr.date,
  }));

  const eerRows = (profile.externalExaminerRoles || []).map((eer) => ({
    'Category': 'External Examiner Appointment',
    'Title / Scholar Name': `External Examiner — ${eer.roleType}`,
    'Topic / Thesis / Role Type': eer.department,
    'Organization / University': eer.university,
    'Supervision Role / Position': 'External Examiner',
    'Status (Ongoing / Completed)': 'Completed',
    'Joining / Start Date': eer.year,
    'Completion Date / Year': eer.year,
  }));

  const combinedResearchRows = [...scholarRows, ...rprRows, ...eerRows];
  const wsResearch = XLSX.utils.json_to_sheet(combinedResearchRows.length > 0 ? combinedResearchRows : [{}]);
  XLSX.utils.book_append_sheet(wb, wsResearch, 'Research');

  // 10. Patents
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

  // 11. Copyrights
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
      rows = [
        ...(profile.education || []).map((edu) => ({
          'Record Type': 'Education',
          'Title / Position': `${edu.degree} in ${edu.field}`,
          'Institution / Organization': edu.institution,
          'Location': '',
          'From Date': edu.year,
          'To Date': edu.year,
          'Grade / GPA': edu.grade || '',
          'Description': edu.thesisTitle ? `Thesis: ${edu.thesisTitle}` : '',
        })),
        ...(profile.experience || []).map((exp) => ({
          'Record Type': 'Professional Experience',
          'Title / Position': exp.role,
          'Institution / Organization': exp.organization,
          'Location': exp.location || '',
          'From Date': exp.startDate,
          'To Date': exp.endDate || 'Present',
          'Grade / GPA': '',
          'Description': exp.description || '',
        })),
        ...(profile.skills || []).map((sk) => ({
          'Record Type': 'Area of Expertise',
          'Title / Position': sk.category,
          'Institution / Organization': '',
          'Location': '',
          'From Date': '',
          'To Date': '',
          'Grade / GPA': '',
          'Description': Array.isArray(sk.skills) ? sk.skills.join(', ') : ((sk as unknown as Record<string, unknown>).items as string[] || []).join(', '),
        })),
      ];
      break;

    case 'publications':
      rows = (profile.publications || []).map((pub) => ({
        'Paper Title': pub.title,
        'Journal / Book / Venue Name': pub.journalName,
        'Publication Year': pub.year,
        'Authors': Array.isArray(pub.authors) ? pub.authors.join(', ') : pub.authors,
        'Article Specific Keywords': Array.isArray(pub.articleKeywords) ? pub.articleKeywords.join(', ') : pub.articleKeywords || '',
        'Subject Area': Array.isArray(pub.subjectAreas) ? pub.subjectAreas.join(', ') : pub.subjectAreas || '',
        'Full Abstract': pub.abstract || '',
        'SDG Category': pub.sdgCategory || '',
        'Language': pub.language || '',
        'Publishing Type / Medium': pub.medium || pub.type || '',
        'Author Information': pub.authorship || '',
        'Date of Submission': pub.dateOfSubmission || '',
        'Date of Revision': pub.dateOfRevision || '',
        'Date of Publication': pub.dateOfPublication || pub.year,
        'ISSN Number': pub.issn || '',
        'Publisher Name': pub.publisherName || '',
        'Publisher Address': pub.publisherAddress || '',
        'Indexing Agency': (pub.indexingEntries || []).map((e) => e.agency).join('; '),
        'Quartile / ABDC / IF Category': (pub.indexingEntries || []).map((e) => e.quartileOrCategory).filter(Boolean).join('; '),
        'Journal Percentile': (pub.indexingEntries || []).map((e) => e.percentile).filter(Boolean).join('; '),
        'Peer Review Status': pub.peerReviewStatus || '',
        'Scope': pub.scope || '',
        'Documentation Proof': pub.documentProofName || pub.journalUrl || pub.doi || '',
      }));
      break;

    case 'projects':
      rows = [
        ...(profile.fundedProjects || []).map((proj) => ({
          'Type': 'Funded Project',
          'Title': proj.title,
          'Agency': proj.fundingAgency,
          'Role': proj.role,
          'Amount': proj.amount,
          'Start Date': proj.startDate,
          'End Date': proj.endDate,
          'Description': proj.description || '',
        })),
        ...(profile.grantsReceived || []).map((g) => ({
          'Type': 'Grant Received',
          'Title': g.title,
          'Agency': g.agency,
          'Role': 'Recipient',
          'Amount': g.amount,
          'Start Date': g.year,
          'End Date': g.year,
          'Description': g.purpose || '',
        })),
      ];
      break;

    case 'awards':
      rows = [
        ...(profile.awardsReceived || []).map((award) => ({
          'Category': 'Honors & Award',
          'Title': award.title,
          'Organization / Awarding Body': award.awardingBody,
          'Date / Year': award.year,
          'Description': award.description || '',
        })),
        ...(profile.academicAchievements || []).map((ach) => ({
          'Category': 'Academic Achievement',
          'Title': ach.title,
          'Organization / Awarding Body': '',
          'Date / Year': ach.date,
          'Description': ach.description || '',
        })),
      ];
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
        'Document Proof': ws.documentProofName || '',
      }));
      break;

    case 'seminars':
      rows = (profile.seminars || []).map((sem) => ({
        'Seminar Title': sem.title,
        'Organization Name': sem.organizerName || sem.organizedBy || '',
        'Organization Address': sem.organizerAddress || '',
        'Type of Organization': sem.organizationType || '',
        'Topic / Theme': sem.topic || '',
        'Level': sem.level,
        'Mode of Session': sem.mode,
        'Start Date': sem.startDate,
        'End Date': sem.endDate || sem.startDate,
        'Description': sem.description || '',
        'Document Proof': sem.documentProofName || '',
      }));
      break;

    case 'scholars':
    case 'research':
    case 'roles':
      rows = [
        ...(profile.phdScholars || []).map((sch) => ({
          'Category': 'PhD Scholar Supervision',
          'Title / Scholar Name': sch.scholarName,
          'Topic / Thesis / Role Type': sch.thesisTitle,
          'Organization / University': 'University Research Department',
          'Role / Position': sch.role,
          'Status': sch.status,
          'Start Date / Year': sch.joiningYear,
          'Completion Year': sch.completionYear || '',
        })),
        ...(profile.resourcePersonRoles || []).map((rpr) => ({
          'Category': 'Resource Person Role',
          'Title / Scholar Name': rpr.eventTitle,
          'Topic / Thesis / Role Type': rpr.topic,
          'Organization / University': rpr.organizedBy,
          'Role / Position': 'Resource Person',
          'Status': 'Completed',
          'Start Date / Year': rpr.date,
          'Completion Year': rpr.date,
        })),
        ...(profile.externalExaminerRoles || []).map((eer) => ({
          'Category': 'External Examiner Appointment',
          'Title / Scholar Name': `External Examiner — ${eer.roleType}`,
          'Topic / Thesis / Role Type': eer.department,
          'Organization / University': eer.university,
          'Role / Position': 'External Examiner',
          'Status': 'Completed',
          'Start Date / Year': eer.year,
          'Completion Year': eer.year,
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
