"use client";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import Image from "next/image";

export default function MangaSectionSlider() {
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
    title: "My Hero Academia",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216578/MangaHavenV2/MangaCover/kjfqhptrgk6e0ugajmqq.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216578/MangaHavenV2/MangaCover/kjfqhptrgk6e0ugajmqq.jpg"
        title="My Hero Academia "
      />
    ),
  },
  {
    category: "Action",
    title: "Full Metal Alchemist",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216538/MangaHavenV2/MangaCover/qzc4uhh81sxwndrtjhzs.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216538/MangaHavenV2/MangaCover/qzc4uhh81sxwndrtjhzs.jpg"
        title="Full Metal Alchemist"
      />
    ),
  },
  {
    category: "Comedy",
    title: "Jujutsu Kaisen",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216136/MangaHavenV2/MangaCover/cabnfat19ex7iuofgzrn.webp",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216136/MangaHavenV2/MangaCover/cabnfat19ex7iuofgzrn.webp"
        title="Jujutsu Kaisen"
      />
    ),
  },
  {
    category: "Adventure",
    title: "One Piece",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216426/MangaHavenV2/MangaCover/yvbwy6v1ilbe9uyql7wc.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216426/MangaHavenV2/MangaCover/yvbwy6v1ilbe9uyql7wc.jpg"
        title="One Piece"
      />
    ),
  },
  {
    category: "Romance",
    title: "Rent-a-Girlfriend",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216077/MangaHavenV2/MangaCover/kk0gow0lvyitodskfa1i.webp",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216077/MangaHavenV2/MangaCover/kk0gow0lvyitodskfa1i.webp"
        title="Rent-a-Girlfriend"
      />
    ),
  },
  {
    category: "Fantasy",
    title: "High School DxD",
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216728/MangaHavenV2/MangaCover/kw5dy9kt8ajrgzkjzgu3.jpg",
    content: (
      <DummyContent
        src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1751216728/MangaHavenV2/MangaCover/kw5dy9kt8ajrgzkjzgu3.jpg"
        title="High School DxD"
      />
    ),
  },
];
