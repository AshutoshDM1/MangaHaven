'use client';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CardContent } from '@/components/ui/card';
import { useSearchStore } from '@/store/searchStore';
import { useSearchOperations } from '@/hooks/useSearchOperations';
import { SearchFilters as SearchFiltersType } from '@/services/apiv2';
import { SearchFilters } from './components/SearchFilters';
import { ActiveFilters } from './components/ActiveFilters';
import { ViewControls } from './components/ViewControls';
import { SearchResultsGrid } from './components/SearchResultsGrid';
import { SearchLoading } from './components/SearchLoading';
import { EmptyState } from './components/EmptyState';
import Section from '@/components/common/Section/Section';

const SearchPage = () => {
  const searchParams = useSearchParams();
  const { searchResults, isLoading, setFilters } = useSearchStore();
  const {
    handleFilterChange,
    handlePageChange,
    handleLimitChange,
    clearFilters,
    clearFilter,
    debouncedSearch,
  } = useSearchOperations();

  // Initial search based on URL params
  useEffect(() => {
    const initialFilters = {
      query: searchParams.get('q') || '',
      genre: searchParams.get('genre') || '',
      type: searchParams.get('type') || '',
      character: searchParams.get('character') || '',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '8'),
    };

    setFilters(initialFilters);
    debouncedSearch(initialFilters);
  }, [searchParams, setFilters, debouncedSearch]);

  return (
    <Section className='py-8' >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Search Manga</h1>
        <p className="text-muted-foreground">
          Find your favorite manga by title, genre, type, or browse alphabetically
        </p>
      </div>

      {/* Search Filters */}
      <SearchFilters onFilterChange={handleFilterChange} />

      {/* Active Filters and Controls */}
      <div className="mb-8">
        <CardContent className="p-6 border rounded-lg">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <ActiveFilters
              onClearFilter={(filterType) => clearFilter(filterType as keyof SearchFiltersType)}
              onClearAll={clearFilters}
            />
            <ViewControls onLimitChange={handleLimitChange} />
          </div>
        </CardContent>
      </div>

      {/* Results */}
      {isLoading ? (
        <SearchLoading />
      ) : searchResults ? (
        <SearchResultsGrid
          searchResults={searchResults}
          onPageChange={handlePageChange}
          onClearFilters={clearFilters}
        />
      ) : (
        <EmptyState />
      )}
    </Section>
  );
};

export default SearchPage;
