"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import {
  addMangaChapter,
  addMangaChapterImage,
  apiV2,
  MangaSearchResult,
} from "@/services/apiv2";
import MangaAutoSearch from "./components/MangaAutoSearch";
import MangaChapterView from "./components/MangaChapterView";
import MangaView from "./components/MangaView";
import { Loader, Loader2 } from "lucide-react";

const AddNewChapter = () => {
  const [selectedManga, setSelectedManga] = useState<MangaSearchResult | null>(
    null
  );
  const [chapterData, setChapterData] = useState<{
    mangaId: number | null;
    mangaTitle: string;
    chapterNumber: number;
    chapterTitle: string;
  }>({
    mangaId: null,
    mangaTitle: "",
    chapterNumber: 1,
    chapterTitle: "",
  });

  const [chapterImages, setChapterImages] = useState<File[]>([]);
  const [ableToSubmit, setAbleToSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  // Check if form is valid whenever chapterData changes
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

    // Handle number conversion for chapterNumber
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
        toast.error("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // First, add the chapter to the database
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

      // If there are less than 2 images, throw an error
      if (chapterImages.length < 2) {
        toast.error("Please upload at least 2 images");
        setIsSubmitting(false);
        return;
      }

      // If there are more than 2 images, upload them to Cloudinary
      if (chapterImages.length > 2) {
        // Upload each image and collect URLs
        const formData = new FormData();
        chapterImages.forEach((image) => {
          formData.append("files", image as File);
        });
        // Add the path to the form data
        formData.append(
          "path",
          `${chapterData.mangaTitle}/Chapter-${chapterData.chapterNumber}`
        );
        // Upload the images to Cloudinary
        const imageUploadResponse = await apiV2().post(
          "/upload/chapter-images",
          formData
        );

        // Get the successful uploads URL
        const Images = imageUploadResponse.data.successfulUploads;

        // Create the image data using the successful uploads URL
        const imageData: { imageUrl: string; mangaChapterId: number }[] = [];

        // Add the image data to the array
        Images.forEach((image: any) => {
          imageData.push({
            imageUrl: image.url,
            mangaChapterId: mangaChapterId,
          });
        });

        // Add the image data to the database
        const imageResponse = await addMangaChapterImage(imageData);
        console.log(imageResponse);
        toast.success("Chapter Added Successfully", {
          description: `Chapter ${chapterData.chapterNumber} has been added to ${chapterData.mangaTitle}.`,
        });

        if (imageResponse.data.success) {
          // Reset form
          setChapterData({
            mangaId: null,
            mangaTitle: "",
            chapterNumber: 1,
            chapterTitle: "",
          });
          setChapterImages([]);
          setSelectedFiles(null);
        }
      }
    } catch (error) {
      toast.error("Failed to add chapter. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="flex 2xl:flex-row flex-col items-center justify-center gap-4">
        <div className=" flex flex-col items-center justify-center p-2 gap-2">
          <Card className="w-full">
            <CardHeader>
              <CardTitle className="self-center text-2xl font-bold text-primary">
                Add New Chapter
              </CardTitle>
              <CardDescription>
                Fill in the details to add a new chapter to an existing manga.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="space-y-3">
                  <Label htmlFor="mangaSearch">Search for Manga</Label>
                  <MangaAutoSearch
                    onMangaSelect={handleMangaSelect}
                    placeholder="Type to search for manga..."
                  />
                  {chapterData.mangaTitle && (
                    <div className="text-sm text-green-600 mt-1">
                      Selected: {chapterData.mangaTitle}
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapterNumber">Chapter Number</Label>
                  <Input
                    id="chapterNumber"
                    type="number"
                    min="1"
                    value={chapterData.chapterNumber}
                    onChange={handleInputChange}
                    placeholder="e.g., 1"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapterTitle">Chapter Title </Label>
                  <Input
                    id="chapterTitle"
                    value={chapterData.chapterTitle}
                    onChange={handleInputChange}
                    placeholder="e.g., The Beginning"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="chapterImages">Upload Chapter Images</Label>
                  <Input
                    id="chapterImages"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImagesChange}
                    className="cursor-pointer"
                  />
                  {selectedFiles && (
                    <div className="text-sm text-green-600">
                      {selectedFiles.length} files selected
                    </div>
                  )}
                </div>

                <Button
                  onClick={handleSubmit}
                  className="w-full"
                  disabled={isSubmitting || !ableToSubmit}
                >
                  {isSubmitting ? "Adding Chapter..." : "Add Chapter"}
                  {isSubmitting && (
                    <Loader className="w-4 h-4 ml-2 animate-spin" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          <MangaView selectedManga={selectedManga ?? null} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          {selectedManga && (
            <MangaChapterView
              chapterData={chapterData}
              images={chapterImages}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddNewChapter;
