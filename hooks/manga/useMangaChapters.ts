import { useQuery } from '@tanstack/react-query';
import { getMangaChaptersBySlug } from '@/services/apiv2';

export const useMangaChapters = (slug: string) => {
  const query = useQuery({
    queryKey: ['manga', 'chapters', slug],
    queryFn: () => getMangaChaptersBySlug(slug),
    enabled: !!slug,
  });

  return query;
};

