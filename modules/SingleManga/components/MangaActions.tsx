import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Play, Bookmark, Share2 } from 'lucide-react';

interface MangaActionsProps {
  firstChapterUrl: string | null;
  hasChapters: boolean;
}

export const MangaActions = ({ firstChapterUrl, hasChapters }: MangaActionsProps) => {
  return (
    <div className="flex flex-wrap gap-4 max-w-7xl mx-auto px-4 py-6">
      {hasChapters && firstChapterUrl ? (
        <Link href={firstChapterUrl}>
          <Button className="bg-purple-500 hover:bg-purple-500/95 text-white px-8 py-3 text-lg font-medium">
            <Play className="h-5 w-5 mr-2" />
            START READING
          </Button>
        </Link>
      ) : (
        <Button
          className="bg-purple-500 hover:bg-primary/90 text-white px-8 py-3 text-lg font-medium"
          disabled
        >
          <Play className="h-5 w-5 mr-2" />
          START READING
        </Button>
      )}
      <Button variant="outline" className="border-purple-500/20 hover:bg-purple-500/10">
        <Bookmark className="h-5 w-5 mr-2" />
        BOOKMARK
      </Button>
      <Button variant="outline" className="border-purple-500/20 hover:bg-purple-500/10">
        <Share2 className="h-5 w-5 mr-2" />
        SHARE
      </Button>
    </div>
  );
};

