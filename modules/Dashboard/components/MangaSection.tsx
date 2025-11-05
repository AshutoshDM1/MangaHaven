import Image from 'next/image';
import { motion } from 'framer-motion';
import { useMangaSection } from '@/hooks/dashboard/useMangaSection';
import { MangaSearchResult } from '@/services/apiv2';
import MangaSectionSkeleton from '../skeleton/MangaSectionSkeleton';
import Link from 'next/link';

const MangaSection = () => {
  const { data, isLoading } = useMangaSection();

  return (
    <>
      <div className="w-[96%] mx-auto">
        <motion.div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8 transition-all duration-300">
          {isLoading ? (
            <MangaSectionSkeleton />
          ) : (
            data && data?.map((manga) => <MangaCard key={manga.id} manga={manga} />)
          )}
        </motion.div>
      </div>
    </>
  );
};

export default MangaSection;

const MangaCard = ({ manga }: { manga: MangaSearchResult }) => {
  return (
    <Link href={`/read/${manga.id}`}>
      <motion.div className="dark:border-[#3a3a3a] border dark:border dark:hover:bg-zinc-900 transform  bg-card rounded-lg shadow-xl overflow-hidden transition-transform h-full cursor-pointer">
        <div className="relative overflow-hidden group">
          <div className="relative">
            <Image
              src={manga.coverImageUrl}
              alt={`Manga ${manga.title}`}
              width={550}
              height={500}
              className="w-full h-[300px] group-hover:scale-105  group-hover:opacity-50 object-cover transition-all duration-500"
            />
            <div className="absolute bottom-4 right-0 flex flex-col mangas-end gap-1 transition-all duration-500 ease-in-out transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
              {manga.genres.slice(0, 3).map((genre, index) => (
                <p
                  key={`${manga.id}-${genre}`}
                  className={`text-sm text-white px-3 py-[2px] rounded-md w-fit`}
                  style={{
                    textShadow: '0 0 10px #A977E7, 0 0 10px #A977E7',
                  }}
                >
                  {genre}
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="flex mangas-center p-1 py-3">
          <h3 className="font-semibold w-full md:text-md text-sm text-center">{manga.title}</h3>
        </div>
      </motion.div>
    </Link>
  );
};
