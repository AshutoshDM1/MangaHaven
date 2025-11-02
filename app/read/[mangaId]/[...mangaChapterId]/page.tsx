import { Suspense } from 'react';
import SingleRead from '@/modules/SingleRead/SingleRead';
import { generateMangaMetadata } from '@/lib/mangaMetadata';

interface SingleChapterReadPageProps {
  params: {
    mangaId: string;
    mangaChapterId: string[];
  };
}

export async function generateMetadata({ params }: SingleChapterReadPageProps) {
  // Extract the chapter ID from the dynamic route (it's an array due to catch-all route)
  const chapterId = params.mangaChapterId[0];
  return generateMangaMetadata({
    mangaId: params.mangaId,
    chapterId: chapterId,
  });
}

export default function SingleChapterReadPage({ params }: SingleChapterReadPageProps) {
  return (
    <Suspense>
      <SingleRead />
    </Suspense>
  );
}