"use client"
import MangaSectionSlider from '@/modules/Home/component/MangaSection';
import MangaCTA from '@/modules/Home/component/MangaCTA';
import FooterSection from '@/components/ui/footer-section';
import ShinyText from './component/ShinyText';
import HeroSectionContent from './component/HeroSectionContent';
import RadialGradient from './component/RadialGradient';
import FlottingImages from './component/FlottingImages';
import useSmoothScroll from '@/hooks/use-smoothScroll';
import { Particles } from '@/components/ui/particles';
import { usePageLoad } from '@/hooks/page-load';

const Home = () => {
  useSmoothScroll();
  usePageLoad();
  return (
    <>
      <div className="bg-[#070707] min-h-screen w-full flex flex-col justify-center items-center overflow-hidden">
        <RadialGradient className="relative">
          <div className="absolute inset-0 z-0 w-full overflow-hidden">
            <Particles className="min-h-screen" />
          </div>
          <div className="relative z-10 flex flex-col justify-center items-center">
            <FlottingImages />
            <ShinyText />
            <HeroSectionContent />
          </div>
        </RadialGradient>
        <MangaSectionSlider />
        <MangaCTA />
        <FooterSection />
      </div>
    </>
  );
};

export default Home;
