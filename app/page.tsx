import BackGroundMain from "@/components/BackGroundMain";
import Footer from "@/components/Footer";
import MangaSection from "@/components/MangaSection";
import { ModeToggle } from "@/components/ModeToggle";
import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="max-w-full mx-auto flex flex-col gap-4 p-4 min-h-[95vh] ">
        <div className="flex flex-col gap-10">
          <NavbarMain />
          <BackGroundMain />
        </div>
        <MangaSection/>
      </div>
      <Footer/>
    </>
  );
}
