import { Suspense } from 'react';
import DownloadManga from '@/modules/Admin/DownloadManga/DownloadManga';
import { generateMetadata } from '@/lib/MetaData';

export const metadata = generateMetadata('Admin - Download Manga', '/admin/downloadmanga');

export default function Page() {
  return (
    <Suspense>
      <DownloadManga />
    </Suspense>
  );
}


