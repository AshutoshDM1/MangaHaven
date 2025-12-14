import { Suspense } from 'react';
import { generateMetadata } from '@/lib/MetaData';
import Signup from '@/modules/Signup/Signup';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export const metadata = generateMetadata('Signup', 'signup');

export default function SignupPage() {
  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
}
