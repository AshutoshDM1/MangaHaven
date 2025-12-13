import Link from 'next/link';
import type { MangaSearchResult } from '@/services/apiv2';
import type { MangaChapter } from '@/types/manga.type';

interface BreadCrumbProps {
  manga: MangaSearchResult | null;
  currentChapter: MangaChapter | null;
  mangaSlug: string;
}

const BreadCrumb = ({ manga, currentChapter, mangaSlug }: BreadCrumbProps) => {
  return (
    <div className="block lg:hidden w-full px-4 py-3 bg-black border-b border-gray-200 dark:border-gray-700">
      <nav className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <Link href="/" className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          href={`/read/${mangaSlug}`}
          className="hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
        >
          {manga?.title || 'Manga'}
        </Link>
        <span>/</span>
        <span className="text-gray-900 dark:text-gray-100 font-medium">
          Chapter {currentChapter?.chapterNumber || '...'}
        </span>
      </nav>
    </div>
  );
};

export default BreadCrumb;
