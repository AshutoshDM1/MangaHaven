"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Toaster, toast } from "sonner";
import { addManga, apiV2, SendMangaData } from "@/services/apiv2";
import ViewManga from "./components/ViewManga";
import { Loader2 } from "lucide-react";

type MangaData = {
  title: string;
  description: string;
  totalAvailableChapter: number;
  genres: string;
  coverImageUrl: string;
}

const AdminPage = () => {
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
      setMangaData((prev) => ({ ...prev, [id]: parseInt(value)}));
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
        toast.error("Please select a cover image.");
        return;
      }
      const formData = new FormData();
        formData.append("file", mangaCover);
      const result = await apiV2().post("/upload/mangacover", formData);
      toast.success("Manga Cover Uploaded Successfully");
      setMangaData((prev) => ({ ...prev, coverImageUrl: result.data.url }));
    } catch (error) {
      toast.error("Failed to upload manga cover. Please try again.");
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
        mangaData.coverImageUrl === "" ||
        mangaData.coverImageUrl === ""  
      ) {
        toast.error("Please fill in all required fields.");
        setIsSubmitting(false);
        return;
      }

      // Convert comma-separated genres to array
      const genresArray = mangaData.genres
        .split(",")
        .map((genre) => genre.trim());

      if (genresArray.length < 3 || genresArray.length > 3) {
        toast.error("Please enter at least and maximum 3 genres.");
        setIsSubmitting(false);
        return;
      }

      if (mangaData.description.length > 500) {
        toast.error("Description must be less than 500 characters.");
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
        toast.success("Manga Added Successfully", {
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
      toast.error("Failed to add manga. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full p-4 flex items-center justify-center gap-4">
        <Toaster />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          {/* Add Manga Form */}
          <Card className="min-w-[30vw]">
          <CardHeader>
            <CardTitle className="self-center text-2xl font-bold text-primary ">
              Add New Manga
            </CardTitle>
            <CardDescription>
              Fill in the details to add a new manga to your collection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Manga Title</Label>
                <Input
                  id="title"
                  required
                  value={mangaData.title}
                  onChange={handleInputChange}
                  placeholder="Enter manga title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  className="bg-zinc-900"
                  value={mangaData.description}
                  onChange={handleInputChange}
                  placeholder="Enter manga description"
                  required
                />
              </div>

                <div className="space-y-2">
                  <Label htmlFor="totalAvailableChapter">
                    Available Chapters
                  </Label>
                  <Input
                    id="totalAvailableChapter"
                    type="number"
                    value={mangaData.totalAvailableChapter}
                    onChange={handleInputChange}
                    placeholder="e.g., 50"
                    required
                  />
                </div>

              <div className="space-y-2">
                <Label htmlFor="genres">Genres</Label>
                <Input
                  id="genres"
                  value={mangaData.genres}
                  onChange={handleInputChange}
                  placeholder="Enter genres separated by commas (e.g., Action, Adventure, Fantasy)"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mangaCover">Upload Manga Cover</Label>
                <div className="flex items-center gap-4">
                  <Input

                    id="mangaCover"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    className="cursor-pointer"
                  />
                  {mangaCover && (
                    <div className="text-sm text-green-600">
                      Image: {mangaCover.name}
                    </div>
                  )}
                </div>
                <Button
                  onClick={handleCoverUpload}
                  className="p-2"
                  disabled={mangaCover === null}
                >
                  {isSubmitting ? "Uploading..." : "Upload Cover Image"}
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mangaCover">Manga Cover Image URL</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="coverImageUrl"
                    type="text"
                    value={mangaData.coverImageUrl}
                    onChange={handleInputChange}
                    required
                    placeholder="Upload a image or paste a image URL"
                    className="cursor-pointer"
                  />
                </div>
              </div>
              
              <Button
                onClick={handleSubmit}
                className="w-full flex items-center justify-center"
                disabled={isSubmitting || !ableToSubmit}
              >
                {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {isSubmitting ? "Adding Manga..." : "Add Manga"}
              </Button>
            </div>
          </CardContent>
        </Card>
        
        {/* Manga Preview */}
        <div className="w-full h-full flex items-center justify-center">
          <ViewManga mangaData={mangaData} />
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminPage;
