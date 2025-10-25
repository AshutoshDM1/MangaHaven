import { Skeleton } from '@/components/ui/skeleton';
import { useIsMobile } from '@/hooks/use-mobile';

const MangaCarouselSkeleton = () => {
  const isMobile = useIsMobile();
  return (
    <div className="w-full flex">
      {isMobile ? (
        <div className="flex gap-4 w-[70vh] ">
          <Skeleton className="w-full mx-0 h-[20vh]"></Skeleton>
        </div>
      ) : (
        <div className="w-full flex">
          {[1, 2, 3 ].map((index) => (
            <div key={index} className="flex gap-4 w-[60vh] ">
              <Skeleton className="w-full mx-2 h-[20vh] md:h-[25vh] "></Skeleton>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MangaCarouselSkeleton;
