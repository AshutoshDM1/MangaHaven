import { create } from 'zustand';

interface LargeCrousel {
  id: number;
  title: string;
  coverImageUrl: string;
  description: string;
  totalChapter: number;
  totalAvailableChapter: number;
  genres: string[];
}

interface LargeCrouselState {
  largeCrousel: LargeCrousel[];
  setLargeCrousel: (largeCrousel: LargeCrousel[]) => void;
}

const useLargeCrouselStore = create<LargeCrouselState>((set) => ({
  largeCrousel: [],
  setLargeCrousel: (largeCrousel) => set({ largeCrousel }),
}));

export default useLargeCrouselStore;
