import { Dialog, DialogHeader, DialogTitle, DialogContent, DialogDescription, DialogFooter } from "../ui/dialog";
import { deleteMangaChapter, getMangaChapter, getMangaChapterImage } from "@/services/apiv2";
import { useEffect, useState } from "react";
import { MangaChapter, MangaChapterImage } from "@prisma/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Skeleton } from "../ui/skeleton";
import { ChevronRight, BookOpen, Image as ImageIcon, Eye, AlertCircle, Trash } from "lucide-react";
import Image from "next/image";
import { Manga } from "@/app/admin/page";
import { toast } from "sonner";

interface MangaChapterWithImages extends MangaChapter {
  images?: MangaChapterImage[];
}

const ViewMangaChapter = ({ 
  open, 
  setOpen, 
  mangaData 
}: { 
  open: boolean; 
  setOpen: (open: boolean) => void; 
  mangaData: Manga;
}) => {
  const [mangaChapters, setMangaChapters] = useState<MangaChapterWithImages[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<MangaChapterWithImages | null>(null);
  const [viewingImages, setViewingImages] = useState(false);

  const fetchChapterData = async () => {
    if (!open || !mangaData.id) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // Fetch all chapters for this manga
      const chaptersResponse = await getMangaChapter(mangaData.id);
      const chapters: MangaChapter[] = chaptersResponse.data || [];
      
      // Fetch images for each chapter
      const chaptersWithImages = await Promise.all(
        chapters.map(async (chapter) => {
          try {
            const imagesResponse = await getMangaChapterImage(chapter.id);
            return {
              ...chapter,
              images: imagesResponse.data || []
            };
          } catch (error) {
            console.error(`Failed to fetch images for chapter ${chapter.id}:`, error);
            return {
              ...chapter,
              images: []
            };
          }
        })
      );
      
      setMangaChapters(chaptersWithImages);
    } catch (error) {
      console.error("Error fetching chapter data:", error);
      setError("Failed to load chapter data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChapterData();
  }, [open, mangaData.id]);

  const handleViewChapterImages = (chapter: MangaChapterWithImages) => {
    setSelectedChapter(chapter);
    setViewingImages(true);
  };

  const handleBackToChapters = () => {
    setSelectedChapter(null);
    setViewingImages(false);
  };

  const handleDeleteChapter = async (chapterId: number) => {
    try {
      const response = await deleteMangaChapter(chapterId);
      if (response.status === 200) {
        toast.success(response.data.message);
        fetchChapterData();
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error("Error deleting chapter:", error);
    }
  };

  const renderChaptersList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <DialogTitle className="text-xl font-semibold text-white">
            {mangaData.title} - Chapters
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            Total chapters available: {mangaChapters.length}
          </DialogDescription>
        </div>
        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300 border-blue-500/30">
          <BookOpen className="w-3 h-3 mr-1" />
          {mangaChapters.length} Chapters
        </Badge>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i} className="bg-zinc-900 border-zinc-700">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <Skeleton className="h-12 w-12 rounded bg-zinc-700" />
                  <div className="space-y-2 flex-1">
                    <Skeleton className="h-4 w-3/4 bg-zinc-700" />
                    <Skeleton className="h-3 w-1/2 bg-zinc-700" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : error ? (
        <Card className="bg-red-500/10 border-red-500/30">
          <CardContent className="p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <div>
              <p className="text-red-300 font-medium">Error loading chapters</p>
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          </CardContent>
        </Card>
      ) : mangaChapters.length === 0 ? (
        <Card className="bg-zinc-900 border-zinc-700">
          <CardContent className="p-8 text-center">
            <BookOpen className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
            <p className="text-zinc-400">No chapters available for this manga</p>
          </CardContent>
        </Card>
      ) : (
        <div className="h-[400px] overflow-y-auto pr-4 space-y-3">
          {mangaChapters.map((chapter) => (
            <Card 
              key={chapter.id} 
              className="bg-zinc-900 border-zinc-700 hover:border-zinc-600 transition-colors cursor-pointer group"
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">
                        {chapter.chapterNumber}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">
                        Chapter {chapter.chapterNumber}: {chapter.chapterTitle}
                      </h3>
                      <div className="flex items-center space-x-3 mt-1">
                        <Badge variant="outline" className="text-xs border-zinc-600 text-zinc-400">
                          <ImageIcon className="w-3 h-3 mr-1" />
                          {chapter.images?.length || 0} images
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleViewChapterImages(chapter)}
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Images
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDeleteChapter(chapter.id)}
                      className="text-zinc-400 hover:text-white hover:bg-zinc-800"
                    >
                      <Trash className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );

  const renderChapterImages = () => {
    if (!selectedChapter) return null;

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToChapters}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 mb-2"
            >
              ← Back to Chapters
            </Button>
            <DialogTitle className="text-xl font-semibold text-white">
              Chapter {selectedChapter.chapterNumber}: {selectedChapter.chapterTitle}
            </DialogTitle>
            <DialogDescription className="text-zinc-400">
              {selectedChapter.images?.length || 0} images in this chapter
            </DialogDescription>
          </div>
          <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
            <ImageIcon className="w-3 h-3 mr-1" />
            {selectedChapter.images?.length || 0} Images
          </Badge>
        </div>

        {selectedChapter.images && selectedChapter.images.length > 0 ? (
                   <div className="h-[400px] overflow-y-auto pr-4">
           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
             {selectedChapter.images.map((image, index) => (
               <Card key={image.id} className="bg-zinc-900 border-zinc-700 overflow-hidden">
                 <CardContent className="p-0">
                   <div className="relative aspect-[3/4] bg-zinc-800">
                     <Image
                       src={image.imageUrl}
                       alt={`Page ${index + 1}`}
                       fill
                       className="object-cover"
                       onError={(e) => {
                         const target = e.target as HTMLImageElement;
                         target.src = "/placeholder-image.jpg";
                       }}
                     />
                     <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 hover:opacity-100">
                       <Badge className="bg-black/80 text-white">
                         Page {index + 1}
                       </Badge>
                     </div>
                   </div>
                 </CardContent>
               </Card>
             ))}
           </div>
         </div>
        ) : (
          <Card className="bg-zinc-900 border-zinc-700">
            <CardContent className="p-8 text-center">
              <ImageIcon className="w-12 h-12 text-zinc-500 mx-auto mb-3" />
              <p className="text-zinc-400">No images available for this chapter</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[900px] max-h-[80vh] bg-black border-zinc-800">
        <DialogHeader className="pb-4">
          {viewingImages ? renderChapterImages() : renderChaptersList()}
        </DialogHeader>
        
        <DialogFooter className="pt-4 border-t border-zinc-800">
          <Button 
            variant="outline" 
            onClick={() => setOpen(false)}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMangaChapter;