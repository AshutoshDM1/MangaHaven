"use client";

import { MangaSearchResult } from "@/services/apiv2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Star } from "lucide-react";

const MangaView = ({selectedManga}: {selectedManga: MangaSearchResult | null}) => {

  return (
    <div className="w-full max-w-4xl mx-auto p-0 space-y-6 flex flex-col items-center justify-center">
      {selectedManga ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between p-0">
              <span>Selected Manga</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-6">
              {/* Manga Cover */}
              <div className="flex-shrink-0">
                <img
                  src={selectedManga.coverImageUrl}
                  alt={selectedManga.title}
                  className="w-48 h-64 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                  }}
                />
              </div>

              {/* Manga Details */}
              <div className="flex-1 space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                    {selectedManga.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    {selectedManga.description}
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <BookOpen className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Total Chapters: <strong>{selectedManga.totalChapter}</strong>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Available: <strong>{selectedManga.totalAvailableChapter}</strong>
                    </span>
                  </div>
                </div>

                {/* Genres */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Genres
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedManga.genres.map((genre) => (
                      <span 
                        key={genre}
                        className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Manga ID (for admin purposes) */}
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Manga ID: {selectedManga.id}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
         <Card className="border-dashed">
          <CardContent className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No manga selected
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Use the search box above to find and select a manga to view its details
            </p>
          </CardContent>
        </Card>
        </>
      )}
    </div>
  );
};

export default MangaView;