"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { Manga } from "@prisma/client";

interface MangaSectionSliderProps {
  mangas: Manga[]
}

export default function MangaSectionSlider({ mangas }: MangaSectionSliderProps) {
  const cards = mangas.map((manga, index) => (
    <Card key={manga.id} manga={manga} index={index} />
  ));

  return (
    <div className="w-full h-full py-0 md:pt-20 ">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Read your favorite manga and anime.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}