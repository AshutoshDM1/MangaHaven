import { useState, useEffect } from "react";
import { toast } from "sonner";
import { addManga, apiV2, SendMangaData } from "@/services/apiv2";
import { MangaData } from "@/modules/Admin/types/Admin";
import {
  MANGA_VALIDATION,
  MANGA_MESSAGES,
} from "@/modules/Admin/constant/validation";

export const useAddManga = () => {
  const [mangaData, setMangaData] = useState<MangaData>({
    title: "",
    description: "",
    totalAvailableChapter: 0,
    genres: "",
    coverImageUrl: "",
  });
  const [mangaCover, setMangaCover] = useState<File | null>(null);
  const [ableToSubmit, setAbleToSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    if (id === "totalAvailableChapter") {
      setMangaData((prev) => ({ ...prev, [id]: parseInt(value) }));
    } else {
      setMangaData((prev) => ({ ...prev, [id]: value }));
    }
  };

  useEffect(() => {
    if (
      mangaData.title !== "" &&
      mangaData.description !== "" &&
      mangaData.totalAvailableChapter > 0 &&
      mangaData.genres !== "" &&
      mangaData.coverImageUrl !== ""
    ) {
      setAbleToSubmit(true);
    } else {
      setAbleToSubmit(false);
    }
  }, [mangaData]);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMangaCover(e.target.files[0]);
    }
  };

  const handleCoverUpload = async () => {
    toast.loading("Uploading Manga Cover...");
    try {
      if (!mangaCover) {
        toast.error(MANGA_MESSAGES.SELECT_COVER);
        return;
      }
      const formData = new FormData();
      formData.append("file", mangaCover);
      const result = await apiV2().post("/upload/mangacover", formData);
      toast.success(MANGA_MESSAGES.UPLOAD_COVER_SUCCESS);
      setMangaData((prev) => ({ ...prev, coverImageUrl: result.data.url }));
    } catch (error) {
      toast.error(MANGA_MESSAGES.UPLOAD_COVER_ERROR);
    } finally {
      toast.dismiss();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (
        mangaData.title === "" ||
        mangaData.description === "" ||
        mangaData.totalAvailableChapter === 0 ||
        mangaData.genres === "" ||
        mangaData.coverImageUrl === ""
      ) {
        toast.error(MANGA_MESSAGES.REQUIRED_FIELDS);
        setIsSubmitting(false);
        return;
      }

      const genresArray = mangaData.genres
        .split(",")
        .map((genre) => genre.trim());

      if (
        genresArray.length < MANGA_VALIDATION.MIN_GENRES ||
        genresArray.length > MANGA_VALIDATION.MAX_GENRES
      ) {
        toast.error(MANGA_MESSAGES.GENRES_COUNT);
        setIsSubmitting(false);
        return;
      }

      if (mangaData.description.length > MANGA_VALIDATION.MAX_DESCRIPTION_LENGTH) {
        toast.error(MANGA_MESSAGES.DESCRIPTION_LENGTH);
        setIsSubmitting(false);
        return;
      }

      const sendData = {
        title: mangaData.title,
        description: mangaData.description,
        totalAvailableChapter: mangaData.totalAvailableChapter,
        genres: genresArray,
        coverImageUrl: mangaData.coverImageUrl,
      } as SendMangaData;

      const response = await addManga([sendData]);

      if (response && response.status === 201) {
        toast.success(MANGA_MESSAGES.ADD_SUCCESS, {
          description: `${mangaData.title} has been added to the library.`,
        });
        setMangaData({
          title: "",
          description: "",
          totalAvailableChapter: 0,
          genres: "",
          coverImageUrl: "",
        });
      }
      setMangaCover(null);
    } catch (error) {
      toast.error(MANGA_MESSAGES.ADD_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    mangaData,
    mangaCover,
    ableToSubmit,
    isSubmitting,
    handleInputChange,
    handleCoverChange,
    handleCoverUpload,
    handleSubmit,
  };
};

