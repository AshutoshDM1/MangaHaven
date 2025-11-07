import { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  addMangaChapter,
  addMangaChapterImage,
  apiV2,
  MangaSearchResult,
} from "@/services/apiv2";
import { ChapterData } from "@/modules/Admin/types/Admin";
import {
  MANGA_VALIDATION,
  CHAPTER_MESSAGES,
} from "@/modules/Admin/constant/validation";

export const useAddChapter = () => {
  const [selectedManga, setSelectedManga] = useState<MangaSearchResult | null>(
    null
  );
  const [chapterData, setChapterData] = useState<ChapterData>({
    mangaId: null,
    mangaTitle: "",
    chapterNumber: 1,
    chapterTitle: "",
  });

  const [chapterImages, setChapterImages] = useState<File[]>([]);
  const [ableToSubmit, setAbleToSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  useEffect(() => {
    if (
      chapterData.mangaId !== null &&
      chapterData.chapterNumber > 0 &&
      chapterData.chapterTitle !== ""
    ) {
      setAbleToSubmit(true);
    } else {
      setAbleToSubmit(false);
    }
  }, [chapterData]);

  const handleMangaSelect = (manga: MangaSearchResult) => {
    setSelectedManga(manga);
    setChapterData((prev) => ({
      ...prev,
      mangaId: manga.id,
      mangaTitle: manga.title,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    if (id === "chapterNumber") {
      setChapterData((prev) => ({ ...prev, [id]: parseInt(value) }));
    } else {
      setChapterData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFiles(e.target.files);
      const filesArray = Array.from(e.target.files);
      setChapterImages(filesArray);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (
        chapterData.mangaId === null ||
        chapterData.chapterNumber <= 0 ||
        chapterData.chapterTitle === ""
      ) {
        toast.error(CHAPTER_MESSAGES.REQUIRED_FIELDS);
        setIsSubmitting(false);
        return;
      }

      const chapterPayload = {
        chapterNumber: chapterData.chapterNumber,
        chapterTitle: chapterData.chapterTitle,
        mangaId: chapterData.mangaId,
      };
      const chapterResponse = await addMangaChapter(chapterPayload);

      if (!chapterResponse.data || !chapterResponse.data.mangaChapter) {
        throw new Error("Failed to add chapter");
      }
      const mangaChapterId = chapterResponse.data.mangaChapter.id;

      if (chapterImages.length < MANGA_VALIDATION.MIN_CHAPTER_IMAGES) {
        toast.error(CHAPTER_MESSAGES.MIN_IMAGES);
        setIsSubmitting(false);
        return;
      }

      if (chapterImages.length > MANGA_VALIDATION.MIN_CHAPTER_IMAGES) {
        try {
          let successfulUploads = 0;
          for (let index = 0; index < chapterImages.length; index++) {
            const image = chapterImages[index];
            const formData = new FormData();
            formData.append("file", image);
            formData.append(
              "path",
              `${chapterData.mangaTitle}/Chapter-${chapterData.chapterNumber}`
            );
            const uploadResponse = await apiV2().post(
              "/upload/chapter-images",
              formData
            );

            if (uploadResponse.status === 200 && uploadResponse.data.success) {
              toast.success(CHAPTER_MESSAGES.IMAGE_UPLOAD_SUCCESS(index + 1));
              const imageResponse = await addMangaChapterImage([
                {
                  imageUrl: uploadResponse.data.url,
                  mangaChapterId: mangaChapterId,
                },
              ]);
              if (imageResponse.status === 200) {
                toast.success(CHAPTER_MESSAGES.IMAGE_SAVE_SUCCESS(index + 1));
                successfulUploads++;
              } else {
                throw new Error(
                  `Failed to save image ${index + 1} to database`
                );
              }
            } else {
              throw new Error(
                `Failed to upload image ${index + 1} to Cloudinary`
              );
            }
          }
          if (successfulUploads === chapterImages.length) {
            toast.success(CHAPTER_MESSAGES.UPLOAD_SUCCESS);
            setChapterData({
              ...chapterData,
              chapterNumber: 0,
              chapterTitle: "",
            });
            setChapterImages([]);
            setSelectedFiles(null);
          }
        } catch (error) {
          console.log(error);
          toast.error(CHAPTER_MESSAGES.UPLOAD_ERROR);
        }

        toast.success(CHAPTER_MESSAGES.ADD_SUCCESS, {
          description: `Chapter ${chapterData.chapterNumber} has been added to ${chapterData.mangaTitle}.`,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(CHAPTER_MESSAGES.ADD_ERROR);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    selectedManga,
    chapterData,
    chapterImages,
    ableToSubmit,
    isSubmitting,
    selectedFiles,
    handleMangaSelect,
    handleInputChange,
    handleImagesChange,
    handleSubmit,
  };
};

