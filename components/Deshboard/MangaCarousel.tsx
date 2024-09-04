import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MangaItem } from "../data/mangaCarouselData";
import Image from "next/image";

interface MangaCarouselProps {
  items: MangaItem[];
}

const MangaCarousel: React.FC<MangaCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isAnimating, setIsAnimating] = useState(true);

  // Create an extended version of the items array for smooth infinite scrolling
  const extendedItems = [...items.slice(-3), ...items, ...items.slice(0, 3)];

  // Handle transition to the next slide
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

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
  }, [nextSlide]);

  const getTransformValue = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1000) {
      // Below md
      return `translateX(-${currentIndex * 100}%)`;
    } else {
      // Full width
      return `translateX(-${currentIndex * 33.33}%)`;
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex((prevIndex) => prevIndex); // Trigger re-render
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [nextSlide]);

  return (
    <div className="relative w-full overflow-hidden p-4 flex justify-center items-center">
      <div className="md:w-[90vw] w-full relative overflow-hidden">
        <h5 className="md:text-3xl text-xl font-bold  opacity-90 md:p-3 p-2 md:mb-3">
          Most Viewed
        </h5>
        <div
          id="carousel"
          className={`flex ${
            isAnimating ? "transition-transform duration-500 ease-in-out" : ""
          }`}
          style={{ transform: getTransformValue() }}
        >
          {extendedItems.map((item, index) => (
            <div key={index} className="lg:w-1/3 w-full flex-shrink-0 px-2">
              <div
                style={{
                  transition: "background-color 0.3s ease, transform 0.3s ease",
                }}
                className="dark:border-[#3a3a3a] border dark:border md:h-[25vh] h-[20vh] flex rounded-lg overflow-hidden dark:hover:bg-zinc-900 hover:bg-[#d7d7d788]  transform cursor-pointer"
              >
                <div className="w-[60%] flex flex-col justify-center border-l-4  border-[#A977E7] dark:border-[#ffffffe0] ">
                  <div className="md:p-3 p-2 md:h-[40%] h-[30%]">
                    <h3 className="md:text-lg text-sm font-normal  opacity-70">
                      {item.status}
                    </h3>
                    <h3 className="md:text-xl text-md font-semibold ">
                      {item.title}
                    </h3>
                  </div>
                  <div className="md:h-[60%] h-[70%] flex flex-col justify-between md:p-3 p-2 md:pt-2 ">
                    <p className=" opacity-70 md:text-md text-sm line-clamp-2">
                      {item.description}
                    </p>
                    <div className=" opacity-70 md:text-md text-sm">
                      <span>{item.volume}</span>
                      <span className="mx-2">•</span>
                      <span>{item.chapter}</span>
                    </div>
                    <div className="flex flex-wrap gap-1  mt-2 ">
                      {item.genres.map((genre, i) => (
                        <span
                          key={i}
                          className="md:text-md text-[12px] pr-2 bg-[#A977E7] text-white px-[6px] py-[2px]  rounded-md  "
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative w-[40%]">
                  <Image
                    src={`${item.imageUrl}`} // Add a leading slash
                    alt={item.title}
                    className="w-full h-full object-cover"
                    width={500} // Adjust as needed
                    height={300} // Adjust as needed
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1 shadow-md bg-opacity-50 p-2 rounded-md z-10 dark:bg-foreground/10"
        style={{ left: "2%" }}
      >
        <ChevronLeft className="" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1 dark:bg-foreground/10 shadow-md bg-opacity-50 p-2 rounded-md z-10"
        style={{ right: "2%" }}
      >
        <ChevronRight className="" />
      </button>
    </div>
  );
};

export default MangaCarousel;
