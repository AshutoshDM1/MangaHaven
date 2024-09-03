"use client";
import BackGroundMain from "@/components/Deshboard/BackGroundMain";
import Footer from "@/components/Footer";
import MangaCarousel from "@/components/Deshboard/MangaCarousel";
import MangaSection from "@/components/Deshboard/MangaSection";

import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";

import { mangaItems } from "@/components/data/mangaData";

export default function Home() {
  return (
    <>
      <Navbar />
      <NavbarMain />
      <div className="max-w-full mx-auto flex flex-col gap-4 min-h-[95vh] ">
        <div className="flex flex-col gap-10">
          <BackGroundMain />
          <MangaCarousel items={mangaItems} />
        </div>
        <MangaSection />
      </div>
      <Footer />
    </>
  );
}
