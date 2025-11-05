import { Suspense } from 'react';
import SingleRead from '@/modules/SingleRead/SingleRead';
import { generateMangaMetadata } from '@/lib/mangaMetadata';

interface SingleChapterReadPageProps {
  params: Promise<{
    mangaId: string;
    mangaChapterId: string[];
  }>;
}

export async function generateMetadata({ params }: SingleChapterReadPageProps) {
  const resolvedParams = await params;
  const chapterId = resolvedParams.mangaChapterId[0];
  return generateMangaMetadata({
    mangaId: resolvedParams.mangaId,
    chapterId: chapterId,
  });
}

export default async function SingleChapterReadPage({ params }: SingleChapterReadPageProps) {
  await params; // Ensure params is awaited
  return (
    <Suspense>
      <SingleRead />
    </Suspense>
  );
}