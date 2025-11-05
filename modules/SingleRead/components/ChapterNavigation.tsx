import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ChapterNavigationProps {
  previousChapterUrl: string | null;
  nextChapterUrl: string | null;
}

export const ChapterNavigation = ({
  previousChapterUrl,
  nextChapterUrl,
}: ChapterNavigationProps) => {
  return (
    <div className="w-fit md:w-full flex justify-center items-center gap-3">
      {previousChapterUrl ? (
        <Link href={previousChapterUrl} className="w-1/2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.1 }}
            className="w-full py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center cursor-pointer"
          >
            <ChevronLeft />
          </motion.div>
        </Link>
      ) : (
        <motion.div className="w-1/2 py-[5px] px-3 bg-[#8031ff]/50 rounded-md flex justify-center items-center cursor-not-allowed opacity-50">
          <ChevronLeft />
        </motion.div>
      )}

      {nextChapterUrl ? (
        <Link href={nextChapterUrl} className="w-1/2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 1.1 }}
            className="w-full py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center cursor-pointer"
          >
            <ChevronRight />
          </motion.div>
        </Link>
      ) : (
        <motion.div className="w-1/2 py-[5px] px-3 bg-[#8031ff]/50 rounded-md flex justify-center items-center cursor-not-allowed opacity-50">
          <ChevronRight />
        </motion.div>
      )}
    </div>
  );
};

