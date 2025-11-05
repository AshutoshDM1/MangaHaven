import { useQuery } from '@tanstack/react-query';
import { fetchMangaById } from '@/services/manga.services';

export const useMangaDetail = (mangaId: number) => {
  const query = useQuery({
    queryKey: ['manga', 'detail', mangaId],
    queryFn: () => fetchMangaById(mangaId),
    enabled: !!mangaId,
  });

  return query;
};

