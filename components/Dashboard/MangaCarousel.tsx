"use client";
import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight, Divide } from "lucide-react";
import { MangaItem, mangaItems } from "../data/mangaCarouselData";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { mangaCarouselData } from "@/state/atoms";
import { getMangaCarousel } from "@/services/api";
import { Skeleton } from "../ui/skeleton";
import { animate, delay, motion, stagger, useInView } from "framer-motion";
import { useRouter } from "next/navigation";

interface MangaCarouselProps {
  items: MangaItem[];
}

const MangaCarousel: React.FC = () => {
  const router = useRouter();
  const [items, setItems] = useRecoilState(mangaCarouselData);
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getMangaCarousel();
      setItems(data);
    };
    fetchData();
  }, [setItems]);
  // Create an extended version of the items array for smooth infinite scrolling
  const extendedItems = [...items.slice(-3), ...items, ...items.slice(0, 3)];

  // Handle transition to the next slide
  const nextSlide = () => {
    if (!isAnimating) return;
    setCurrentIndex((prevIndex) => prevIndex + 1);
  };

  // Handle transition to the previous slide
  const prevSlide = () => {
    if (!isAnimating) return;
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  // Reset index when reaching the artificial boundaries
  useEffect(() => {
    if (currentIndex === extendedItems.length - 3) {
      // When reaching the end, instantly reset to the real first item
      setTimeout(() => {
        setIsAnimating(false); // Temporarily disable animation
        setCurrentIndex(3);
      }, 500); // Match the duration of the transition to avoid jump
    } else if (currentIndex === 0) {
      // When reaching the start, instantly reset to the real last item
      setTimeout(() => {
        setIsAnimating(false); // Temporarily disable animation
        setCurrentIndex(extendedItems.length - 6);
      }, 500); // Match the duration of the transition to avoid jump
    }
  }, [currentIndex, extendedItems.length]);

  // Re-enable animation after resetting
  useEffect(() => {
    if (!isAnimating) {
      setTimeout(() => {
        setIsAnimating(true);
      }, 50); // Small delay to ensure the reset happens before re-enabling animation
    }
  }, [isAnimating]);

  // Auto-slide every 4 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isAnimating]);

  const getTransformValue = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1000) {
      // Below md
      return `translateX(-${currentIndex * 100}%)`;
    } else {
      // Full width
      return `translateX(-${currentIndex * 33.33}%)`;
    }
  };
  const ref = useRef(null);
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        duration: 2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="xl:max-w-[75rem] w-[95%] mx-auto">
      <div className="relative w-full flex justify-center items-center overflow-visible p-4 lg:px-4 md:px-8 px-7">
        <div className="relative max-w-7xl mx-auto overflow-hidden lg:px-0">
          <h5 className="md:text-3xl text-xl font-bold  opacity-90 px-2 pt-2 pb-1 md:pb-5 md:mb-3">
            Most Viewed
          </h5>
          {items.length <= 1 ? (
            <>
              <div className="w-full flex">
                {[1, 2, 3].map((index) => (
                  <>
                    <div key={index} className="flex gap-4 w-[40vh] ">
                      <Skeleton className="w-full mx-2 h-[20vh] md:h-[25vh] "></Skeleton>
                    </div>
                  </>
                ))}
              </div>
            </>
          ) : (
            <motion.div
              ref={ref}
              initial="hidden"
              animate="visible"
              variants={variants}
              id="carousel"
              className={`flex w-full ${
                isAnimating
                  ? "transition-transform duration-500 ease-in-out"
                  : ""
              }`}
              style={{ transform: getTransformValue() }}
            >
              {extendedItems.map((item, index) => (
                <motion.div
                  onClick={() => {
                    router.push(`/read/${item.title}/1`);
                  }}
                  variants={itemVariants}
                  key={item.id}
                  className="lg:w-1/3 md:w-1/2 w-full flex-shrink-0 px-0 md:px-2 "
                >
                  <div
                    style={{
                      transition:
                        "background-color 0.3s ease, transform 0.3s ease",
                    }}
                    className="dark:border-[#3a3a3a] border dark:border md:h-[25vh] h-[20vh] flex rounded-lg overflow-hidden hover:bg-[#cccccc] dark:hover:bg-zinc-900 transform cursor-pointer"
                  >
                    <div className="w-[60%] flex flex-col justify-center border-l-[5px] dark:border-l-[3px] border-[#C391FF] dark:border-[#ffffffe2]">
                      <div className="md:p-3 p-2 md:h-[40%] h-[30%]">
                        <h3 className="md:text-lg text-sm font-normal  opacity-70">
                          {item.status}
                        </h3>
                        <h3 className="md:text-xl text-md font-semibold ">
                          {item.title}
                        </h3>
                      </div>
                      <div className="md:h-[60%] h-[50%] flex flex-col justify-between md:p-3 p-2 pt-6 md:pt-3 ">
                        <p className=" opacity-70 md:text-md text-sm line-clamp-2 md:block hidden">
                          {item.description}
                        </p>
                        <div className=" opacity-70 md:text-md text-sm">
                          <span>{item.volume}</span>
                          <span className="mx-2">•</span>
                          <span>{item.chapter}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {item.genres.map((genre, i) => (
                            <span
                              key={i}
                              className="md:text-md text-[12px] px-1 "
                            >
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="relative w-[40%]">
                      <Image
                        src={`${item.imageUrl}`}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        width={500}
                        height={300}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
        <button
          onClick={prevSlide}
          className="absolute lg:left-[-2%] md:left-0 left-[0%] md:h-[24.9vh] h-[20.3vh] rounded-l-3xl w-auto md:top-[27.8%] top-[24%] transform -translate-y-1 shadow-md bg-[#a962ff] bg-opacity-70 lg:p-2 md:p-1 z-10 flex justify-start items-center hover:bg-opacity-100 transition-all duration-300"
        >
          <ChevronLeft className=" w-fit " />
        </button>

        <button
          onClick={nextSlide}
          className="absolute lg:right-[-2%] md:right-0 right-[0%]  md:h-[24.9vh] h-[20.3vh] rounded-r-3xl w-auto  md:top-[27.8%] top-[24%] transform -translate-y-1 shadow-md bg-[#a962ff] bg-opacity-70 lg:p-2 md:p-1 z-10 flex justify-end items-center hover:bg-opacity-100 transition-all duration-300"
        >
          <ChevronRight className=" w-fit " />
        </button>
      </div>
    </div>
  );
};

export default MangaCarousel;
