"use client";

import { useState } from "react";
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
import { addManga } from "@/services/api";

const AdminPage = () => {
  const [mangaData, setMangaData] = useState<{
    title: string;
    description: string;
    totalAvailableChapter: number | null;
    genres: string;
    coverImageUrl: string;
  }>({
    title: "",
    description: "",
    totalAvailableChapter: null,
    genres: "",
    coverImageUrl: "",
  });
  const [chapterNumber, setChapterNumber] = useState<number>(1);
  const [mangaCover, setMangaCover] = useState<File | null>(null);
  const [mangaImages, setMangaImages] = useState<File[]>([]);
  const [ableToSubmit, setAbleToSubmit] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setMangaData((prev) => ({ ...prev, [id]: value }));
    if (
      mangaData.title !== "" &&
      mangaData.description !== "" &&
      mangaData.totalAvailableChapter !== null &&
      mangaData.genres !== "" &&
      mangaData.coverImageUrl !== ""
    ) {
      setAbleToSubmit(true);
    } else {
      setAbleToSubmit(false);
    }
  };

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMangaCover(e.target.files[0]);
    }
  };

  const handleCoverUpload = async () => {
    console.log(mangaCover);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      if (
        mangaData.title === "" ||
        mangaData.description === "" ||
        mangaData.totalAvailableChapter === null ||
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


      const sendData = {
        title: mangaData.title,
        description: mangaData.description,
        totalChapter: 0,
        totalAvailableChapter: mangaData.totalAvailableChapter,
        genres: genresArray,
        coverImageUrl: mangaData.coverImageUrl,
        chapterNumber: chapterNumber
      }
      console.log(sendData);

      toast.success("Manga Added Successfully", {
        description: `${mangaData.title} has been added to the library.`,
      });

      // Reset form
      setMangaData({
        title: "",
        description: "",
        totalAvailableChapter: null,
        genres: "",
        coverImageUrl: "",
      });
      setChapterNumber(1);
      setMangaCover(null);
      setMangaImages([]);
    } catch (error) {
      toast.error("Failed to add manga. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center justify-center p-4">
        <Toaster />
        <Card className="w-full max-w-3xl mx-auto">
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
                    value={mangaData.totalAvailableChapter ?? ""}
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
                className="w-full"
                disabled={isSubmitting || !ableToSubmit}
              >
                {isSubmitting ? "Adding Manga..." : "Add Manga"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPage;
