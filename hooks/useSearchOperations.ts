"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { searchMangaWithFilters, SearchFilters } from "@/services/apiv2";
import { useSearchStore } from "@/store/searchStore";
import { debounce } from "@/utils/debounce";

export const useSearchOperations = () => {
  const router = useRouter();
  const { 
    filters, 
    setFilters, 
    setSearchResults, 
    setIsLoading,
    clearFilters: clearStoreFilters,
    clearFilter: clearStoreFilter
  } = useSearchStore();

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (searchFilters: SearchFilters) => {
      setIsLoading(true);
      try {
        const results = await searchMangaWithFilters(searchFilters);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching manga:", error);
        setSearchResults(null);
      } finally {
        setIsLoading(false);
      }
    }, 500),
    [setIsLoading, setSearchResults]
  );

  // Update URL and perform search
  const updateSearchAndURL = useCallback((newFilters: SearchFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.query) params.set('q', newFilters.query);
    if (newFilters.genre) params.set('genre', newFilters.genre);
    if (newFilters.type) params.set('type', newFilters.type);
    if (newFilters.character) params.set('character', newFilters.character);
    if (newFilters.page && newFilters.page > 1) params.set('page', newFilters.page.toString());
    if (newFilters.limit && newFilters.limit !== 8) params.set('limit', newFilters.limit.toString());

    const newURL = params.toString() ? `/dashboard/search?${params.toString()}` : '/dashboard/search';
    router.push(newURL, { scroll: false });
    
    setFilters(newFilters);
    debouncedSearch(newFilters);
  }, [router, setFilters, debouncedSearch]);

  // Filter change handlers
  const handleFilterChange = useCallback((key: string, value: string) => {
    updateSearchAndURL({ ...filters, [key]: value, page: 1 });
  }, [filters, updateSearchAndURL]);

  const handlePageChange = useCallback((page: number) => {
    updateSearchAndURL({ ...filters, page });
  }, [filters, updateSearchAndURL]);

  const handleLimitChange = useCallback((limit: string) => {
    updateSearchAndURL({ ...filters, limit: parseInt(limit), page: 1 });
  }, [filters, updateSearchAndURL]);

  const clearFilters = useCallback(() => {
    clearStoreFilters();
    updateSearchAndURL({ query: '', genre: '', type: '', character: '', page: 1, limit: 8 });
  }, [clearStoreFilters, updateSearchAndURL]);

  const clearFilter = useCallback((filterType: keyof SearchFilters) => {
    clearStoreFilter(filterType);
    updateSearchAndURL({ ...filters, [filterType]: '', page: 1 });
  }, [filters, clearStoreFilter, updateSearchAndURL]);

  return {
    handleFilterChange,
    handlePageChange,
    handleLimitChange,
    clearFilters,
    clearFilter,
    debouncedSearch,
  };
};

