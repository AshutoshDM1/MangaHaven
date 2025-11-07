import { Category, Manga } from "@prisma/client";
import { MangaSearchResult } from "@/services/apiv2";

export type { Manga } from "@prisma/client";

export type MangaData = {
  title: string;
  description: string;
  totalAvailableChapter: number;
  genres: string;
  coverImageUrl: string;
};

export type ChapterData = {
  mangaId: number | null;
  mangaTitle: string;
  chapterNumber: number;
  chapterTitle: string;
};

export type CategoryWithManga = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  mangas: Manga[];
};

export type User = {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  image: string | null;
};

export type AddMangaFormProps = {
  mangaData: MangaData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onCoverChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCoverUpload: () => void;
  onSubmit: () => void;
  mangaCover: File | null;
  ableToSubmit: boolean;
  isSubmitting: boolean;
};

export type AddChapterFormProps = {
  chapterData: ChapterData;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onImagesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
  selectedFiles: FileList | null;
  ableToSubmit: boolean;
  isSubmitting: boolean;
  onMangaSelect: (manga: MangaSearchResult) => void;
};

export type CategoryFormProps = {
  name: string;
  onNameChange: (value: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
};

export type CategoryTableProps = {
  categories: CategoryWithManga[];
  onOpenDialog: (category: Category) => void;
  onOpenManageDialog: (category: CategoryWithManga) => void;
};

export type AddMangaToCategoryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: Category | null;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchResults: MangaSearchResult[];
  isSearching: boolean;
  selectedManga: MangaSearchResult[];
  onSelectManga: (manga: MangaSearchResult) => void;
  onRemoveManga: (mangaId: number) => void;
  onAddManga: () => void;
  isLoading: boolean;
};

export type ManageCategoryDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  selectedCategory: Category | null;
  currentCategoryManga: Manga[];
  onRemoveManga: (mangaId: number) => void;
  isLoading: boolean;
};

export type UsersTableProps = {
  users: User[];
  loading: boolean;
  searchTerm: string;
  onSearchChange: (value: string) => void;
};

export type UserRowProps = {
  user: User;
};
