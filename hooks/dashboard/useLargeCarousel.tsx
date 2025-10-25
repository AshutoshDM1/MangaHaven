import { fetchMangaByCategory } from '@/services/dashboard.services';
import { useQuery } from '@tanstack/react-query';

export const useLargeCarousel = (categoryId: number) => {

  const query = useQuery({
    queryKey: ['manga', 'category', categoryId],
    queryFn: () => fetchMangaByCategory(categoryId),
    enabled: !!categoryId,
  });

  return query;
};
