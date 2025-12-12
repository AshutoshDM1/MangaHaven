import { Suspense } from 'react';
import { generateMetadata } from '@/lib/MetaData';
import SearchPage from '@/modules/Search/Search';

export const dynamic = 'force-static';
export const revalidate = 86400; // 24 hours

export const metadata = generateMetadata('Search', '/dashboard/search');


export default function Search() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
