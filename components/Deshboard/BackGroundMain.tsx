import React, { useState, useEffect } from 'react';
import { MangaBackground } from "../data/mangaBackgroundData";

interface BackGroundMainProps {
  items: MangaBackground[]
}

const BackGroundMain: React.FC<BackGroundMainProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setIsTransitioning(false);
      }, 800); // Duration of the fade effect
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="flex justify-center items-center overflow-hidden w-full mt-10 md:mt-0 ">
      <div className="md:min-h-[60vh] min-h-[45vh] flex justify-center items-center md:px-4 relative w-full">
        <div className="h-full w-full ease-in duration-700 md:p-5 pb-[7vh]  flex flex-col justify-start items-start md:gap-3 gap-2 relative z-10 p-2">
          <h1 className={`md:text-6xl text-2xl font-bold text-[#A977E7] md:w-[120%] w-full transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            {items[currentIndex].title}
          </h1>
          <h1 className={`md:w-[150%] w-full md:text-[15px] text- transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <span className="md:line-clamp-none line-clamp-3">
              {items[currentIndex].description}
            </span>
          </h1>
          <div className={`flex flex-col justify-center flex-wrap gap-2 items-start md:gap-4 transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <button
              style={{ 
                transition: 'background-color 0.3s ease, transform 0.3s ease'
              }} 
              className="rounded-full md:py-1 md:px-3 p-1 px-2 bg-[#a962ff] hover:bg-[#8b5bc6] md:text-base text-xs"
            >
              Read Now
            </button>
            <div className='text-white md:opacity-70 md:text-xl text-xs'>
              <span>{items[currentIndex].volume}</span>
              <span className="mx-2">•</span>
              <span>{items[currentIndex].chapter}</span>
            </div>
          </div>
        </div>
        <div className="md:h-[60vh] h-[45vh] w-full darkopacity-[50%] md:w-[200%] absolute md:relative z-0">
          <img
            src={items[currentIndex].imageUrl}
            alt={items[currentIndex].title}
            className={`md:h-[60vh] h-[30vh] w-[200%] object-cover transition-opacity duration-1000 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
            style={{
              maskImage:
                "linear-gradient(from left, transparent, black, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black, transparent)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BackGroundMain;