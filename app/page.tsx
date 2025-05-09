"use client";
import SplineComponent from "@/components/splineComponent";
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation";
import { NavbarLanding } from "@/components/Landing/NavbarLanding";
import { motion } from "framer-motion";
import { MangaSection } from "@/components/Landing/MangaSection";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { FooterLanding } from "@/components/Landing/FooterLanding";
import { useEffect } from "react";
import FooterMain from "@/components/Landing/FooterMain";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
const Home = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,
      touchMultiplier: 2,
      touchInertiaMultiplier: 2,
    });
    return () => {
      lenis.destroy();
    };
  }, []);

  const animateCard1 = {
    hidden: { opacity: 0, right: "80%", rotate: 360 },
    visible: { opacity: 1, right: "-50%", top: "35%", rotate: [360, 9] },
  };
  const animateCard2 = {
    hidden: { opacity: 0, right: "80%", rotate: 365 },
    visible: { opacity: 1, right: "-50%", top: "0%", rotate: [365, 6] },
  };
  const animateCard3 = {
    hidden: { opacity: 0, right: "80%", rotate: 355 },
    visible: { opacity: 1, right: "-50%", top: "-35%", rotate: [355, 3] },
  };
  const animateCard4 = {
    hidden: { opacity: 0, left: "80%", rotate: 355 },
    visible: { opacity: 1, left: "-50%", top: "35%", rotate: [355, -3] },
  };
  const animateCard5 = {
    hidden: { opacity: 0, left: "80%", rotate: 360 },
    visible: { opacity: 1, left: "-50%", top: "0%", rotate: [360, -6] },
  };
  const animateCard6 = {
    hidden: { opacity: 0, left: "80%", rotate: 365 },
    visible: { opacity: 1, left: "-50%", top: "-35%", rotate: [365, -9] },
  };

  return (
    <>
      <div className="w-full ">
        {/* <SplineComponent /> */}
        {/* <NavbarLanding /> */}
        <div
          style={{
            background:
              "radial-gradient(circle,rgba(86, 6, 156, 1) 1%, rgba(13, 13, 13, 1) 47%)",
          }}
          className="min-h-screen w-full flex flex-col items-center justify-center "
        >
          <div className="z-10 flex min-h-64 items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Introducing MangaHaven</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          <div className="flex relative -top-[16vh] ">
            <div className="flex flex-col gap-0">
              <motion.img
                initial={animateCard1.hidden}
                animate={animateCard1.visible}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372213/MangaHaven/MangaLandingPage/solo-leveling_quzeqr.jpg"
                alt="images"
                className="w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[1] "
              />
              <motion.img
                initial={animateCard2.hidden}
                animate={animateCard2.visible}      
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.3,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372211/MangaHaven/MangaLandingPage/girlfriend-girlfriend_aobpvx.jpg"
                alt="images"
                className="w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[2]"
              />
              <motion.img
                initial={animateCard3.hidden}
                animate={animateCard3.visible}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.5,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372209/MangaHaven/MangaLandingPage/Rent-a-girlfriend_o36fx7.jpg"
                alt="images"
                className="w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[3]"
              />
            </div>
            <div className="flex flex-col gap-0 ">
              <motion.img
                initial={animateCard4.hidden}
                animate={animateCard4.visible}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.7,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372208/MangaHaven/MangaLandingPage/one-punch-man_rxpd2z.jpg"
                alt="images"
                className="max-w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[4]"
              />
              <motion.img
                initial={animateCard5.hidden}
                animate={animateCard5.visible}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.9,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746374741/MangaHaven/MangaLandingPage/high-school-dxd_dxj3cc.webp"
                alt="images"
                className="max-w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[5]"
              />
              <motion.img
                initial={animateCard6.hidden}
                animate={animateCard6.visible}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 1.1,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372204/MangaHaven/MangaLandingPage/jujutsu-kaisen_ryhzhu.webp"
                alt="images"
                className="max-w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[6]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center absolute top-[55%] z-20">
            <h1 className="text-white text-6xl font-bold mt-[10vh]">
              Your Favorite Manga and Anime
            </h1>
            <h1 className="text-white text-6xl font-bold">All at one place</h1>
          </div>
        </div>

        <div className="min-h-screen w-full flex flex-col items-center justify-center">
          <MangaSection />
        </div>
        <FooterLanding />
        <FooterMain />
      </div>
    </>
  );
};

export default Home;
