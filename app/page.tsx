"use client";
import BackGroundMain from "@/components/Dashboard/BackGroundMain";
import Footer from "@/components/Footer";
import MangaSection from "@/components/Dashboard/MangaSection";
import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";
import MangaCarousel from "@/components/Dashboard/MangaCarousel";
export default function Home() {
  return (
    <>
      <Navbar />
      <NavbarMain />
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col">
          <div className="relative">
            <BackGroundMain />
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
