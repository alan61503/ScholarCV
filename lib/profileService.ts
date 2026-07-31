import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';
import { FacultyProfile } from '../types/faculty';
import { mockFacultyProfiles } from '../data/mockFaculty';

const PROFILE_DOC_PATH = 'default';
const COLLECTION_NAME = 'profiles';

const defaultProfile: FacultyProfile = mockFacultyProfiles[0];

// Fetches the live profile from Cloud Firestore, seeding it if missing
export async function getCloudProfile(): Promise<FacultyProfile> {
  try {
    const docRef = doc(db, COLLECTION_NAME, PROFILE_DOC_PATH);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as FacultyProfile;
    } else {
      // Seed default profile into Firestore
      await setDoc(docRef, defaultProfile);
      return defaultProfile;
    }
  } catch (error) {
    console.warn('Firebase fetch error, falling back to local profile:', error);
    return defaultProfile;
  }
}

// Saves updated profile to Cloud Firestore live
export async function saveCloudProfile(profile: FacultyProfile): Promise<boolean> {
  try {
    const docRef = doc(db, COLLECTION_NAME, PROFILE_DOC_PATH);
    await setDoc(docRef, profile, { merge: true });
    return true;
  } catch (error) {
    console.error('Failed to save profile to Cloud Firestore:', error);
    throw error;
  }
}

// Subscribes to real-time updates from Cloud Firestore
export function subscribeToCloudProfile(onUpdate: (profile: FacultyProfile) => void): () => void {
  try {
    const docRef = doc(db, COLLECTION_NAME, PROFILE_DOC_PATH);
    return onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          onUpdate(docSnap.data() as FacultyProfile);
        } else {
          // Seed if missing
          setDoc(docRef, defaultProfile);
          onUpdate(defaultProfile);
        }
      },
      (error) => {
        console.warn('Firestore subscription fallback:', error);
        onUpdate(defaultProfile);
      }
    );
  } catch (err) {
    console.warn('Firestore subscription failed:', err);
    onUpdate(defaultProfile);
    return () => {};
  }
}
