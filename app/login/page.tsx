import { Suspense } from 'react';
import { generateMetadata } from '@/lib/MetaData';
import Login from '@/modules/Login/Login';

export const metadata = generateMetadata('Login', '/login');

export default function LoginPage() {
  return (
    <Suspense>
      <Login />
    </Suspense>
  );
}
