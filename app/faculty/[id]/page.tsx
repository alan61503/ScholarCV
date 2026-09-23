import type { Metadata } from 'next';
import { getCloudProfile } from '../../../lib/profileService';
import { createProfileMetadata } from '../../../lib/generateProfileMetadata';
import HomeClient from '../../../components/HomeClient';

interface FacultyPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: FacultyPageProps): Promise<Metadata> {
  const { id } = await params;
  const profile = await getCloudProfile(id);
  return createProfileMetadata(profile, `/faculty/${id}`);
}

export default async function FacultyPage({ params }: FacultyPageProps) {
  const { id } = await params;
  const initialData = await getCloudProfile(id);
  return <HomeClient initialProfile={initialData} profileId={id} />;
}
