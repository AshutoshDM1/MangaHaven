import { fetchMangaByCategory } from '@/services/dashboard.services';
import { useQuery } from '@tanstack/react-query';

export const useMangaCarousel = (categoryId: number) => {   

  const query = useQuery({
    queryKey: ['manga', 'carousel', categoryId],
    queryFn: () => fetchMangaByCategory(categoryId),
    enabled: !!categoryId,
  });

  return query;
};
