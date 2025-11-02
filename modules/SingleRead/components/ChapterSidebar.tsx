import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Skeleton } from '@/components/ui/skeleton';
import { Manga, MangaChapter } from '@/types/manga.type';

interface ChapterSidebarProps {
  manga: Manga | null;
  currentChapter: MangaChapter | null;
  allChapters: MangaChapter[];
  mangaId: number;
  isLoading?: boolean;
}

export const ChapterSidebar = ({
  manga,
  currentChapter,
  allChapters,
  mangaId,
  isLoading,
}: ChapterSidebarProps) => {
  const [showChap, setShowChap] = useState(false);

  return (
    <div className="flex-wrap w-full md:w-[40vh] flex flex-row  md:flex-col justify-center md:justify-start  items-center gap-4">
      {/* Manga Cover */}
      {manga ? (
        <img
          className="object-cover h-[40vh] hidden md:block rounded-[10px]"
          src={manga.coverImageUrl}
          alt={manga.title}
        />
      ) : (
        <Skeleton className="h-[40vh] w-full hidden md:block" />
      )}

      {/* Manga Title and Chapter Title */}
      <h1 className="w-full md:w-fit text-xl font-bold text-center flex flex-col gap-2 items-center justify-center">
        {manga?.title}
        <span className="text-primary text-lg font-medium">{currentChapter?.chapterTitle}</span>
      </h1>

      {/* Chapter Selector */}
      <div className="w-fit md:w-full flex items-center justify-center relative">
        <h2
          onClick={() => setShowChap(!showChap)}
          className="w-full font-bold text-[1.2rem] md:text-[1.2rem] text-center bg-[#e9962a] py-1 rounded-md cursor-pointer px-3 select-none"
        >
          Chapter {currentChapter?.chapterNumber}
        </h2>
        {showChap && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="w-fit z-30 absolute top-10 min-h-fit rounded-md bg-[#f8b416] flex flex-col justify-center items-center gap-1 p-4 max-h-[400px] overflow-y-auto"
          >
            {allChapters.map((chapter) => (
              <Link key={chapter.id} href={`/read/${mangaId}/${chapter.id}`}>
                <motion.h1
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.1 }}
                  className="w-[8rem] z-30 font-bold text-[1.2rem] md:text-[1.2rem] text-center bg-[#e9962a] py-1 rounded-md cursor-pointer px-3 select-none"
                >
                  Chapter {chapter.chapterNumber}
                </motion.h1>
              </Link>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};
