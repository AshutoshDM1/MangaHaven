import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MangaItem } from "./data/mangaData";

interface MangaCarouselProps {
  items: MangaItem[];
}

const MangaCarousel: React.FC<MangaCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(3);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Clone the array for infinite effect
  const extendedItems = [...items.slice(-3), ...items, ...items.slice(0, 3)];

  const nextSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevSlide = () => {
    if (!isTransitioning) {
      setIsTransitioning(true);
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Automatically slide every 3 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 3000);
    return () => clearInterval(interval); // Clean up the interval on unmount
  }, [isTransitioning]);

  // Handle transition end to reset the index for infinite effect
  useEffect(() => {
    if (isTransitioning) {
      const transitionEnd = () => {
        setIsTransitioning(false);

        // Wrap around logic
        if (currentIndex === extendedItems.length - 3) {
          setCurrentIndex(3); // Reset to the original start
        } else if (currentIndex === 0) {
          setCurrentIndex(extendedItems.length - 6); // Reset to the original end
        }
      };

      const carousel = document.getElementById("carousel");
      carousel?.addEventListener("transitionend", transitionEnd);

      return () =>
        carousel?.removeEventListener("transitionend", transitionEnd);
    }
  }, [currentIndex, isTransitioning, extendedItems.length]);

  const getTransformValue = () => {
    if (typeof window !== "undefined" && window.innerWidth < 1000) {
      // Below md
      return `translateX(-${currentIndex * 100}%)`;
    } else {
      // Full width
      return `translateX(-${currentIndex * 33.33}%)`;
    }
  };
  
  // Add a resize event listener to update the transform value on window resize
  useEffect(() => {
    const handleResize = () => {
      setCurrentIndex((prevIndex) => prevIndex); // Trigger re-render
    };
  
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden p-4 flex justify-center items-center">
      <div className="w-full md:w-[80vw] relative overflow-hidden">
        <div
          id="carousel"
          className={`flex transition-transform duration-500 ease-in-out ${
            isTransitioning ? "" : "transition-none"
          }`}
          style={{ transform: getTransformValue() }}
        >
          {extendedItems.map((item, index) => (
            <div key={index} className="w-full lg:w-1/3 flex-shrink-0 px-2">
              <div
                style={{ boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)' }}
                className="dark:border-[#3a3a3a] border dark:border h-[25vh] flex rounded-lg overflow-hidden"
              >
                <div className="w-[60%] flex flex-col justify-between">
                  <div className="p-3 h-[40%]">
                    <h3 className="text-lg font-normal  opacity-70">
                      {item.status}
                    </h3>
                    <h3 className="text-lg font-semibold ">{item.title}</h3>
                  </div>
                  <div className="text-xs h-[60%] flex flex-col justify-between px-3 pb-2 ">
                    <p className="text-sm text-gray-400  line-clamp-2  lg:hidden 2xl:block ">
                      {item.description}
                    </p>
                    <div>
                      <span>{item.volume}</span>
                      <span className="mx-2">•</span>
                      <span>{item.chapter}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 text-white mt-2 ">
                      {item.genres.map((genre, i) => (
                        <span
                          key={i}
                          className="text-xs  font-semibold bg-[#b341ff] px-2 py-1 rounded"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative w-[40%]">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full  object-cover"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 shadow-md bg-opacity-50 p-2 rounded-md z-10 dark:bg-foreground/10 "
        style={{ left: "2%" }}
      >
        <ChevronLeft className="" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 dark:bg-foreground/10 shadow-md bg-opacity-50 p-2 rounded-md z-10"
        style={{ right: "2%" }}
      >
        <ChevronRight className="" />
      </button>
    </div>
  );
};

export default MangaCarousel;
