import { Suspense } from 'react';
import AddMangaCategory from '@/modules/Admin/AddMangaCategory/AddMangaCategory';
import { generateMetadata } from '@/lib/MetaData';

export const metadata = generateMetadata('Admin - Categories', '/admin/addmangaCategory');

export default function Page() {
  return (
    <Suspense>
      <AddMangaCategory />
    </Suspense>
  );
}


