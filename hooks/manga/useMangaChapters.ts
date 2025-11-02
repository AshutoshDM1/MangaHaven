import { useQuery } from '@tanstack/react-query';
import { fetchMangaChapters } from '@/services/manga.services';

export const useMangaChapters = (mangaId: number) => {
  const query = useQuery({
    queryKey: ['manga', 'chapters', mangaId],
    queryFn: () => fetchMangaChapters(mangaId),
    enabled: !!mangaId,
  });

  return query;
};

