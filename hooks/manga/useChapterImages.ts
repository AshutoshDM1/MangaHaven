import { useQuery } from '@tanstack/react-query';
import { fetchChapterImages } from '@/services/manga.services';

/**
 * Hook to fetch all images for a specific chapter
 */
export const useChapterImages = (chapterId: number) => {
  const query = useQuery({
    queryKey: ['manga', 'chapter', 'images', chapterId],
    queryFn: () => fetchChapterImages(chapterId),
    enabled: !!chapterId,
  });

  return query;
};

