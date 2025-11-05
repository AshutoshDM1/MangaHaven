export type Manga = {
  id: number;
  title: string;
  description: string;
  totalChapter: number;
  totalAvailableChapter: number;
  genres: string[];
  coverImageUrl: string;
  categoryId?: number | null;
};

export interface MangaChapter {
  id: number;
  chapterNumber: number;
  chapterTitle: string;
  mangaId: number;
  createdAt?: string;
}

export interface MangaChapterImage {
  id: number;
  imageUrl: string;
  mangaChapterId: number;
  createdAt?: string;
}