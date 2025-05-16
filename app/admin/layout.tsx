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

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
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
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <SidebarTrigger />
          {children}
        </main>
      </SidebarProvider>
    </>
  );
};

export default AdminLayout;
