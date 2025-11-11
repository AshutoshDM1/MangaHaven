import { Suspense } from 'react';
import AddManga from '@/modules/Admin/AddManga/AddManga';
import { generateMetadata } from '@/lib/MetaData';

export const metadata = generateMetadata('Admin - Add Manga', '/admin/addmanga');

export default function Page() {
  return (
    <Suspense>
      <AddManga />
    </Suspense>
  );
}


