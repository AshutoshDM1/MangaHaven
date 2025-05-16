"use client";

import { useState } from "react";
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
import { addManga } from "@/services/api";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

const AdminPage = () => {
  const [mangaName, setMangaName] = useState("");
  const [mangaCover, setMangaCover] = useState<File | null>(null);
  const [mangaImages, setMangaImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMangaCover(e.target.files[0]);
    }
  };

  const handleImagesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setMangaImages(Array.from(e.target.files));
    }
  };
  const URL = process.env.NEXT_PUBLIC_API_URL;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!mangaCover || !mangaImages || !mangaName) {
        toast.error("Please fill in all fields.");
        return;
      }
      const response = await addManga({
        title: mangaName,
        cover: mangaCover,
        images: mangaImages,
      });

      toast.success("Manga Added Successfully", {
        description: `${mangaName} has been added to the library.`,
      });

      setMangaName("");
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
      <div className="w-full flex flex-col items-center justify-center">
        <Toaster />
        <h1 className="text-3xl font-bold mb-8 text-center">
          Manga Admin Panel
        </h1>
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="self-center">Add New Manga</CardTitle>
            <CardDescription>
              Fill in the details to add a new manga to your collection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="mangaName">Manga Name</Label>
                <Input
                  id="mangaName"
                  value={mangaName}
                  onChange={(e) => setMangaName(e.target.value)}
                  placeholder="Enter manga title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="mangaCover">Manga Cover</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="mangaCover"
                    type="file"
                    accept="image/*"
                    onChange={handleCoverChange}
                    required
                    className="cursor-pointer"
                  />
                  {mangaCover && (
                    <div className="text-sm text-green-600">
                      Cover selected: {mangaCover.name}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mangaImages">Manga Images</Label>
                <Input
                  id="mangaImages"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                  required
                  className="cursor-pointer"
                />
                {mangaImages.length > 0 && (
                  <div className="text-sm text-green-600">
                    {mangaImages.length} images selected
                  </div>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Adding Manga..." : "Add Manga"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default AdminPage;
