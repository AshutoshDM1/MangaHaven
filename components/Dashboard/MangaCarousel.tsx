"use client";
import React, { useEffect, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MangaItem, mangaItems } from "../data/mangaCarouselData";
import Image from "next/image";
import { useRecoilState } from "recoil";
import { mangaCarouselData } from "@/state/atoms";
import { getMangaCarousel } from "@/services/api";
import { Skeleton } from "../ui/skeleton";

interface MangaCarouselProps {
  items: MangaItem[];
}

const MangaCarousel: React.FC = () => {
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

  return ( 
    <div className="relative w-full overflow-visible p-4">
      <div className="relative overflow-hidden">
        <h5 className='md:text-3xl text-xl font-bold text-white opacity-90 md:p-3 p-2 md:mb-3'>Most Viewed</h5>
        {items.length <= 1 ? (
          <div className="h-[30vh] w-full flex gap-3 ">
            {[1, 2, 3].map((index) => (
              <div key={index} className="w-1/3 h-full">
                <Skeleton className="w-full h-full"></Skeleton>
              </div>
            ))}
          </div>
        ) : (
          <div
            id="carousel"
            className={`flex ${isAnimating ? 'transition-transform duration-500 ease-in-out' : ''}`}
            style={{ transform: getTransformValue() }}
          >
            {extendedItems.map((item, index) => (
              <div key={index} className="lg:w-1/3 w-full flex-shrink-0 px-2">
                <div 
                  style={{ 
                    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
                    transition: 'background-color 0.3s ease, transform 0.3s ease'
                  }}
                  className="dark:border-[#3a3a3a] border dark:border md:h-[25vh] h-[20vh] flex rounded-lg overflow-hidden hover:bg-zinc-900 transform cursor-pointer"
                >
                  <div className="w-[60%] flex flex-col justify-center border-l-2 border-white">
                    <div className="md:p-3 p-2 md:h-[40%] h-[30%]">
                      <h3 className="md:text-lg text-sm font-normal text-white opacity-70">{item.status}</h3>
                      <h3 className="md:text-xl text-md font-semibold text-white">{item.title}</h3>
                    </div>
                    <div className="md:h-[60%] h-[70%] flex flex-col justify-between md:p-3 p-2 md:pt-6 mt-4">
                      <p className="text-white opacity-70 md:text-md text-sm line-clamp-2">{item.description}</p>
                      <div className='text-white opacity-70 md:text-md text-sm'>
                        <span>{item.volume}</span>
                        <span className="mx-2">•</span>
                        <span>{item.chapter}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {item.genres.map((genre, i) => (
                          <span key={i} className="md:text-md text-[12px] pr-2 text-white">{genre}</span>
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
              </div>
            ))}
          </div>
        )}
      </div>
      <button
        onClick={prevSlide}
        className="absolute md:w-16 left-0 top-1/2 transform -translate-y-1 shadow-md bg-[#a962ff] bg-opacity-70 py-2 rounded-md z-10 flex justify-start items-center hover:bg-opacity-100 transition-colors duration-200"
      >
        <ChevronLeft className="text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute md:w-16 right-0 top-1/2 transform -translate-y-1 shadow-md bg-[#a962ff] bg-opacity-70 py-2 rounded-md z-10 flex justify-end items-center hover:bg-opacity-100 transition-colors duration-200"
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
};

export default MangaCarousel;
