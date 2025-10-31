import { Skeleton } from '@/components/ui/skeleton';

const MangaSectionSkeleton = () => {
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  return (
    <>
      {skeletons.map((index) => {
        return <Skeleton key={index} className="h-[270px] rounded-lg" />;
      })}
    </>
  );
};

export default MangaSectionSkeleton;
