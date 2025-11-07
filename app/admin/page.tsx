import { Suspense } from 'react';
import Admin from '@/modules/Admin/Admin';
import { generateMetadata } from '@/lib/MetaData';

export const metadata = generateMetadata('Admin', '/admin');

export default function AdminPage() {
  return (
    <Suspense>
      <Admin />
    </Suspense>
  );
}
