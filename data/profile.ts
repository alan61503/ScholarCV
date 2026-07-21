import { mockFacultyProfiles } from './mockFaculty';
import { FacultyProfile } from '../types/faculty';

// This portfolio is a single-person site. All page content is driven by
// this one profile object. Update it directly, or use the private
// management form (see README) to edit fields and export new data.
export const profile: FacultyProfile = mockFacultyProfiles[0];
