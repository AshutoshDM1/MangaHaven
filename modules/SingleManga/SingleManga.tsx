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

interface SingleMangaDetailProps {
  slug: string;
}

const SingleMangaDetail = ({ slug }: SingleMangaDetailProps) => {
  const mangaId = Number(slug);

  const { data: manga, isLoading: mangaLoading, error: mangaError } = useMangaDetail(mangaId);
  const { data: chapters = [], isLoading: chaptersLoading } = useMangaChapters(mangaId);

  const firstChapterUrl = useMemo(
    () => (chapters.length > 0 ? `/read/${mangaId}/${chapters[0].id}` : null),
    [chapters, mangaId]
  );

  if (mangaLoading) {
    return <MangaDetailSkeleton />;
  }

  if (mangaError || !manga) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Manga Not Found</h1>
          <p className="text-muted-foreground">
            The manga you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Section className='py-6' >
      <MangaHero manga={manga} />
      <MangaStats totalChapters={manga.totalChapter} />
      <MangaActions firstChapterUrl={firstChapterUrl} hasChapters={chapters.length > 0} />
      <ChapterList chapters={chapters} mangaId={mangaId} isLoading={chaptersLoading} />
    </Section>
  );
};

export default SingleMangaDetail;
