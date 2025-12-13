"use client";

import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MangaCard } from "./MangaCard";
import { SearchPagination } from "./SearchPagination";
import { useSearchStore } from "../../../store/searchStore";
import type { MangaSearchResult, SearchResponse } from "@/services/apiv2";

interface SearchResultsGridProps {
  searchResults: SearchResponse;
  onPageChange: (page: number) => void;
  onClearFilters: () => void;
}

export const SearchResultsGrid = ({ 
  searchResults, 
  onPageChange,
  onClearFilters 
}: SearchResultsGridProps) => {
  const viewMode = useSearchStore((state) => state.viewMode);

  return (
    <>
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-semibold">Search Results</h2>
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
        <>
          <div 
            className={`grid gap-6 mb-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1'
            }`}
          >
            {searchResults.data.map((manga) => (
              <MangaCard key={manga.slug} manga={manga} viewMode={viewMode} />
            ))}
          </div>

          {/* Pagination */}
          <SearchPagination
            currentPage={searchResults.pagination.currentPage}
            totalPages={searchResults.pagination.totalPages}
            hasNextPage={searchResults.pagination.hasNextPage}
            hasPreviousPage={searchResults.pagination.hasPreviousPage}
            onPageChange={onPageChange}
          />
        </>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-lg font-semibold mb-2">No manga found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search filters or search terms
          </p>
          <Button onClick={onClearFilters} variant="outline">
            Clear all filters
          </Button>
        </div>
      )}
    </>
  );
};

