import { BookOpen, Calendar, Star, Eye } from 'lucide-react';

interface MangaStatsProps {
  totalChapters: number;
}

export const MangaStats = ({ totalChapters }: MangaStatsProps) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 p-4">
      <div className="text-center p-3 rounded-lg bg-card/50 border">
        <BookOpen className="h-6 w-6 text-purple-400 mx-auto mb-1" />
        <div className="text-2xl font-bold text-foreground">{totalChapters}</div>
        <div className="text-sm text-muted-foreground">Chapters</div>
      </div>
      <div className="text-center p-3 rounded-lg bg-card/50 border">
        <Star className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
        <div className="text-2xl font-bold text-foreground">8.26</div>
        <div className="text-sm text-muted-foreground">MAL Rating</div>
      </div>
      <div className="text-center p-3 rounded-lg bg-card/50 border">
        <Eye className="h-6 w-6 text-blue-400 mx-auto mb-1" />
        <div className="text-2xl font-bold text-foreground">27.8K</div>
        <div className="text-sm text-muted-foreground">Readers</div>
      </div>
      <div className="text-center p-3 rounded-lg bg-card/50 border">
        <Calendar className="h-6 w-6 text-green-400 mx-auto mb-1" />
        <div className="text-2xl font-bold text-foreground">31,816</div>
        <div className="text-sm text-muted-foreground">Views</div>
      </div>
    </div>
  );
};
