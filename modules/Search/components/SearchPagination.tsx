"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchPaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
}

export const SearchPagination = ({
  currentPage,
  totalPages,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
}: SearchPaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPreviousPage}
      >
        <ChevronLeft className="h-4 w-4 mr-2" />
        Previous
      </Button>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          const page = currentPage - 2 + i;
          if (page < 1 || page > totalPages) return null;
          
          return (
            <Button
              key={page}
              variant={page === currentPage ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          );
        })}
      </div>
      
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNextPage}
      >
        Next
        <ChevronRight className="h-4 w-4 ml-2" />
      </Button>
    </div>
  );
};

