import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { MangaItem } from './data/mangaData';

interface MangaCarouselProps {
  items: MangaItem[];
}

const MangaCarousel: React.FC<MangaCarouselProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
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
    </div>
  );
};

export default MangaCarousel;