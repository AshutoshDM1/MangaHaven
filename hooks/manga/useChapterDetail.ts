import { useQuery } from '@tanstack/react-query';
import { fetchChapterById } from '@/services/manga.services';

/**
 * Hook to fetch chapter details by manga ID and chapter ID
 */
export const useChapterDetail = (mangaId: number, chapterId: number) => {
  const query = useQuery({
    queryKey: ['manga', 'chapter', mangaId, chapterId],
    queryFn: () => fetchChapterById(mangaId, chapterId),
    enabled: !!mangaId && !!chapterId,
  });

  return query;
};

