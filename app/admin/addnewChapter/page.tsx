import { Suspense } from 'react';
import AddNewChapter from '@/modules/Admin/AddNewChapter/AddNewChapter';
import { generateMetadata } from '@/lib/MetaData';

export const metadata = generateMetadata('Admin - Add Chapter', '/admin/addnewChapter');

export default function Page() {
  return (
    <Suspense>
      <AddNewChapter />
    </Suspense>
  );
}


