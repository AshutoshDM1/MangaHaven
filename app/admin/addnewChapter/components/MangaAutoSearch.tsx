"use client";

import { useState, useEffect, useCallback } from "react";
import { searchManga, MangaSearchResult } from "@/services/apiv2";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, BookOpen } from "lucide-react";

interface MangaAutoSearchProps {
  onMangaSelect?: (manga: MangaSearchResult) => void;
  placeholder?: string;
}

const MangaAutoSearch = ({ onMangaSelect, placeholder = "Search for manga..." }: MangaAutoSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<MangaSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim().length < 2) {
        setSearchResults([]);
        setShowResults(false);
        return;
      }

      setIsLoading(true);
      try {
        const results = await searchManga(query.trim());
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
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

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

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding results to allow clicking on results
    setTimeout(() => setShowResults(false), 200);
  };

  return (
        <div className="relative w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="pl-10 pr-4 py-2 w-full"
        />
      </div>

      {/* Search Results Dropdown */}
      {showResults && (
        <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-96 overflow-y-auto search-dropdown">
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
                <div
                  key={manga.id}
                  className="px-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 cursor-pointer border-b border-zinc-100 dark:border-zinc-700 last:border-b-0"
                  onClick={() => handleMangaSelect(manga)}
                >
                  <div className="flex items-start space-x-3">
                    <img
                      src={manga.coverImageUrl}
                      alt={manga.title}
                      className="w-12 h-16 object-cover rounded"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                        {manga.title}
                      </h4>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 overflow-hidden text-ellipsis" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
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
                          <span key={genre} className="inline-flex items-center rounded-full border border-zinc-200 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-700 px-2 py-0.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">
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
                </div>
              ))}
            </div>
          ) : searchQuery.trim().length >= 2 ? (
            <div className="px-4 py-8 text-center text-zinc-500 dark:text-zinc-400">
              <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No manga found for "{searchQuery}"</p>
            </div>
          ) : null}
        </div>
      )}
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

export default MangaAutoSearch;