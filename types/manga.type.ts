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