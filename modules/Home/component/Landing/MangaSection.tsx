"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

export function MangaSection() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} />
  ));

  return (
    <div className="w-full h-full py-0 md:py-20 ">
      <h2 className="max-w-7xl pl-4 mx-auto text-xl md:text-5xl font-bold text-neutral-800 dark:text-neutral-200 font-sans">
        Read your favorite manga and anime.
      </h2>
      <Carousel items={cards} />
    </div>
  );
}

const DummyContent = ({ src, title }: { src: string; title: string }) => {
  return (
    <>
      <div className="bg-transparent flex justify-center items-center">
        <Image
          src={src}
          alt={title}
          width={500}
          height={100}
          className="w-[20rem] object-cover cursor-pointer"
        />
      </div>
    </>
  );
};

const data = [
  {
    category: "Action",
    title: "Jujutsu Kaisen",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1728666068/MangaHaven/MangaCovers/Jujutsu_Kaisen_lajfb0.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1728666068/MangaHaven/MangaCovers/Jujutsu_Kaisen_lajfb0.jpg"
        title="Jujutsu Kaisen "
      />
    ),
  },
  {
    category: "Fantasy",
    title: "The Rising of the Shield Hero",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1728666071/MangaHaven/MangaCovers/The_Rising_of_the_Shield_Hero_nsmkw1.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1728666071/MangaHaven/MangaCovers/The_Rising_of_the_Shield_Hero_nsmkw1.jpg"
        title="The Rising of the Shield Hero"
      />
    ),
  },
  {
    category: "Action",
    title: "Chainsaw Man",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1728666065/MangaHaven/MangaCovers/Chainsaw_Man_anfi1x.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1728666065/MangaHaven/MangaCovers/Chainsaw_Man_anfi1x.jpg"
        title="Chainsaw Man"
      />
    ),
  },
  {
    category: "Comedy",
    title: "High School DxD",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1725521767/MangaHaven/MangaCovers/High_School_Dxd_ijij8l.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1725521767/MangaHaven/MangaCovers/High_School_Dxd_ijij8l.jpg"
        title="High School DxD"
      />
    ),
  },
  {
    category: "Adventure",
    title: "One Piece",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1725521768/MangaHaven/MangaCovers/One_Piece_xwuxza.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1725521768/MangaHaven/MangaCovers/One_Piece_xwuxza.jpg"
        title="One Piece"
      />
    ),
  },

  {
    category: "Romance",
    title: "Rent-a-Girlfriend",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1725521769/MangaHaven/MangaCovers/Rent_a_Girlfriend_mn0t8e.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1725521769/MangaHaven/MangaCovers/Rent_a_Girlfriend_mn0t8e.jpg"
        title="Rent-a-Girlfriend"
      />
    ),
  },
];
