"use client";
import BackGroundMain from "@/components/Deshboard/BackGroundMain";
import Footer from "@/components/Footer";
import MangaSection from "@/components/Deshboard/MangaSection";
import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";
import { mangaBackgroundData } from "@/components/data/mangaBackgroundData";
import MangaCarousel from "@/components/Deshboard/MangaCarousel";
export default function Home() {
  return (
    <>
      <Navbar />
      <NavbarMain />
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col">
          <div className="relative">
            <BackGroundMain items={mangaBackgroundData} />
            <div className="md:-mt-1 -mt-36">
              <MangaCarousel />
            </div>
          </div>
        </div>
        <MangaSection />
      </div>
      <Footer />
    </>
  );
}
