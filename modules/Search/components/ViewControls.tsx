"use client";

import { Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore } from "../../../store/searchStore";

interface ViewControlsProps {
  onLimitChange: (limit: string) => void;
}

export const ViewControls = ({ onLimitChange }: ViewControlsProps) => {
  const viewMode = useSearchStore((state) => state.viewMode);
  const setViewMode = useSearchStore((state) => state.setViewMode);
  const limit = useSearchStore((state) => state.filters.limit);

  return (
    <div className="flex items-center gap-2">
      {/* Results per page */}
      <Select value={limit?.toString()} onValueChange={onLimitChange}>
        <SelectTrigger className="w-20 bg-zinc-900">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="8">8</SelectItem>
          <SelectItem value="16">16</SelectItem>
          <SelectItem value="24">24</SelectItem>
          <SelectItem value="32">32</SelectItem>
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
  );
};

