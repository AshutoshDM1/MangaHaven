import { apiV2 } from '@/services/apiv2';
import { Manga, MangaChapter } from '@/types/manga.type';

export const fetchMangaById = async (mangaId: number): Promise<Manga | null> => {
  try {
    const response = await apiV2().get<Manga>(`/manga/addmanga?mangaId=${mangaId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching manga by ID:', error);
    return null;
  }
};

export const fetchMangaChapters = async (mangaId: number): Promise<MangaChapter[] | []> => { 
  try {
    const response = await apiV2().get<MangaChapter[]>(
      `/manga/addmangachapter?mangaId=${mangaId}`
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching manga chapters:', error);
    return [];  
  }
};
