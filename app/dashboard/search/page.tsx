"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import NavbarMain from "@/components/NavBar/NavbarMain";
import { Search, Filter, ChevronLeft, ChevronRight, BookOpen, Grid, List } from "lucide-react";
import { 
  searchMangaWithFilters, 
  SearchResponse, 
  SearchFilters,
  MangaSearchResult 
} from "@/services/apiv2";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Link from "next/link";

// Available options from the dropdown components
const AVAILABLE_GENRES = [
  "Action", "Adventure", "Comedy", "Fantasy", "Demons", "Harem", 
  "Horror", "Isekai", "Magic", "Romance", "Ecchi", "Mecha", 
  "Space", "Slice of Life", "Shounen", "Mystery", "School", 
  "Sports", "Supernatural", "Thriller", "Seinen", "Suspense"
];

const AVAILABLE_TYPES = ["Manga", "oneShot", "Novel", "One-Short", "Manhwa", "Manhua"];

const ALPHABET_CHARS = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];

const SearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // State management
  const [searchResults, setSearchResults] = useState<SearchResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  // Search filters from URL params
  const [filters, setFilters] = useState<SearchFilters>({
    query: searchParams.get('q') || '',
    genre: searchParams.get('genre') || '',
    type: searchParams.get('type') || '',
    character: searchParams.get('character') || '',
    page: parseInt(searchParams.get('page') || '1'),
    limit: parseInt(searchParams.get('limit') || '20'),
  });

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
    []
  );

  // Update URL and perform search
  const updateSearchAndURL = (newFilters: SearchFilters) => {
    const params = new URLSearchParams();
    
    if (newFilters.query) params.set('q', newFilters.query);
    if (newFilters.genre) params.set('genre', newFilters.genre);
    if (newFilters.type) params.set('type', newFilters.type);
    if (newFilters.character) params.set('character', newFilters.character);
    if (newFilters.page && newFilters.page > 1) params.set('page', newFilters.page.toString());
    if (newFilters.limit && newFilters.limit !== 20) params.set('limit', newFilters.limit.toString());

    const newURL = params.toString() ? `/dashboard/search?${params.toString()}` : '/dashboard/search';
    router.push(newURL, { scroll: false });
    
    setFilters(newFilters);
    debouncedSearch(newFilters);
  };

  // Handle filter changes
  const handleQueryChange = (value: string) => {
    updateSearchAndURL({ ...filters, query: value, page: 1 });
  };

  const handleGenreChange = (value: string) => {
    updateSearchAndURL({ ...filters, genre: value, page: 1 });
  };

  const handleTypeChange = (value: string) => {
    updateSearchAndURL({ ...filters, type: value, page: 1 });
  };

  const handleCharacterChange = (value: string) => {
    updateSearchAndURL({ ...filters, character: value, page: 1 });
  };

  const handlePageChange = (page: number) => {
    updateSearchAndURL({ ...filters, page });
  };

  const handleLimitChange = (limit: string) => {
    updateSearchAndURL({ ...filters, limit: parseInt(limit), page: 1 });
  };

  const clearFilters = () => {
    updateSearchAndURL({ query: '', genre: '', type: '', character: '', page: 1, limit: 20 });
  };

  const clearFilter = (filterType: keyof SearchFilters) => {
    updateSearchAndURL({ ...filters, [filterType]: '', page: 1 });
  };

  // Initial search based on URL params
  useEffect(() => {
    const initialFilters = {
      query: searchParams.get('q') || '',
      genre: searchParams.get('genre') || '',
      type: searchParams.get('type') || '',
      character: searchParams.get('character') || '',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '20'),
    };
    
    setFilters(initialFilters);
    
    // Only search if there are filters or we want to show all manga
    if (Object.values(initialFilters).some(val => val && val !== 1 && val !== 20)) {
      debouncedSearch(initialFilters);
    } else {
      // Show all manga by default
      debouncedSearch(initialFilters);
    }
  }, [searchParams, debouncedSearch]);

  const activeFiltersCount = [filters.query, filters.genre, filters.type, filters.character]
    .filter(Boolean).length;

  return (
    <>
      <NavbarMain />
      <div className="min-h-screen w-full ">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Search Manga
            </h1>
            <p className="text-muted-foreground">
              Find your favorite manga by title, genre, type, or browse alphabetically
            </p>
          </div>

          {/* Search Filters */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by title..."
                    value={filters.query}
                    onChange={(e) => handleQueryChange(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Genre Filter */}
                <Select value={filters.genre || "all"} onValueChange={(value) => handleGenreChange(value === "all" ? "" : value)}>
                  <SelectTrigger className="bg-zinc-900">
                    <SelectValue placeholder="Select genre" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Genres</SelectItem>
                    {AVAILABLE_GENRES.map((genre) => (
                      <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Type Filter */}
                <Select value={filters.type || "all"} onValueChange={(value) => handleTypeChange(value === "all" ? "" : value)}>
                  <SelectTrigger className="bg-zinc-900">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    {AVAILABLE_TYPES.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Character Filter */}
                <Select value={filters.character || "all"} onValueChange={(value) => handleCharacterChange(value === "all" ? "" : value)}>
                  <SelectTrigger className="bg-zinc-900">
                    <SelectValue placeholder="A-Z" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    {ALPHABET_CHARS.map((char) => (
                      <SelectItem key={char} value={char}>{char}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Active Filters and Controls */}
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {activeFiltersCount > 0 && (
                    <>
                      <span className="text-sm text-muted-foreground">Active filters:</span>
                      {filters.query && (
                        <Badge variant="secondary" className="gap-1">
                          Query: {filters.query}
                          <button onClick={() => clearFilter('query')} className="ml-1 hover:text-destructive">×</button>
                        </Badge>
                      )}
                      {filters.genre && (
                        <Badge variant="secondary" className="gap-1">
                          Genre: {filters.genre}
                          <button onClick={() => clearFilter('genre')} className="ml-1 hover:text-destructive">×</button>
                        </Badge>
                      )}
                      {filters.type && (
                        <Badge variant="secondary" className="gap-1">
                          Type: {filters.type}
                          <button onClick={() => clearFilter('type')} className="ml-1 hover:text-destructive">×</button>
                        </Badge>
                      )}
                      {filters.character && (
                        <Badge variant="secondary" className="gap-1">
                          Starting with: {filters.character}
                          <button onClick={() => clearFilter('character')} className="ml-1 hover:text-destructive">×</button>
                        </Badge>
                      )}
                      <Button className="bg-zinc-900" variant="outline" size="sm" onClick={clearFilters}>
                        Clear All
                      </Button>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {/* Results per page */}
                  <Select value={filters.limit?.toString()} onValueChange={handleLimitChange}>
                    <SelectTrigger className="w-20 bg-zinc-900">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="50">50</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* View Mode Toggle */}
                  <div className="flex border rounded-md">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {isLoading ? (
            <div className={`grid gap-6 ${viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
              : 'grid-cols-1'}`}>
              {[...Array(12)].map((_, index) => (
                <Card key={index} className="overflow-hidden">
                  <CardContent className="p-0">
                    {viewMode === 'grid' ? (
                      <div className="space-y-3">
                        <Skeleton className="h-64 w-full" />
                        <div className="p-4 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ) : (
                      <div className="flex space-x-4 p-4">
                        <Skeleton className="h-24 w-16" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                          <Skeleton className="h-3 w-1/3" />
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : searchResults ? (
            <>
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-xl font-semibold">
                    Search Results
                  </h2>
                  <Badge variant="outline">
                    {searchResults.pagination.totalCount} manga found
                  </Badge>
                </div>
                
                {searchResults.pagination.totalCount > 0 && (
                  <span className="text-sm text-muted-foreground">
                    Page {searchResults.pagination.currentPage} of {searchResults.pagination.totalPages}
                  </span>
                )}
              </div>

              {/* Results Grid/List */}
              {searchResults.data.length > 0 ? (
                <div className={`grid gap-6 mb-8 ${viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                  : 'grid-cols-1'}`}>
                  {searchResults.data.map((manga) => (
                    <Card key={manga.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <Link href={`/read/${manga.id}`}>
                          {viewMode === 'grid' ? (
                            <div className="space-y-3">
                              <div className="relative h-64 w-full">
                                <Image
                                  src={manga.coverImageUrl}
                                  alt={manga.title}
                                  fill
                                  className="object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                                  }}
                                />
                              </div>
                              <div className="p-4 space-y-2">
                                <h3 className="font-semibold text-foreground line-clamp-2">
                                  {manga.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {manga.description}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                  <BookOpen className="h-3 w-3" />
                                  {manga.totalAvailableChapter}/{manga.totalChapter} chapters
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {manga.genres.slice(0, 2).map((genre) => (
                                    <Badge key={genre} variant="outline" className="text-xs">
                                      {genre}
                                    </Badge>
                                  ))}
                                  {manga.genres.length > 2 && (
                                    <Badge variant="outline" className="text-xs">
                                      +{manga.genres.length - 2}
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="flex space-x-4 p-4">
                              <div className="relative h-24 w-16 flex-shrink-0">
                                <Image
                                  src={manga.coverImageUrl}
                                  alt={manga.title}
                                  fill
                                  className="object-cover rounded"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                                  }}
                                />
                              </div>
                              <div className="flex-1 space-y-2">
                                <h3 className="font-semibold text-foreground">
                                  {manga.title}
                                </h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">
                                  {manga.description}
                                </p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <div className="flex items-center gap-1">
                                    <BookOpen className="h-3 w-3" />
                                    {manga.totalAvailableChapter}/{manga.totalChapter} chapters
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {manga.genres.slice(0, 3).map((genre) => (
                                      <Badge key={genre} variant="outline" className="text-xs">
                                        {genre}
                                      </Badge>
                                    ))}
                                    {manga.genres.length > 3 && (
                                      <Badge variant="outline" className="text-xs">
                                        +{manga.genres.length - 3}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-semibold mb-2">No manga found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search filters or search terms
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Clear all filters
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {searchResults.data.length > 0 && searchResults.pagination.totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(searchResults.pagination.currentPage - 1)}
                    disabled={!searchResults.pagination.hasPreviousPage}
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous
                  </Button>
                  
                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, searchResults.pagination.totalPages) }, (_, i) => {
                      const page = searchResults.pagination.currentPage - 2 + i;
                      if (page < 1 || page > searchResults.pagination.totalPages) return null;
                      
                      return (
                        <Button
                          key={page}
                          variant={page === searchResults.pagination.currentPage ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(page)}
                        >
                          {page}
                        </Button>
                      );
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    onClick={() => handlePageChange(searchResults.pagination.currentPage + 1)}
                    disabled={!searchResults.pagination.hasNextPage}
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Start searching</h3>
              <p className="text-muted-foreground">
                Use the filters above to find your favorite manga
              </p>
            </div>
          )}
        </div>
      </div>
    </>
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

export default SearchPage;