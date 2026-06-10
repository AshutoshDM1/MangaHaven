'use client';
import { useMemo } from 'react';
import { useMangaDetail } from '@/hooks/manga/useMangaDetail';
import { useMangaChapters } from '@/hooks/manga/useMangaChapters';
import {
  MangaHero,
  MangaStats,
  MangaActions,
  ChapterList,
  MangaDetailSkeleton,
} from '@/modules/SingleManga/components';
import Section from '@/components/common/Section/Section';
import { Manga } from '@prisma/client';
import { MangaSearchResult } from '@/services/apiv2';

interface SingleMangaDetailProps {
  slug: string;
}

const SingleMangaDetail = ({ slug }: SingleMangaDetailProps) => {
  const { data: mangaArray, isLoading: mangaLoading, error: mangaError } = useMangaDetail(slug);
  const { data: chaptersResponse, isLoading: chaptersLoading } = useMangaChapters(slug);

  // Extract manga from array (API returns array)
  const manga = mangaArray as unknown as Manga;
  const chapters = chaptersResponse?.data || [];

  // Calculate first chapter URL
  const firstChapterUrl = useMemo(() => {
    if (chapters.length > 0 && manga?.slug) {
      return `/read/${manga.slug}/${chapters[0].id}`;
    }
    return null;
  }, [chapters, manga?.slug]);

  if (mangaLoading) {
    return <MangaDetailSkeleton />;
  }

  if (mangaError || !manga) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Manga Not Found</h1>
          <p className="text-muted-foreground">
            {"The manga you're looking for doesn't exist or has been removed."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <Section className='py-6'>
      <MangaHero manga={manga as unknown as MangaSearchResult } />
      <MangaStats totalChapters={manga.totalChapter} /> 
      <MangaActions firstChapterUrl={firstChapterUrl} hasChapters={chapters.length > 0} />
      <ChapterList chapters={chapters} mangaSlug={manga.slug} isLoading={chaptersLoading} />
    </Section>
  );
};

export default SingleMangaDetail;
