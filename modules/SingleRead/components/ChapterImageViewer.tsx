import Image from 'next/image';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import { Skeleton } from '@/components/ui/skeleton';
import { MangaChapterImage } from '@/types/manga.type';

interface ChapterImageViewerProps {
  images: MangaChapterImage[];
  isVertical: boolean;
  isLoading?: boolean;
}

export const ChapterImageViewer = ({
  images,
  isVertical,
  isLoading,
}: ChapterImageViewerProps) => {
  if (isLoading) {
    return (
      <div className="h-full max-w-[50rem] mx-auto pt-5 overflow-y-auto relative">
        <Skeleton className="h-[98%] lg:w-[65vh] md:w-[40vh] w-[30vh]" />
      </div>
    );
  }

  if (!images || images.length === 0) {
    return (
      <div className="h-full max-w-[50rem] mx-auto pt-5 flex items-center justify-center">
        <p className="text-muted-foreground">No images available for this chapter.</p>
      </div>
    );
  }

  return (
    <div className="h-full max-w-[50rem] mx-auto pt-5">
      {isVertical ? (
        // Vertical Scroll View
        images.map((image) => (
          <div
            key={image.imageUrl}
            className="mx-auto max-w-[50rem] px-5 mb-5 h-fit flex justify-center items-start"
          >
            <Image
              className="object-cover select-none"
              src={image.imageUrl}
              alt={`Page ${image.id}`}
              width={550}
              height={550}
            />
          </div>
        ))
      ) : (
        // Horizontal Carousel View
        <div className="max-h-[90%] w-full sm:w-[30rem] mx-auto mt-5 px-2 flex justify-center items-center overflow-hidden rounded-[15px]">
          <Carousel className="w-full flex justify-center items-center">
            <CarouselContent>
              {images.map((image) => (
                <CarouselItem key={image.imageUrl}>
                  <div className="h-[80vh] md:h-fit w-full flex justify-center items-center">
                    <Image
                      className="h-fit w-fit object-cover select-none rounded-[15px]"
                      src={image.imageUrl}
                      alt={`Page ${image.id}`}
                      width={550}
                      height={550}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      )}
    </div>
  );
};

