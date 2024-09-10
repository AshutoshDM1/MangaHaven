import BackGroundMain from "@/components/Dashboard/BackGroundMain";
import MangaCarousel from "@/components/Dashboard/MangaCarousel";
import MangaSection from "@/components/Dashboard/MangaSection";
import Footer from "@/components/Footer";
import NavbarMain from "@/components/NavBar/NavbarMain";

const dashboard = () => {
  return (
    <>
      <div className="main-dashboard">
        <NavbarMain />
        <div className="max-w-7xl mx-auto flex flex-col">
          <BackGroundMain />
        </div>
        <MangaCarousel />
        <div className="max-w-7xl mx-auto flex flex-col">
          <MangaSection />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default dashboard;
