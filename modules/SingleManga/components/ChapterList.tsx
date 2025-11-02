import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { MangaChapter } from '@/types/manga.type';

interface ChapterListProps {
  chapters: MangaChapter[];
  mangaId: number;
  isLoading?: boolean;
}

export const ChapterList = ({ chapters, mangaId, isLoading }: ChapterListProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChapters = chapters.filter(
    (chapter) =>
      chapter.chapterTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.chapterNumber.toString().includes(searchTerm)
  );

  if (isLoading) {
    return (
      <div className="px-4 py-12">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((index) => (
            <Skeleton key={index} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 mb-8">
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
              <Link key={chapter.id} href={`/read/${mangaId}/${chapter.id}`}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
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
              </Link>
            ))
        )}
      </motion.div>
    </div>
  );
};

