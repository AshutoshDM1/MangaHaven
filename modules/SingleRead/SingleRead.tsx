'use client';
import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { useMangaDetail } from '@/hooks/manga/useMangaDetail';
import { useMangaChapters } from '@/hooks/manga/useMangaChapters';
import { useChapterDetail } from '@/hooks/manga/useChapterDetail';
import { useChapterImages } from '@/hooks/manga/useChapterImages';
import {
  ChapterSidebar,
  ChapterNavigation,
  ViewModeToggle,
  ChapterImageViewer,
} from '@/modules/SingleRead/components';
import BreadCrumb from './components/BreadCrumb';
import type { MangaSearchResult } from '@/services/apiv2';
import type { MangaChapter, MangaChapterImage } from '@/types/manga.type';

const SingleRead = () => {
  const { mangaId, mangaChapterId } = useParams();
  const [isVertical, setIsVertical] = useState(true);

  // Parse IDs
  const parsedMangaSlug = mangaId as string;
  const parsedChapterId = Array.isArray(mangaChapterId)
    ? Number(mangaChapterId[0])
    : Number(mangaChapterId);

  // Fetch all data using TanStack Query
  const { data: mangaArray, isLoading: mangaLoading } = useMangaDetail(parsedMangaSlug);
  const { data: chaptersResponse, isLoading: chaptersLoading } = useMangaChapters(parsedMangaSlug);
  const { data: currentChapter, isLoading: chapterLoading } = useChapterDetail(
    mangaArray?.[0]?.id || 0,
    parsedChapterId
  );
  const { data: chapterImages = [], isLoading: imagesLoading } = useChapterImages(parsedChapterId);

  // Extract data from responses
  const manga = mangaArray as unknown as MangaSearchResult;
  const allChapters = chaptersResponse?.data || [];

  // Calculate navigation URLs
  const { previousChapterUrl, nextChapterUrl } = useMemo(() => {
    if (!currentChapter || allChapters.length === 0 || !manga?.slug) {
      return { previousChapterUrl: null, nextChapterUrl: null };
    }

    const currentIndex = allChapters.findIndex((ch : any) => ch.id === currentChapter.id);

    if (currentIndex === -1) {
      return { previousChapterUrl: null, nextChapterUrl: null };
    }

    const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter = currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

    return {
      previousChapterUrl: previousChapter ? `/read/${manga.slug}/${previousChapter.id}` : null,
      nextChapterUrl: nextChapter ? `/read/${manga.slug}/${nextChapter.id}` : null,
    };
  }, [currentChapter, allChapters, manga?.slug]);

  return (
    <>
      <div className="w-full">
        <BreadCrumb
          manga={manga || null}
          currentChapter={currentChapter || null}
          mangaSlug={parsedMangaSlug}
        />
        <div className="flex h-full justify-center overflow-hidden">
          <div className="fixed top-[75px] left-0 w-fit h-full p-3 px-5 md:pt-10 space-y-5 hidden lg:flex flex-col bg-gradient-to-r from-[#000000] to-[#363636] ">
            <ChapterSidebar
              manga={manga || null}
              currentChapter={currentChapter || null}
              allChapters={allChapters}
              mangaSlug={parsedMangaSlug}
              isLoading={mangaLoading || chapterLoading}
            />
            <ChapterNavigation
              previousChapterUrl={previousChapterUrl}
              nextChapterUrl={nextChapterUrl}
            />
            <ViewModeToggle isVertical={isVertical} onToggle={setIsVertical} />
          </div>
          <div className="w-fit h-full relative left-0 lg:left-60">
            <ChapterImageViewer
              images={chapterImages as MangaChapterImage[]}
              isVertical={isVertical}
              isLoading={imagesLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleRead;
