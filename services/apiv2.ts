import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const handleError = (error: any) => {
  console.error(error);
  toast.error(error.response.data.error);
};

export const apiV2 = () => {
  return axios.create({
    baseURL: `${baseUrl}/api/v2`,
  });
};

export type SendMangaData = {
  title: string;
  description: string;
  genres: string[];
  coverImageUrl: string;
  totalAvailableChapter: number;
};

export type MangaSearchResult = {
  id: number;
  title: string;
  coverImageUrl: string;
  description: string;
  totalChapter: number;
  totalAvailableChapter: number;
  genres: string[];
};

export const addManga = async (mangaData: SendMangaData[]) => {
  try {
    const response = await apiV2().post("/manga/addmanga", mangaData);
    return response;
  } catch (error) {
    return handleError(error);
  }
};

export const getAllManga = async (): Promise<MangaSearchResult[]> => {
  const response = await apiV2().get("/manga/addmanga");
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response.data;
};

export const getMangaById = async (id: number): Promise<MangaSearchResult[]> => {
  const response = await apiV2().get(`/manga/addmanga?mangaId=${id}`);
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response.data;
};

export const deleteManga = async (id: number) => {
  const response = await apiV2().delete("/manga/addmanga", { data: { id } });
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export const updateManga = async (mangaData: MangaSearchResult) => {
  const response = await apiV2().put("/manga/addmanga", mangaData);
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export const searchManga = async (
  query: string
): Promise<MangaSearchResult[]> => {
  const response = await apiV2().get(
    `/manga/search?q=${encodeURIComponent(query)}`
  );
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response.data;
};

export const searchMangaAdvanced = async (
  options: { query?: string; genre?: string }
): Promise<MangaSearchResult[]> => {
  const params = new URLSearchParams();
  if (options.query) params.append("q", options.query);
  if (options.genre) params.append("genre", options.genre);
  const response = await apiV2().get(`/manga/search?${params.toString()}`);
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response.data;
};

export type SearchFilters = {
  query?: string;
  genre?: string;
  type?: string;
  character?: string;
  page?: number;
  limit?: number;
};

export type SearchResponse = {
  data: MangaSearchResult[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  filters: {
    query: string | null;
    genre: string | null;
    type: string | null;
    character: string | null;
  };
};

export const searchMangaWithFilters = async (
  filters: SearchFilters
): Promise<SearchResponse> => {
  const params = new URLSearchParams();
  
  if (filters.query) params.append("q", filters.query);
  if (filters.genre) params.append("genre", filters.genre);
  if (filters.type) params.append("type", filters.type);
  if (filters.character) params.append("character", filters.character);
  if (filters.page) params.append("page", filters.page.toString());
  if (filters.limit) params.append("limit", filters.limit.toString());
  
  const response = await apiV2().get(`/manga/advance-search?${params.toString()}`);
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response.data;
};

export type SendMangaChapterData = {
  chapterNumber: number;
  chapterTitle: string;
  mangaId: number;
};

export const addMangaChapter = async (chapterData: SendMangaChapterData) => {
  const response = await apiV2().post("/manga/addmangachapter", chapterData);
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export type SendMangaChapterImageData = {
  imageUrl: string;
  mangaChapterId: number;
};

export const addMangaChapterImage = async (
  imageData: SendMangaChapterImageData[]
) => {
  const response = await apiV2().post("/manga/add-manga-images", imageData);
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export const getAllUsers = async () => {
  const response = await apiV2().get("/users");
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export const getMangaChapter = async (mangaId: number) => {
  const response = await apiV2().get(
    `/manga/addmangachapter?mangaId=${mangaId}`
  );
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export const getMangaChapterById = async (mangaId: number, mangaChapterId: number) => {
  const response = await apiV2().get(
    `/manga/addmangachapter?mangaId=${mangaId}&mangaChapterId=${mangaChapterId}`
  );
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export const getMangaChapterImage = async (mangaChapterId: number) => {
  const response = await apiV2().get(
    `/manga/add-manga-images?mangaChapterId=${mangaChapterId}`
  );
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};

export const deleteMangaChapter = async (mangaChapterId: number) => {
  const response = await apiV2().delete(
    `/manga/addmangachapter?mangaChapterId=${mangaChapterId}`
  );
  if (response.data.error) {
    handleError(response.data.error);
  }
  return response;
};


