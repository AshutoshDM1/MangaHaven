import { useState, useEffect } from 'react';
import { getAllManga } from '@/services/apiv2';
import { type Manga } from '../types/Admin';

export const useAdminManga = (
  openDelete: boolean,
  openEdit: boolean,
  openView: boolean
) => {
  const [loading, setLoading] = useState(true);
  const [manga, setManga] = useState<Manga[]>([]);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [mangaData, setMangaData] = useState<Manga>({
    id: 0,  
    slug: null,
    title: "",
    description: "",
    genres: [],
    totalChapter: 0,
    totalAvailableChapter: 0,
    coverImageUrl: "",
  });

  useEffect(() => {
    const fetchManga = async () => {
      const data = await getAllManga();
      setManga(data as unknown as Manga[]);
      setLoading(false);
    };
    fetchManga();
  }, [openDelete, openEdit, openView]);

  return {
    loading,
    setLoading,
    manga,
    setManga,
    isEdit,
    setIsEdit,
    mangaData,
    setMangaData,
  };
};

