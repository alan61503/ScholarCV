import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { FacultyProfile } from '../types/faculty';
import { mockFacultyProfiles } from '../data/mockFaculty';

const PROFILE_DOC_PATH = 'default';
const COLLECTION_NAME = 'profiles';

const defaultProfile: FacultyProfile = mockFacultyProfiles[0];

const timeout = <T>(ms: number, fallbackValue: T): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(fallbackValue), ms));

// Fetches the live profile from Cloud Firestore, seeding it if missing
export async function getCloudProfile(id: string = 'default'): Promise<FacultyProfile> {
  try {
    const docPath = !id || id === 'default' ? PROFILE_DOC_PATH : id;
    const docRef = doc(db, COLLECTION_NAME, docPath);
    const fetchPromise = getDoc(docRef).then((snap) => {
      if (snap.exists()) {
        return snap.data() as FacultyProfile;
      }
      const matched = mockFacultyProfiles.find(
        (p) => p.id === id || p.personalInfo.name.toLowerCase().includes(id.toLowerCase().replace(/-/g, ' '))
      );
      return matched || defaultProfile;
    });

    return await Promise.race([fetchPromise, timeout(3000, defaultProfile)]);
  } catch (error) {
    console.warn('Firebase fetch error, falling back to local profile:', error);
    const matched = mockFacultyProfiles.find(
      (p) => p.id === id || p.personalInfo.name.toLowerCase().includes(id.toLowerCase().replace(/-/g, ' '))
    );
    return matched || defaultProfile;
  }
}

// Saves updated profile to Cloud Firestore live with timeout safety
export async function saveCloudProfile(profile: FacultyProfile, id: string = 'default'): Promise<boolean> {
  try {
    const docPath = !id || id === 'default' ? PROFILE_DOC_PATH : id;
    const docRef = doc(db, COLLECTION_NAME, docPath);
    const savePromise = setDoc(docRef, profile, { merge: true }).then(() => true);
    const result = await Promise.race([savePromise, timeout(2500, false)]);
    return result;
  } catch (error) {
    console.error('Failed to save profile to Cloud Firestore:', error);
    return false;
  }
}

// Subscribes to real-time updates from Cloud Firestore
export function subscribeToCloudProfile(
  onUpdate: (profile: FacultyProfile) => void,
  id: string = 'default'
): () => void {
  try {
    const docPath = !id || id === 'default' ? PROFILE_DOC_PATH : id;
    const docRef = doc(db, COLLECTION_NAME, docPath);
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onUpdate(docSnap.data() as FacultyProfile);
        }
      },
      (error) => {
        console.warn('Firestore subscription fallback:', error);
        const matched = mockFacultyProfiles.find(
          (p) => p.id === id || p.personalInfo.name.toLowerCase().includes(id.toLowerCase().replace(/-/g, ' '))
        );
        onUpdate(matched || defaultProfile);
      }
    );
  } catch (err) {
    console.warn('Firestore subscription failed:', err);
    const matched = mockFacultyProfiles.find(
      (p) => p.id === id || p.personalInfo.name.toLowerCase().includes(id.toLowerCase().replace(/-/g, ' '))
    );
    onUpdate(matched || defaultProfile);
    return () => {};
  }
}
