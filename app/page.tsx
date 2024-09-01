"use client";
import BackGroundMain from "@/components/BackGroundMain";
import Footer from "@/components/Footer";
import MangaCarousel from "@/components/MangaCarousel";
import MangaSection from "@/components/MangaSection";

import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";

import { mangaItems } from "@/components/data/mangaData";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto flex flex-col gap-4 min-h-[95vh] ">
        <div className="flex flex-col gap-10">
          <NavbarMain />
          <BackGroundMain />
          <MangaCarousel items={mangaItems} />
        </div>
        <MangaSection />
      </div>
      <Footer />
    </>
  );
}
