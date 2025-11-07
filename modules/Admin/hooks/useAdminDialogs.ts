import { useState } from 'react';

export const useAdminDialogs = () => {
  const [openEdit, setOpenEdit] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openMangaChapter, setOpenMangaChapter] = useState<boolean>(false);

  return {
    openEdit,
    setOpenEdit,
    openView,
    setOpenView,
    openDelete,
    setOpenDelete,
    openMangaChapter,
    setOpenMangaChapter,
  };
};

