import { useQuery } from '@tanstack/react-query';
import { getMangaBySlug } from '@/services/apiv2';

export const useMangaDetail = (slug: string) => {
  const query = useQuery({
    queryKey: ['manga', 'detail', slug],
    queryFn: () => getMangaBySlug(slug),
    enabled: !!slug,
  });

  return query;
};

