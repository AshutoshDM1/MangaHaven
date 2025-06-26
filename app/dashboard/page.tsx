"use client";
import BackGroundMain from "@/components/Dashboard/BackGroundMain";
import Footer from "@/components/Footer";
import MangaSection from "@/components/Dashboard/MangaSection";
import MangaCarousel from "@/components/Dashboard/MangaCarousel";
import NavbarMain from "@/components/NavBar/NavbarMain";
export default async function Home() {
  return (
    <>
      <NavbarMain />
      <div className="max-w-7xl mx-auto flex flex-col">
        {/* <div className="flex flex-col">
          <div className="relative">
            <BackGroundMain />
            <div className="-mt-[14vh] md:mt-[0]">
              <h5 className="md:text-3xl text-xl font-bold px-10 pt-2">
                Most Viewed
              </h5>
              <MangaCarousel />
            </div>
          </div>
        </div> */}
        <MangaSection />
      </div>
      <Footer />
    </>
  );
}
