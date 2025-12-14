import { Suspense } from 'react';
import Dashboard from '@/modules/Dashboard/Dashboard';
import { generateMetadata } from '@/lib/MetaData';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export const metadata = generateMetadata('Dashboard', 'dashboard');

export default function DashboardPage() {
  return (
    <Suspense>
      <Dashboard />
    </Suspense>
  );
}
