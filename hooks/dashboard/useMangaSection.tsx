import { getAllManga } from '@/services/apiv2';
import { useQuery } from '@tanstack/react-query';

export const useMangaSection = () => {
  const query = useQuery({
    queryKey: ['manga', 'Section'],
    queryFn: () => getAllManga(),
  });

  return query;
};
