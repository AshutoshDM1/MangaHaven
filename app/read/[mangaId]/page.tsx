"use client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarMain from "@/components/NavBar/NavbarMain";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { 
  BookOpen, 
  Calendar, 
  Star, 
  Eye, 
  Share2, 
  Bookmark,
  Play,
  Search
} from "lucide-react";
import Image from "next/image";
import { getMangaChapter } from "@/services/apiv2";
import { MangaSearchResult } from "@/services/apiv2";
import { getAllManga } from "@/services/apiv2";

interface MangaChapter {
  id: number;
  chapterNumber: number;
  chapterTitle: string;
  mangaId: number;
  createdAt?: string;
}

const ReadPage = () => {
  const { mangaId } = useParams();
  const router = useRouter();
  const [manga, setManga] = useState<MangaSearchResult | null>(null);
  const [chapters, setChapters] = useState<MangaChapter[]>([]);
  const [loading, setLoading] = useState(true);
  const [chaptersLoading, setChaptersLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMangaData = async () => {
      try {
        // Fetch manga details
        const allManga = await getAllManga();
        const foundManga = allManga.find(m => m.id === Number(mangaId));
        setManga(foundManga || null);
        setLoading(false);

        // Fetch chapters
        if (foundManga) {
          const chaptersResponse = await getMangaChapter(foundManga.id);
          setChapters(chaptersResponse.data || []);
        }
        setChaptersLoading(false);
      } catch (error) {
        console.error("Error fetching manga data:", error);
        setLoading(false);
        setChaptersLoading(false);
      }
    };

    if (mangaId) {
      fetchMangaData();
    }
  }, [mangaId]);

  const handleStartReading = () => {
    if (chapters.length > 0) {
      router.push(`/read/${mangaId}/${chapters[0].id}`);
    }
  };

  const handleChapterClick = (chapterId: number) => {
      router.push(`/read/${mangaId}/${chapterId}`);
  };

  const filteredChapters = chapters.filter(chapter =>
    chapter.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chapter.chapterNumber.toString().includes(searchTerm)
  );

  if (loading || !manga) {
    return (
      <>
        <NavbarMain />
        <div className="min-h-screen bg-transparent">
          <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-1">
                <Skeleton className="w-full h-[500px] rounded-lg" />
              </div>
              <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-10 w-1/4" />
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavbarMain />
      <div className="min-h-screen bg-transparent">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-transparent">
          <div className="absolute inset-0 bg-transparent" />
          <div className="relative max-w-7xl mx-auto px-4 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              {/* Manga Cover */}
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-1"
              >
                <Card className="overflow-hidden border-purple-500/20 bg-card/80 backdrop-blur">
                  <CardContent className="p-0">
                    <div className="relative group">
                      <Image
                        src={manga.coverImageUrl}
                        alt={manga.title}
                        width={1200}
                        height={600}
                        className="w-full h-[500px] object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Manga Info */}
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-2 space-y-6"
              >
                <div>
                  <span className="text-sm text-purple-400 font-medium uppercase tracking-wider">
                    RELEASING
                  </span>
                  <h1 className="text-4xl lg:text-5xl font-bold text-foreground mt-2 mb-4">
                    {manga.title}
                  </h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {manga.genres.map((genre) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-purple-500/10 text-purple-300 border-purple-500/20 hover:bg-purple-500/20"
                      >
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-3 rounded-lg bg-card/50 border border-purple-500/20">
                    <BookOpen className="h-6 w-6 text-purple-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-foreground">
                      {manga.totalChapter}
                    </div>
                    <div className="text-sm text-muted-foreground">Chapters</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-card/50 border border-purple-500/20">
                    <Star className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-foreground">8.26</div>
                    <div className="text-sm text-muted-foreground">MAL Rating</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-card/50 border border-purple-500/20">
                    <Eye className="h-6 w-6 text-blue-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-foreground">27.8K</div>
                    <div className="text-sm text-muted-foreground">Readers</div>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-card/50 border border-purple-500/20">
                    <Calendar className="h-6 w-6 text-green-400 mx-auto mb-1" />
                    <div className="text-2xl font-bold text-foreground">31,816</div>
                    <div className="text-sm text-muted-foreground">Views</div>
                  </div>
                </div>

                {/* Description */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {manga.description}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4">
                  <Button 
                    onClick={handleStartReading}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-lg font-medium "
                    disabled={chapters.length === 0}
                  >
                    <Play className="h-5 w-5 mr-2" />
                    START READING
                  </Button>
                  <Button variant="outline" className="border-purple-500/20 hover:bg-purple-500/10">
                    <Bookmark className="h-5 w-5 mr-2" />
                    BOOKMARK
                  </Button>
                  <Button variant="outline" className="border-purple-500/20 hover:bg-purple-500/10">
                    <Share2 className="h-5 w-5 mr-2" />
                    SHARE
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Chapters Section */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h2 className="text-2xl font-bold text-foreground">CHAPTERS</h2>
              <Badge variant="secondary" className="bg-purple-500/10 text-purple-300">
                {chapters.length} chapters
              </Badge>
            </div>
            
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search chapters..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-card border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-foreground"
              />
            </div>
          </div>

          {/* Chapter List */}
          {chaptersLoading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((index) => (
                <Skeleton key={index} className="h-16 w-full rounded-lg" />
              ))}
            </div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="space-y-2"
            >
              {filteredChapters.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  No chapters found matching your search.
                </div>
              ) : (
                filteredChapters
                  .sort((a, b) => b.chapterNumber - a.chapterNumber)
                  .map((chapter, index) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                        onClick={() => handleChapterClick(chapter.id)}
                      className="group cursor-pointer"
                    >
                      <Card className="border-border hover:border-purple-500/50 transition-all duration-200 group-hover:shadow-lg group-hover:shadow-purple-500/10">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-2 h-8 bg-gradient-to-b from-purple-500 to-purple-800 rounded-full" />
                              <div>
                                <h3 className="font-semibold text-foreground group-hover:text-purple-400 transition-colors">
                                  Chapter {chapter.chapterNumber}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {chapter.chapterTitle}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">
                                {new Date().toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))
              )}
            </motion.div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ReadPage;