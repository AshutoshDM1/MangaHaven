"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSearchStore } from "../../../store/searchStore";

interface ActiveFiltersProps {
  onClearFilter: (filterType: string) => void;
  onClearAll: () => void;
}

export const ActiveFilters = ({ onClearFilter, onClearAll }: ActiveFiltersProps) => {
  const filters = useSearchStore((state) => state.filters);
  const activeFiltersCount = useSearchStore((state) => state.getActiveFiltersCount());

  if (activeFiltersCount === 0) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-muted-foreground">Active filters:</span>
      
      {filters.query && (
        <Badge variant="secondary" className="gap-1">
          Query: {filters.query}
          <button 
            onClick={() => onClearFilter('query')} 
            className="ml-1 hover:text-destructive"
          >
            ×
          </button>
        </Badge>
      )}
      
      {filters.genre && (
        <Badge variant="secondary" className="gap-1">
          Genre: {filters.genre}
          <button 
            onClick={() => onClearFilter('genre')} 
            className="ml-1 hover:text-destructive"
          >
            ×
          </button>
        </Badge>
      )}
      
      {filters.type && (
        <Badge variant="secondary" className="gap-1">
          Type: {filters.type}
          <button 
            onClick={() => onClearFilter('type')} 
            className="ml-1 hover:text-destructive"
          >
            ×
          </button>
        </Badge>
      )}
      
      {filters.character && (
        <Badge variant="secondary" className="gap-1">
          Starting with: {filters.character}
          <button 
            onClick={() => onClearFilter('character')} 
            className="ml-1 hover:text-destructive"
          >
            ×
          </button>
        </Badge>
      )}
      
      <Button 
        className="bg-zinc-900" 
        variant="outline" 
        size="sm" 
        onClick={onClearAll}
      >
        Clear All
      </Button>
    </div>
  );
};

