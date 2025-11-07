"use client";

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
import { Loader2 } from "lucide-react";
import { AddMangaFormProps } from "@/modules/Admin/types/Admin";

const MangaForm = ({
  mangaData,
  onInputChange,
  onCoverChange,
  onCoverUpload,
  onSubmit,
  mangaCover,
  ableToSubmit,
  isSubmitting,
}: AddMangaFormProps) => {
  return (
    <Card className="min-w-[30vw]">
      <CardHeader>
        <CardTitle className="self-center text-2xl font-bold text-primary">
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
              onChange={onInputChange}
              placeholder="Enter manga title"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="bg-zinc-900"
              value={mangaData.description}
              onChange={onInputChange}
              placeholder="Enter manga description"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="totalAvailableChapter">Available Chapters</Label>
            <Input
              id="totalAvailableChapter"
              type="number"
              value={mangaData.totalAvailableChapter}
              onChange={onInputChange}
              placeholder="e.g., 50"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="genres">Genres</Label>
            <Input
              id="genres"
              value={mangaData.genres}
              onChange={onInputChange}
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
                onChange={onCoverChange}
                className="cursor-pointer"
              />
              {mangaCover && (
                <div className="text-sm text-green-600">
                  Image: {mangaCover.name}
                </div>
              )}
            </div>
            <Button
              onClick={onCoverUpload}
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
                onChange={onInputChange}
                required
                placeholder="Upload a image or paste a image URL"
                className="cursor-pointer"
              />
            </div>
          </div>

          <Button
            onClick={onSubmit}
            className="w-full flex items-center justify-center"
            disabled={isSubmitting || !ableToSubmit}
          >
            {isSubmitting && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {isSubmitting ? "Adding Manga..." : "Add Manga"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default MangaForm;

