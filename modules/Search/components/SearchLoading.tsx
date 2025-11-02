"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSearchStore } from "../../../store/searchStore";

export const SearchLoading = () => {
  const viewMode = useSearchStore((state) => state.viewMode);

  return (
    <div 
      className={`grid gap-6 ${
        viewMode === 'grid' 
          ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
          : 'grid-cols-1'
      }`}
    >
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
  );
};

