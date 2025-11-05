import { create } from 'zustand';
import { SearchFilters, SearchResponse } from '@/services/apiv2';

interface SearchState {
  // State
  filters: SearchFilters;
  searchResults: SearchResponse | null;
  isLoading: boolean;
  viewMode: 'grid' | 'list';
  
  // Actions
  setFilters: (filters: SearchFilters) => void;
  updateFilter: (key: keyof SearchFilters, value: string | number) => void;
  setSearchResults: (results: SearchResponse | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setViewMode: (viewMode: 'grid' | 'list') => void;
  clearFilters: () => void;
  clearFilter: (filterType: keyof SearchFilters) => void;
  getActiveFiltersCount: () => number;
}

const defaultFilters: SearchFilters = {
  query: '',
  genre: '',
  type: '',
  character: '',
  page: 1,
  limit: 8,
};

export const useSearchStore = create<SearchState>((set, get) => ({
  // Initial State
  filters: defaultFilters,
  searchResults: null,
  isLoading: false,
  viewMode: 'grid',

  // Actions
  setFilters: (filters) => set({ filters }),
  
  updateFilter: (key, value) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: value,
      page: key === 'page' ? (typeof value === 'number' ? value : 1) : 1, // Reset to page 1 unless updating page
    }
  })),

  setSearchResults: (results) => set({ searchResults: results }),
  
  setIsLoading: (isLoading) => set({ isLoading }),
  
  setViewMode: (viewMode) => set({ viewMode }),
  
  clearFilters: () => set({ filters: defaultFilters }),
  
  clearFilter: (filterType) => set((state) => ({
    filters: {
      ...state.filters,
      [filterType]: filterType === 'page' ? 1 : filterType === 'limit' ? 8 : '',
      page: 1,
    }
  })),
  
  getActiveFiltersCount: () => {
    const { filters } = get();
    return [filters.query, filters.genre, filters.type, filters.character]
      .filter(Boolean).length;
  },
}));

