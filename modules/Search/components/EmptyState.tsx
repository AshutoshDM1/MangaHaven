"use client";

import { Search } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
      <h3 className="text-lg font-semibold mb-2">Start searching</h3>
      <p className="text-muted-foreground">
        Use the filters above to find your favorite manga
      </p>
    </div>
  );
};

