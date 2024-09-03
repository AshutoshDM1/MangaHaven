"use client"

import BackGroundMain from "@/components/BackGroundMain";
import Footer from "@/components/Footer";
import MangaCarousel from "@/components/MangaCarousel";
import MangaSection from "@/components/MangaSection";
import { ModeToggle } from "@/components/ModeToggle";
import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";
import { Button } from "@/components/ui/button";
import { mangaItems } from "@/components/data/mangaCarouselData";
import { mangaBackgroundData } from "@/components/data/mangaBackgroundData";
export default function Home() {
  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-full mx-auto flex flex-col">
        <div className="flex flex-col">
          <NavbarMain />
          <div className="relative">
            <BackGroundMain items={mangaBackgroundData} />
            <div className="md:-mt-1 -mt-36">
              <MangaCarousel items={mangaItems} />
            </div>
          </div>
        </div>
        <MangaSection/>
      </div>
      <Footer/>
    </>
  );
}
