import Image from 'next/image';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MangaSearchResult } from '@/services/apiv2';

interface MangaHeroProps {
  manga: MangaSearchResult;
}

export const MangaHero = ({ manga }: MangaHeroProps) => {
  return (
    <div >
      <div className="flex flex-col md:flex-row justify-center gap-8 items-start p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
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
                  className="w-[800px] h-[400px] object-cover transition-transform duration-300 "
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

          {/* Description */}
          <div className="prose prose-invert max-w-none">
            <p className="text-muted-foreground leading-relaxed">{manga.description}</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
