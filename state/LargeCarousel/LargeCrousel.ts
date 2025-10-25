import { create } from 'zustand';

interface LargeCarousel {
  id: number;
  title: string;
  coverImageUrl: string;
  description: string;
  totalChapter: number;
  totalAvailableChapter: number;
  genres: string[];
}

interface LargeCarouselState {
  largeCarousel: LargeCarousel[];
  setLargeCarousel: (largeCarousel: LargeCarousel[]) => void;
}

const useLargeCarouselStore = create<LargeCarouselState>((set) => ({
  largeCarousel: [],
  setLargeCarousel: (largeCarousel) => set({ largeCarousel }),
}));

export default useLargeCarouselStore;
