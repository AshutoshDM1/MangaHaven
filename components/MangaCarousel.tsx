import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MangaItem } from './data/mangaData';

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
      
      const carousel = document.getElementById('carousel');
      carousel?.addEventListener('transitionend', transitionEnd);
      
      return () => carousel?.removeEventListener('transitionend', transitionEnd);
    }
  }, [currentIndex, isTransitioning, extendedItems.length]);

  const getTransformValue = () => {
    return `translateX(-${currentIndex * 33.33}%)`;
  };

  return (
    <div className='w-full flex justify-center'>
      <div className="w-full max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] text-white p-4 relative">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {items.slice(currentIndex, currentIndex + 3).map((item, index) => (
            <div key={index} className="bg-gray-800 rounded-xl overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                <p className="text-sm mb-2 text-gray-400">{item.description}</p>
                <p className="text-sm mb-1">{`${item.chapter} - ${item.volume}`}</p>
                <div className="flex flex-wrap gap-1">
                  {item.genres.map((genre, i) => (
                    <span key={i} className="text-xs bg-gray-700 px-2 py-1 rounded">{genre}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-r">
          <ChevronLeft size={24} />
        </button>
        <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-l">
          <ChevronRight size={24} />
        </button>
        {/* <p className="text-center mt-4 text-sm text-gray-400">
          If you enjoy the website, please consider sharing it with your friends. Thank you!
        </p> */}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-r z-10"
        style={{ left: '2%' }}
      >
        <ChevronLeft className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 p-2 rounded-l z-10"
        style={{ right: '2%' }}
      >
        <ChevronRight className="text-white" />
      </button>
    </div>
  );
};

export default MangaCarousel;
