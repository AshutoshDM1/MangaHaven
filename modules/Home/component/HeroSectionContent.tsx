"use client"
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSectionContent = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-4">
      <motion.h1
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="hidden sm:block text-center text-6xl xl:text-7xl 2xl:text-9xl font-bold leading-[1.4] bg-gradient-to-r from-pink-500 via-purple-100 to-purple-900 bg-clip-text text-transparent text-clip "
      >
        MangaHaven
      </motion.h1>
      <motion.h1
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="block sm:hidden text-center text-8xl font-bold bg-gradient-to-r from-pink-500 via-purple-100 to-purple-900 bg-clip-text text-transparent text-clip mb-16"
      >
        Manga <br /> <span className="text-7xl" >Haven</span>
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
      <Link className="relative z-50" href="/dashboard">
        <motion.button
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative inline-flex overflow-hidden rounded-full p-[2px] mt-3 "
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-sm font-medium text-white backdrop-blur-3xl">
            Read Now
          </span>
        </motion.button>
      </Link>
    </div>
  );
};

export default HeroSectionContent;
