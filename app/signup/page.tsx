import { Suspense } from 'react';
import { generateMetadata } from '@/lib/MetaData';
import Signup from '@/modules/Signup/Signup';

export const metadata = generateMetadata('Signup', '/signup');

export default function SignupPage() {
  return (
    <Suspense>
      <Signup />
    </Suspense>
  );
}
