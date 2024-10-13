"use client";
import BackGroundMain from "@/components/Dashboard/BackGroundMain";
import Footer from "@/components/Footer";
import MangaSection from "@/components/Dashboard/MangaSection";
import MangaCarousel from "@/components/Dashboard/MangaCarousel";
import NavbarMain from "@/components/NavBar/NavbarMain";
export default function Home() {
  return (
    <>
      <NavbarMain />
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col">
          <div className="relative">
            <BackGroundMain />
            <div className="md:-mt-1 -mt-28">
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