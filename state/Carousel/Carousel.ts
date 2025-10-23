import { create } from 'zustand';

interface Carousel {
  id: number;
  title: string;
  coverImageUrl: string;
  description: string;
  totalChapter: number;
  totalAvailableChapter: number;
  genres: string[];
}

interface CarouselState {
  carousel: Carousel[];
  setCarousel: (carousel: Carousel[]) => void;
}

const useCarouselStore = create<CarouselState>((set) => ({
  carousel: [],
  setCarousel: (carousel) => set({ carousel }),
}));

export default useCarouselStore;
