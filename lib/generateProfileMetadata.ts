import type { Metadata } from 'next';
import { FacultyProfile } from '../types/faculty';
import { profile as fallbackProfile } from '../data/profile';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scholarcv.vercel.app';

export function createProfileMetadata(
  profileData?: FacultyProfile | null,
  canonicalPath: string = '/'
): Metadata {
  const profile = profileData || fallbackProfile;
  const personal = profile.personalInfo;

  const title = `${personal.name} — ${personal.title}`;
  const description = (personal.biography || `${personal.department} · ${personal.institution}`).trim();

  const rawImage = personal.avatarUrl || '/Profile_Picture.png';
  const imageUrl = rawImage.startsWith('http')
    ? rawImage
    : `${SITE_URL.replace(/\/$/, '')}${rawImage.startsWith('/') ? '' : '/'}${rawImage}`;

  const canonicalUrl = `${SITE_URL.replace(/\/$/, '')}${canonicalPath.startsWith('/') ? '' : '/'}${canonicalPath}`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'ScholarCV',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 800,
          alt: personal.name,
        },
      ],
      type: 'profile',
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
  };
}
