import { Skeleton } from '@/components/ui/skeleton';

const LargeCarouselSkeleton = () => {
  return (
    <div className='pb-4' >
      <Skeleton className="md:h-[60vh] h-[35vh] w-full" />
    </div>
  );
};

export default LargeCarouselSkeleton;
