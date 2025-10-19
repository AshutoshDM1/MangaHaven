"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, BookOpen, Filter, X } from "lucide-react";
import { searchMangaAdvanced, MangaSearchResult } from "@/services/apiv2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import Link from "next/link";

// Available genres from the system
const AVAILABLE_GENRES = [
  "Action", "Adventure", "Comedy", "Fantasy", "Demons", "Harem", 
  "Horror", "Isekai", "Magic", "Romance", "Ecchi", "Mecha", 
  "Space", "Slice of Life", "Shounen", "Mystery", "School", 
  "Sports", "Supernatural", "Thriller", "Seinen", "Suspense"
];

interface MainAutoSearchProps {
  onMangaSelect?: (manga: MangaSearchResult) => void;
  placeholder?: string;
  showResultsOnClick?: boolean;
}

const MainAutoSearch = ({ 
  onMangaSelect, 
  placeholder = "Search Manga...",
  showResultsOnClick = true 
}: MainAutoSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");
  const [searchResults, setSearchResults] = useState<MangaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showGenreDropdown, setShowGenreDropdown] = useState(false);
  
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
    if (onMangaSelect) {
      onMangaSelect(manga);
    }
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
    if (showResultsOnClick && (searchResults.length > 0 || searchQuery.length >= 2 || selectedGenre)) {
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

  return (
    <div className="flex items-center gap-3">
      <div className="relative w-full h-full justify-center items-center gap-3 lg:flex hidden select-none" ref={searchContainerRef}>
        {/* Search Input Container */}
        <div className="relative flex items-center w-[65vh]">
          <Input
            className="h-[4.5vh] w-full text-black dark:text-white bg-zinc-200 dark:bg-zinc-900 rounded-full border-none focus:border focus:outline-none pl-12 pr-4"
            type="text"
            placeholder={placeholder}
            value={searchQuery}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <Search className="absolute left-4 h-4 w-4 text-[#c4c4c4]" />
        </div>

        {/* Genre Filter Button */}
        <div className="relative">
          <DropdownMenu open={showGenreDropdown} onOpenChange={setShowGenreDropdown}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-[4.5vh] rounded-full border-zinc-300 dark:border-zinc-600 bg-zinc-200 dark:bg-zinc-900"
              >
                <Filter className="h-4 w-4 mr-2" />
                {selectedGenre || "Genre"}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[200px] max-h-[300px] overflow-y-auto">
              {AVAILABLE_GENRES.map((genre) => (
                <DropdownMenuItem
                  key={genre}
                  onClick={() => handleGenreSelect(genre)}
                  className="cursor-pointer"
                >
                  {genre}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Clear Genre Filter */}
        {selectedGenre && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearGenreFilter}
            className="h-[4.5vh] px-2 text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          >
            <X className="h-4 w-4" />
          </Button>
        )}

        {/* Active Filters Display */}
        {selectedGenre && (
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {selectedGenre}
              <X 
                className="ml-1 h-3 w-3 cursor-pointer" 
                onClick={clearGenreFilter}
              />
            </Badge>
          </div>
        )}

        {/* Search Results Dropdown */}
        {showResults && (
          <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-96 overflow-y-auto">
            {isLoading ? (
              <div className="p-4 space-y-3">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="flex space-x-3">
                    <Skeleton className="h-16 w-12 rounded" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-3 w-1/2" />
                    </div>
                  </div>
                ))}
              </div>
            ) : searchResults.length > 0 ? (
              <div className="py-2">
                {searchResults.map((manga) => (
                  <Link 
                    key={manga.id} 
                    href={`/read/${manga.id}`}
                    className="block px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer border-b border-zinc-100 dark:border-zinc-700 last:border-b-0"
                    onClick={() => handleMangaSelect(manga)}
                  >
                    <div className="flex items-start space-x-3">
                      <Image
                        src={manga.coverImageUrl}
                        alt={manga.title}
                        width={48}
                        height={64}
                        className="w-12 h-16 object-cover rounded"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                          {manga.title}
                        </h4>
                        <p
                          className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 overflow-hidden text-ellipsis"
                          style={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                          }}
                        >
                          {manga.description}
                        </p>
                        <div className="flex items-center mt-2 space-x-2">
                          <div className="flex items-center text-xs text-zinc-500">
                            <BookOpen className="h-3 w-3 mr-1" />
                            {manga.totalAvailableChapter}/{manga.totalChapter} chapters
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {manga.genres.slice(0, 3).map((genre) => (
                            <span
                              key={genre}
                              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                                selectedGenre === genre
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-300"
                              }`}
                            >
                              {genre}
                            </span>
                          ))}
                          {manga.genres.length > 3 && (
                            <span className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-500 bg-transparent px-2 py-0.5 text-xs font-medium text-zinc-600 dark:text-zinc-400">
                              +{manga.genres.length - 3}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (searchQuery.trim().length >= 2 || selectedGenre) ? (
              <div className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">
                  No manga found
                  {searchQuery && ` for "${searchQuery}"`}
                  {selectedGenre && ` in genre "${selectedGenre}"`}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
      
      {/* Mobile Search Icon */}
      <Search className="h-8 w-8 text-[#c4c4c4] text-xl cursor-pointer lg:hidden" />
    </div>
  );
};

// Debounce utility function
function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export default MainAutoSearch;
