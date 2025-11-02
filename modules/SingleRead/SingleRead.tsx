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
import Navbar from '@/components/common/NavBar/Navbar';
import Link from 'next/link';
import BreadCrumb from './components/BreadCrumb';

const SingleRead = () => {
  const { mangaId, mangaChapterId } = useParams();
  const [isVertical, setIsVertical] = useState(true);

  // Parse IDs
  const parsedMangaId = Number(mangaId);
  const parsedChapterId = Array.isArray(mangaChapterId)
    ? Number(mangaChapterId[0])
    : Number(mangaChapterId);

  // Fetch all data using TanStack Query
  const { data: manga, isLoading: mangaLoading } = useMangaDetail(parsedMangaId);
  const { data: allChapters = [], isLoading: chaptersLoading } = useMangaChapters(parsedMangaId);
  const { data: currentChapter, isLoading: chapterLoading } = useChapterDetail(
    parsedMangaId,
    parsedChapterId
  );
  const { data: chapterImages = [], isLoading: imagesLoading } = useChapterImages(parsedChapterId);

  // Calculate navigation URLs
  const { previousChapterUrl, nextChapterUrl } = useMemo(() => {
    if (!currentChapter || allChapters.length === 0) {
      return { previousChapterUrl: null, nextChapterUrl: null };
    }

    const currentIndex = allChapters.findIndex((ch) => ch.id === currentChapter.id);

    if (currentIndex === -1) {
      return { previousChapterUrl: null, nextChapterUrl: null };
    }

    const previousChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
    const nextChapter =
      currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

    return {
      previousChapterUrl: previousChapter ? `/read/${parsedMangaId}/${previousChapter.id}` : null,
      nextChapterUrl: nextChapter ? `/read/${parsedMangaId}/${nextChapter.id}` : null,
    };
  }, [currentChapter, allChapters, parsedMangaId]);

  return (
    <>
      <div className="w-full">
        <BreadCrumb
          manga={manga || null}
          currentChapter={currentChapter || null}
          mangaId={parsedMangaId}
        />
        <div className="flex h-full justify-center overflow-hidden">
          <div className="fixed top-[75px] left-0 w-fit h-full p-3 px-5 md:pt-10 space-y-5 hidden lg:flex flex-col bg-gradient-to-r from-[#000000] to-[#363636] ">
            <ChapterSidebar
              manga={manga || null}
              currentChapter={currentChapter || null}
              allChapters={allChapters}
              mangaId={parsedMangaId}
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
              images={chapterImages}
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
