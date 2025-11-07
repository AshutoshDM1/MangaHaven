"use client";
import { Search, BookOpen, Filter, X, Download } from "lucide-react";
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
import { useDownloadMangaSearch } from "./hooks/useDownloadMangaSearch";
import { AVAILABLE_GENRES } from "./lib/constants";
import { handleDownload as downloadManga } from "./lib/handlers";

const DownloadMangaPage = () => {
  const {
    searchQuery,
    selectedGenre,
    searchResults,
    isLoading,
    showResults,
    showGenreDropdown,
    selectedManga,
    searchContainerRef,
    setShowGenreDropdown,
    handleInputChange,
    handleMangaSelect,
    handleGenreSelect,
    clearGenreFilter,
    handleInputFocus,
    handleInputBlur,
  } = useDownloadMangaSearch();

  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen p-8">
      <div className="max-w-4xl mx-auto w-full flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Download Manga</h1>
          <p className="text-muted-foreground">Search and select a manga to download</p>
        </div>

        {/* Search Container */}
        <div className="relative w-full" ref={searchContainerRef}>
          <div className="flex items-center gap-3">
            {/* Search Input Container */}
            <div className="relative flex-1">
              <Input
                className="h-12 w-full pl-12 pr-4"
                type="text"
                placeholder="Search manga by title..."
                value={searchQuery}
                onChange={handleInputChange}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>

            {/* Genre Filter Button */}
            <div className="relative">
              <DropdownMenu open={showGenreDropdown} onOpenChange={setShowGenreDropdown}>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="default"
                    className="h-12"
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
                size="default"
                onClick={clearGenreFilter}
                className="h-12 px-2"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {/* Active Filters Display */}
          {selectedGenre && (
            <div className="flex items-center gap-2 mt-3">
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
            <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-background border rounded-md shadow-lg max-h-96 overflow-y-auto">
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
                      className="px-4 py-3 hover:bg-muted cursor-pointer border-b last:border-b-0"
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
                          <h4 className="text-sm font-medium truncate">
                            {manga.title}
                          </h4>
                          <p
                            className="text-xs text-muted-foreground mt-1 overflow-hidden text-ellipsis"
                            style={{
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {manga.description}
                          </p>
                          <div className="flex items-center mt-2 space-x-2">
                            <div className="flex items-center text-xs text-muted-foreground">
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
                                    : "border-border bg-muted"
                                }`}
                              >
                                {genre}
                              </span>
                            ))}
                            {manga.genres.length > 3 && (
                              <span className="inline-flex items-center rounded-full border border-border bg-transparent px-2 py-0.5 text-xs font-medium text-muted-foreground">
                                +{manga.genres.length - 3}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (searchQuery.trim().length >= 2 || selectedGenre) ? (
                <div className="px-4 py-8 text-center text-muted-foreground">
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

        {/* Selected Manga Display */}
        {selectedManga && (
          <div className="border rounded-lg p-6 bg-muted/50">
            <div className="flex items-start gap-4">
              <Image
                src={selectedManga.coverImageUrl}
                alt={selectedManga.title}
                width={120}
                height={160}
                className="w-24 h-32 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                }}
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedManga.title}</h2>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                  {selectedManga.description}
                </p>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <BookOpen className="h-4 w-4 mr-1" />
                    {selectedManga.totalAvailableChapter}/{selectedManga.totalChapter} chapters
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedManga.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
                <Button 
                  onClick={() => downloadManga(selectedManga)}
                  className="w-full sm:w-auto"
                  size="lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Manga
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DownloadMangaPage;


