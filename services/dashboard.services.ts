import { apiV2, MangaSearchResult } from '@/services/apiv2';

export const fetchMangaByCategory = async (categoryId: number): Promise<MangaSearchResult[]> => {
  const response = await apiV2().get<MangaSearchResult[]>(
    `/manga/addmanga?categoryId=${categoryId}`
  );
  return response.data;
};
