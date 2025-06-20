"use client";
import SplineComponent from "@/components/splineComponent";
import { motion } from "framer-motion";
import { MangaSection } from "@/components/Landing/MangaSection";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { FooterLanding } from "@/components/Landing/FooterLanding";
import { useEffect, useState } from "react";
import FooterMain from "@/components/Landing/FooterMain";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
const Home = () => {
  const router = useRouter();
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

  const [animate, setAnimate] = useState(true);
  const transition = {
    y: {
      repeat: Infinity,
      duration: 20,
      ease: "easeInOut",
      delay: 2,
    },
    x: {
      repeat: Infinity,
      duration: 20,
      ease: "easeInOut",
      delay: 2,
    },
  };

  const visible1 = {
    opacity: 1,
    x: [0, -15, 5, 12, -8, -5, 0],
    y: [0, -12, 7, 5, -10, 3, 0],
    transition: transition,
  };
  const visible2 = {
    opacity: 1,
    x: [0, 8, -12, 5, -7, 10, 0],
    y: [0, 5, -8, 12, -5, -10, 0],
    transition: transition,
  };
  const visible3 = {
    opacity: 1,
    x: [0, -5, 15, -10, 8, -12, 0],
    y: [0, 10, -5, -8, 12, -3, 0],
    transition: transition,
  };
  const visible4 = {
    opacity: 1,
    x: [0, 12, -8, -5, 15, -10, 0],
    y: [0, -7, 12, -10, 5, 8, 0],
    transition: transition,
  };
  const visible5 = {
    opacity: 1,
    x: [0, -8, 12, -15, 5, 10, 0],
    y: [0, 8, -12, 7, -5, 10, 0],
    transition: transition,
  };
  const visible6 = {
    opacity: 1,
    x: [0, 10, -7, 15, -12, 5, 0],
    y: [0, -15, 10, -5, 8, -12, 0],
    transition: transition,
  };

  const animateCard1 = {
    hidden: { opacity: 0, right: "130%", rotate: 360 },
    animateManga: { opacity: 1, right: "-50%", top: "35%", rotate: [360, 9] },
  };
  const animateCard2 = {
    hidden: { opacity: 0, right: "140%", rotate: 365 },
    visible: { opacity: 1 },
    animateManga: { opacity: 1, right: "-50%", top: "0%", rotate: [365, 6] },
  };
  const animateCard3 = {
    hidden: { opacity: 0, right: "130%", rotate: 355 },
    visible: { opacity: 1 },
    animateManga: { opacity: 1, right: "-50%", top: "-35%", rotate: [355, 3] },
  };
  const animateCard4 = {
    hidden: { opacity: 0, left: "130%", rotate: 355 },
    visible: { opacity: 1 },
    animateManga: { opacity: 1, left: "-50%", top: "35%", rotate: [355, -3] },
  };
  const animateCard5 = {
    hidden: { opacity: 0, left: "140%", rotate: 360 },
    visible: { opacity: 1 },
    animateManga: { opacity: 1, left: "-50%", top: "0%", rotate: [360, -6] },
  };
  const animateCard6 = {
    hidden: { opacity: 0, left: "130%", rotate: 365 },
    visible: { opacity: 1 },
    animateManga: { opacity: 1, left: "-50%", top: "-35%", rotate: [365, -9] },
  };
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("window is defined");
      // Monitor page load time
      window.addEventListener("load", () => {
        const timing = window.performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
      });

      // Monitor API response times
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const start = performance.now();
        const response = await originalFetch(...args);
        const end = performance.now();
        console.log(`API call to ${args[0]} took ${end - start}ms`);
        return response;
      };
    }
  }, []);
  return (
    <>
      <div className="w-full overflow-hidden">
        <SplineComponent />
        <div className="min-h-screen w-full flex flex-col items-center justify-center [background:radial-gradient(circle,rgba(86,6,156,1)_1%,rgba(13,13,13,1)_47%)] ">
          <div className="z-10 flex min-h-64 items-center justify-center absolute top-0 ">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-zinc-900 dark:hover:bg-zinc-800",
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Introducing MangaHaven</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          <div className="relative -top-[10vh] hidden md:flex">
            <div className="flex flex-col gap-0">
              <motion.img
                onClick={() => {
                  setAnimate(!animate);
                }}
                initial={animateCard1.hidden}
                animate={animate ? visible1 : animateCard1.animateManga}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372213/MangaHaven/MangaLandingPage/solo-leveling_quzeqr.jpg"
                alt="images"
                className="w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[1] cursor-pointer  "
              />
              <motion.img
                onClick={() => {
                  setAnimate(!animate);
                }}
                initial={animateCard2.hidden}
                animate={animate ? visible2 : animateCard2.animateManga}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.3,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372211/MangaHaven/MangaLandingPage/girlfriend-girlfriend_aobpvx.jpg"
                alt="images"
                className="w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[2] cursor-pointer"
              />
              <motion.img
                onClick={() => {
                  setAnimate(!animate);
                }}
                initial={animateCard3.hidden}
                animate={animate ? visible3 : animateCard3.animateManga}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.5,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372209/MangaHaven/MangaLandingPage/Rent-a-girlfriend_o36fx7.jpg"
                alt="images"
                className="w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[3] cursor-pointer"
              />
            </div>
            <div className="flex flex-col gap-0 ">
              <motion.img
                onClick={() => {
                  setAnimate(!animate);
                }}
                initial={animateCard4.hidden}
                animate={animate ? visible4 : animateCard4.animateManga}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.7,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372208/MangaHaven/MangaLandingPage/one-punch-man_rxpd2z.jpg"
                alt="images"
                className="max-w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[4] cursor-pointer  "
              />
              <motion.img
                onClick={() => {
                  setAnimate(!animate);
                }}
                initial={animateCard5.hidden}
                animate={animate ? visible5 : animateCard5.animateManga}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 0.9,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746374741/MangaHaven/MangaLandingPage/high-school-dxd_dxj3cc.webp"
                alt="images"
                className="max-w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[5] cursor-pointer"
              />
              <motion.img
                onClick={() => {
                  setAnimate(!animate);
                }}
                initial={animateCard6.hidden}
                animate={animate ? visible6 : animateCard6.animateManga}
                transition={{
                  duration: 1,
                  ease: [0.5, 0.1, 0.5, 1.0],
                  delay: 1.1,
                }}
                src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372204/MangaHaven/MangaLandingPage/jujutsu-kaisen_ryhzhu.webp"
                alt="images"
                className="max-w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[6] cursor-pointer"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 justify-center items-center absolute top-[30%] md:top-[58%] z-30 cursor-default ">
            <motion.h1
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="hidden md:block text-wrap  md:text-[6rem] lg:text-[8rem] font-bold leading-[1.4] bg-gradient-to-r from-pink-500 via-purple-100 to-purple-900 bg-clip-text text-transparent text-clip "
            >
              MangaHaven
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[4rem] block md:hidden md:text-[8rem] font-bold leading-[1.2] bg-gradient-to-r from-pink-500 via-purple-100 to-purple-900 bg-clip-text text-transparent text-clip "
            >
              Manga
            </motion.h1>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-[4rem] block md:hidden md:text-[8rem] font-bold leading-[1.1] bg-gradient-to-r from-pink-500 via-purple-100 to-purple-900 bg-clip-text text-transparent text-clip "
            >
              Haven
            </motion.h1>

            <motion.h1
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-white text-xl font-bold text-center"
            >
              Your Favorite Manga and Anime
            </motion.h1>
            <motion.h1
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-white text-xl font-bold text-center"
            >
              All at one place
            </motion.h1>
            <Link href="/dashboard">
            <motion.button
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative inline-flex overflow-hidden rounded-full p-[2px] mt-3"
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl">
                Read Now
              </span>
            </motion.button>
            </Link>
          </div>
        </div>

        <div className="w-full flex flex-col items-center justify-center">
          <MangaSection />
        </div>
        <FooterLanding />
        <FooterMain />
      </div>
    </>
  );
};

export default Home;
