import { Suspense } from 'react';
import Users from '@/modules/Admin/Users/Users';
import { generateMetadata } from '@/lib/MetaData';

export const metadata = generateMetadata('Admin', '/admin');

export default function AdminPage() {
  return (
    <Suspense>
      <Users />
    </Suspense>
  );
}
