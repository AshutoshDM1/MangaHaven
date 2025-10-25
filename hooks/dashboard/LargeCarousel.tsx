import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { apiV2, MangaSearchResult } from '@/services/apiv2';
import useLargeCarouselStore from '@/state/LargeCarousel/LargeCrousel';

const fetchMangaByCategory = async (categoryId: number): Promise<MangaSearchResult[]> => {
  const response = await apiV2().get<MangaSearchResult[]>(
    `/manga/addmanga?categoryId=${categoryId}`
  );
  return response.data;
};

export const useLargeCarousel = (categoryId: number) => {
  const { setLargeCarousel } = useLargeCarouselStore();

  const query = useQuery({
    queryKey: ['manga', 'category', categoryId],
    queryFn: () => fetchMangaByCategory(categoryId),
    enabled: !!categoryId,
  });

  // Sync React Query data with Zustand store
  useEffect(() => {
    if (query.data) {
      setLargeCarousel(query.data);
    }
  }, [query.data, setLargeCarousel]);

  return query;
};
