import { Suspense } from 'react';
import { generateMangaMetadata } from '@/lib/mangaMetadata';
import SingleMangaDetail from '@/modules/SingleManga/SingleManga';

interface SingleReadPageProps {
  params: Promise<{
    mangaId: string;
  }>;
}

export async function generateMetadata({ params }: SingleReadPageProps) {
  const { mangaId } = await params;
  return generateMangaMetadata({ mangaId });
}

export default async function SingleReadPage({ params }: SingleReadPageProps) {
  const { mangaId } = await params;
  return (
    <Suspense>
      <SingleMangaDetail slug={mangaId} />
    </Suspense>
  );
}