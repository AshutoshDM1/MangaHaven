import { Skeleton } from '@/components/ui/skeleton';

const LargeCarouselSkeleton = () => {
  return (
    <div className='py-4' >
      <Skeleton className="md:h-[60vh] h-[550px] w-full" />
    </div>
  );
};

export default LargeCarouselSkeleton;
