'use client';
import React, { useState, useEffect } from 'react';
import { easeInOut, motion } from 'framer-motion';
import { useLargeCarousel } from '@/hooks/dashboard/LargeCarousel';
import useLargeCarouselStore from '@/state/LargeCarousel/LargeCrousel';
import LargeCarouselSkeleton from '../skeleton/LargeCarouselSkeleton';
import Link from 'next/link';

const LargeCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isLoading } = useLargeCarousel(1);
  const { largeCarousel } = useLargeCarouselStore();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % largeCarousel.length);
        setIsTransitioning(false);
      }, 800);
    }, 5000);

    return () => clearInterval(interval);
  }, [largeCarousel]);

  if (isLoading) {
    return (
      <>
        <LargeCarouselSkeleton />
      </>
    );
  }
  return (
    <motion.div
      initial={{ opacity: 0 }}
      transition={{ duration: 1, ease: easeInOut }}
      animate={{ opacity: 1 }}
      className="flex justify-center items-center overflow-hidden w-full"
    >
      <div className="md:min-h-[60vh] min-h-[45vh] flex justify-center items-center md:px-4 relative w-full">
        <div className="h-full w-full ease-in duration-700 md:p-5 flex flex-col justify-start items-start md:gap-3 gap-2 relative z-10 p-2  pb-7 ">
          <h2
            className={`md:text-6xl text-2xl font-bold text-[#A977E7] md:w-[150%] w-full transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {largeCarousel[currentIndex]?.title}
          </h2>
          <h3
            className={`md:w-[150%] w-full md:text-[16px] text-sm transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <span className="max-w-lg md:line-clamp-8 line-clamp-3 md:h-[17vh]">
              {largeCarousel[currentIndex]?.description}
            </span>
          </h3>
          <div
            className={`flex flex-wrap gap-2 items-center md:gap-4 transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <Link
              href={`/read/${largeCarousel[currentIndex]?.id}`}
              style={{
                boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
                transition: 'background-color 0.3s ease, transform 0.3s ease',
              }}
              className="rounded-full md:py-2 md:px-4 p-1 px-2 bg-[#995fff] hover:bg-[#A977E7] md:text-lg text-xs"
            >
              Read Now
            </Link>
            <div className="text-white md:opacity-70 md:text-lg text-xs">
              <span>{largeCarousel[currentIndex]?.totalChapter}</span>
              <span className="mx-2">•</span>
              <span>{largeCarousel[currentIndex]?.totalAvailableChapter}</span>
            </div>
          </div>
        </div>
        <div className="md:h-[60vh] h-[45vh] w-full darkopacity-[50%] md:w-[200%] absolute md:relative z-0">
          <img
            src={`${largeCarousel[currentIndex]?.coverImageUrl}`} // Ensure the path is correct
            alt={largeCarousel[currentIndex]?.title}
            className={`md:h-[60vh] h-[30vh] w-[200%] object-cover object-top transition-opacity duration-1000 ${
              isTransitioning ? 'opacity-0' : 'opacity-100'
            }`}
            style={{
              maskImage: 'linear-gradient(from left, transparent, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black, transparent)',
            }}
            width={800} // Added to maintain aspect ratio
            height={450} // Added to maintain aspect ratio
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LargeCarousel;
