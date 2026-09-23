import type { Metadata } from 'next';
import { getCloudProfile } from '../lib/profileService';
import { createProfileMetadata } from '../lib/generateProfileMetadata';
import HomeClient from '../components/HomeClient';

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getCloudProfile();
  return createProfileMetadata(profile, '/');
}

export default async function Page() {
  const initialData = await getCloudProfile();
  return <HomeClient initialProfile={initialData} profileId="default" />;
}
