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
        // Upload each image and save to DB immediately
        try {
          let successfulUploads = 0;
          
          // Upload and save images sequentially to maintain order
          for (let index = 0; index < chapterImages.length; index++) {
            const image = chapterImages[index];
            const formData = new FormData();
            formData.append("file", image);
            formData.append(
              "path",
              `${chapterData.mangaTitle}/Chapter-${chapterData.chapterNumber}`
            );
            
            // Upload to Cloudinary
            const uploadResponse = await apiV2().post(
              "/upload/chapter-images",
              formData
            );
            
            if (uploadResponse.status === 200 && uploadResponse.data.success) {
              toast.success(`Image ${index + 1} uploaded to Cloudinary`);
              
              // Immediately save to database
              const imageResponse = await addMangaChapterImage([
                {
                  imageUrl: uploadResponse.data.url,
                  mangaChapterId: mangaChapterId,
                }
              ]);
              
              if (imageResponse.status === 200) {
                toast.success(`Image ${index + 1} saved to database`);
                successfulUploads++;
              } else {
                throw new Error(`Failed to save image ${index + 1} to database`);
              }
            } else {
              throw new Error(`Failed to upload image ${index + 1} to Cloudinary`);
            }
          }
          
          // Check if all images were processed successfully
          if (successfulUploads === chapterImages.length) {
            toast.success("All images uploaded and saved successfully!");
            // Reset form
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
          toast.error("Failed to upload and save images. Please try again.");
        }

        toast.success("Chapter Added Successfully", {
          description: `Chapter ${chapterData.chapterNumber} has been added to ${chapterData.mangaTitle}.`,
        });
      }
    } catch (error) {
      console.log(error);
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
