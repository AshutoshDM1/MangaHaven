import { Suspense } from 'react';
import { generateMangaMetadata } from '@/lib/mangaMetadata';
import SingleMangaDetail from '@/modules/SingleManga/SingleManga';

interface SingleReadPageProps {
  params: {
    mangaId: string;
  };
}

export async function generateMetadata({ params }: SingleReadPageProps) {
  return generateMangaMetadata({ mangaId: params.mangaId });
}

export default function SingleReadPage({ params }: SingleReadPageProps) {
  return (
    <Suspense>
      <SingleMangaDetail slug={params.mangaId} />
    </Suspense>
  );
}