import { useState, useEffect, useCallback, useRef } from "react";
import { searchMangaAdvanced, MangaSearchResult } from "@/services/apiv2";
import { debounce } from "@/utils/debounce";

export const useDownloadMangaSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MangaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  const [selectedManga, setSelectedManga] = useState<MangaSearchResult | null>(null);
  
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string, genre: string) => {
      if (query.trim().length < 2 && !genre) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchMangaAdvanced({
          query: query.trim() || undefined,
          genre: genre || undefined,
        });
        setSearchResults(results);
        setShowResults(true);
      } catch (error) {
        console.error("Error searching manga:", error);
        setSearchResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debouncedSearch(searchQuery, selectedGenre);
  }, [searchQuery, selectedGenre, debouncedSearch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleMangaSelect = (manga: MangaSearchResult) => {
    setSelectedManga(manga);
    setShowResults(false);
    setSearchQuery(manga.title);
  };

  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre);
    setShowGenreDropdown(false);
  };

  const clearGenreFilter = () => {
    setSelectedGenre("");
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0 || searchQuery.length >= 2 || selectedGenre) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow clicking on results
    setTimeout(() => setShowResults(false), 200);
  };

  // Handle clicking outside to close results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setShowResults(false);
        setShowGenreDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    // State
    searchQuery,
    selectedGenre,
    searchResults,
    isLoading,
    showResults,
    showGenreDropdown,
    selectedManga,
    searchContainerRef,
    // Setters
    setSearchQuery,
    setSelectedGenre,
    setShowResults,
    setShowGenreDropdown,
    setSelectedManga,
    // Handlers
    handleInputChange,
    handleMangaSelect,
    handleGenreSelect,
    clearGenreFilter,
    handleInputFocus,
    handleInputBlur,
  };
};

