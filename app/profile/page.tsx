import { Suspense } from 'react';
import { generateMetadata } from '@/lib/MetaData';
import Profile from '@/modules/Profile/Profile';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export const metadata = generateMetadata('Profile', '/profile');

export default function ProfilePage() {
  return (
    <Suspense>
      <Profile />
    </Suspense>
  );
}
