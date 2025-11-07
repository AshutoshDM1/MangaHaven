"use client";

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
import { Loader } from "lucide-react";
import { AddChapterFormProps } from "@/modules/Admin/types/Admin";
import MangaAutoSearch from "./MangaAutoSearch";

const ChapterForm = ({
  chapterData,
  onInputChange,
  onImagesChange,
  onSubmit,
  selectedFiles,
  ableToSubmit,
  isSubmitting,
  onMangaSelect,
}: AddChapterFormProps) => {
  return (
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
              onMangaSelect={onMangaSelect}
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
              onChange={onInputChange}
              placeholder="e.g., 1"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="chapterTitle">Chapter Title </Label>
            <Input
              id="chapterTitle"
              value={chapterData.chapterTitle}
              onChange={onInputChange}
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
              onChange={onImagesChange}
              className="cursor-pointer"
            />
            {selectedFiles && (
              <div className="text-sm text-green-600">
                {selectedFiles.length} files selected
              </div>
            )}
          </div>

          <Button
            onClick={onSubmit}
            className="w-full"
            disabled={isSubmitting || !ableToSubmit}
          >
            {isSubmitting ? "Adding Chapter..." : "Add Chapter"}
            {isSubmitting && <Loader className="w-4 h-4 ml-2 animate-spin" />}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChapterForm;

