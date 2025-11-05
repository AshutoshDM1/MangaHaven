"use client";

import { BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";

interface MangaCardProps {
  manga: {
    id: number;
    title: string;
    description: string;
    coverImageUrl: string;
    totalChapter: number;
    totalAvailableChapter: number;
    genres: string[];
  };
  viewMode: 'grid' | 'list';
}

export const MangaCard = ({ manga, viewMode }: MangaCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <Link href={`/read/${manga.id}`}>
          {viewMode === 'grid' ? (
            <div className="space-y-3">
              <div className="relative h-80 w-full">
                <Image
                  src={manga.coverImageUrl}
                  alt={manga.title}
                  fill
                  className="object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                  }}
                />
              </div>
              <div className="p-4 space-y-2">
                <h3 className="font-semibold text-foreground line-clamp-2">
                  {manga.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {manga.description}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="h-3 w-3" />
                  {manga.totalAvailableChapter}/{manga.totalChapter} chapters
                </div>
                <div className="flex flex-wrap gap-1">
                  {manga.genres.slice(0, 2).map((genre) => (
                    <Badge key={genre} variant="outline" className="text-xs">
                      {genre}
                    </Badge>
                  ))}
                  {manga.genres.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{manga.genres.length - 2}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex space-x-4 p-4">
              <div className="relative h-24 w-16 flex-shrink-0">
                <Image
                  src={manga.coverImageUrl}
                  alt={manga.title}
                  fill
                  className="object-cover rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder-manga.png";
                  }}
                />
              </div>
              <div className="flex-1 space-y-2">
                <h3 className="font-semibold text-foreground">
                  {manga.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {manga.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-3 w-3" />
                    {manga.totalAvailableChapter}/{manga.totalChapter} chapters
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {manga.genres.slice(0, 3).map((genre) => (
                      <Badge key={genre} variant="outline" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                    {manga.genres.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{manga.genres.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Link>
      </CardContent>
    </Card>
  );
};

