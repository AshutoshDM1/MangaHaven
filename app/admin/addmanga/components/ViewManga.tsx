import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Calendar, Tag, FileText } from "lucide-react";
import Image from "next/image";

interface MangaData {
  title: string;
  description: string;
  totalAvailableChapter: number;
  genres: string;
  coverImageUrl: string;
}

interface ViewMangaProps {
  mangaData: MangaData;
}

const ViewManga = ({ mangaData }: ViewMangaProps) => {
  const genresArray = mangaData.genres
    ? mangaData.genres.split(",").map((genre) => genre.trim()).filter(Boolean)
    : [];

  const hasData = mangaData.title || mangaData.description || mangaData.coverImageUrl || mangaData.genres;

  return (
    <Card className="min-w-[30vw] min-h-[85vh] bg-gradient-to-br from-zinc-900 to-zinc-800 border-zinc-700 shadow-xl">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-primary" />
          Manga Preview
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 h-full">
        {!hasData ? (
          <div className="text-center py-8 text-zinc-400">
            <BookOpen className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Fill in the manga details to see the preview</p>
          </div>
        ) : (
          <>
            {/* Cover Image */}
            <div className="relative h-[450px] bg-zinc-800 rounded-lg overflow-hidden">
              {mangaData.coverImageUrl ? (
                <Image
                  src={mangaData.coverImageUrl}
                  alt={mangaData.title || "Manga Cover"}
                  fill
                  className="object-cover aspect-[3/4]"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-manga.jpg";
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-zinc-700">
                  <FileText className="h-16 w-16 text-zinc-500" />
                </div>
              )}
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Title overlay */}
              {mangaData.title && (
                <div className="absolute bottom-3 left-3 right-3">
                  <h2 className="text-white font-bold text-lg leading-tight drop-shadow-lg">
                    {mangaData.title}
                  </h2>
                </div>
              )}
            </div>

            {/* Manga Details */}
            <div className="space-y-3">
                          {/* Chapter Info */}
            {mangaData.totalAvailableChapter > 0 && (
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-zinc-300">
                    Available Chapters: 
                    <span className="font-semibold text-white ml-1">
                      {mangaData.totalAvailableChapter}
                    </span>
                  </span>
                </div>
              )}

              {/* Genres */}
              {genresArray.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Tag className="h-4 w-4 text-primary" />
                    <span>Genres</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {genresArray.map((genre, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-md bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30 transition-colors"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Description */}
              {mangaData.description && (
                <>
                  <Separator className="bg-zinc-700" />
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm text-zinc-300">
                      <FileText className="h-4 w-4 text-primary" />
                      <span>Description</span>
                    </div>
                    <p className="text-sm text-zinc-300 leading-relaxed custom-scrollbar">
                      {mangaData.description}
                    </p>
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
      
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #374151;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #6b7280;
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </Card>
  );
};

export default ViewManga;