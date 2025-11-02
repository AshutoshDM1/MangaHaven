import { Suspense } from 'react';
import { generateMetadata } from '@/lib/MetaData';
import SearchPage from '@/modules/Search/components/Search';

export const metadata = generateMetadata('Search', '/dashboard/search');

export default function Search() {
  return (
    <Suspense>
      <SearchPage />
    </Suspense>
  );
}
