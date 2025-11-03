"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AVAILABLE_GENRES, AVAILABLE_TYPES, ALPHABET_CHARS } from "../constants/searchConstants";
import { useSearchStore } from "../../../store/searchStore";

interface SearchFiltersProps {
  onFilterChange: (key: string, value: string) => void;
}

export const SearchFilters = ({ onFilterChange }: SearchFiltersProps) => {
  const filters = useSearchStore((state) => state.filters);

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              value={filters.query}
              onChange={(e) => onFilterChange('query', e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Genre Filter */}
          <Select 
            value={filters.genre || "all"} 
            onValueChange={(value) => onFilterChange('genre', value === "all" ? "" : value)}
          >
            <SelectTrigger className="bg-zinc-900">
              <SelectValue placeholder="Select genre" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectItem value="all">All Genres</SelectItem>
              {AVAILABLE_GENRES.map((genre) => (
                <SelectItem key={genre} value={genre}>{genre}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Type Filter */}
          <Select 
            value={filters.type || "all"} 
            onValueChange={(value) => onFilterChange('type', value === "all" ? "" : value)}
          >
            <SelectTrigger className="bg-zinc-900">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectItem value="all">All Types</SelectItem>
              {AVAILABLE_TYPES.map((type) => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Character Filter */}
          <Select 
            value={filters.character || "all"} 
            onValueChange={(value) => onFilterChange('character', value === "all" ? "" : value)}
          >
            <SelectTrigger className="bg-zinc-900">
              <SelectValue placeholder="A-Z" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              <SelectItem value="all">All</SelectItem>
              {ALPHABET_CHARS.map((char) => (
                <SelectItem key={char} value={char}>{char}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

