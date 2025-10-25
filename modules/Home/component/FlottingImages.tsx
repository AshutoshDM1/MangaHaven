import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FlottingImagesData {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

const defaultImages: FlottingImagesData[] = [
  {
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372213/MangaHaven/MangaLandingPage/solo-leveling_quzeqr.jpg",
    alt: "Solo Leveling",
  },
  {
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372211/MangaHaven/MangaLandingPage/girlfriend-girlfriend_aobpvx.jpg",
    alt: "Girlfriend Girlfriend",
  },
  {
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372209/MangaHaven/MangaLandingPage/Rent-a-girlfriend_o36fx7.jpg",
    alt: "Rent a Girlfriend",
  },
  {
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372208/MangaHaven/MangaLandingPage/one-punch-man_rxpd2z.jpg",
    alt: "One Punch Man",
  },
  {
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1746374741/MangaHaven/MangaLandingPage/high-school-dxd_dxj3cc.webp",
    alt: "High School DxD",
  },
  {
    src: "https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372204/MangaHaven/MangaLandingPage/jujutsu-kaisen_ryhzhu.webp",
    alt: "Jujutsu Kaisen",
  },
];

const FlottingImages = ({
  className,
  imagesData = defaultImages,
}: {
  className?: string;
  imagesData?: FlottingImagesData[];
}) => {
  const [animate, setAnimate] = useState(true);
  const transition = {
    y: {
      repeat: Infinity,
      duration: 20,
      ease: "easeInOut",
      delay: 2,
    },
    x: {
      repeat: Infinity,
      duration: 20,
      ease: "easeInOut",
      delay: 2,
    },
  };

  const visibleVariants = [
    {
      opacity: 1,
      x: [0, -15, 5, 12, -8, -5, 0],
      y: [0, -12, 7, 5, -10, 3, 0],
      transition: transition,
    },
    {
      opacity: 1,
      x: [0, 8, -12, 5, -7, 10, 0],
      y: [0, 5, -8, 12, -5, -10, 0],
      transition: transition,
    },
    {
      opacity: 1,
      x: [0, -5, 15, -10, 8, -12, 0],
      y: [0, 10, -5, -8, 12, -3, 0],
      transition: transition,
    },
    {
      opacity: 1,
      x: [0, 12, -8, -5, 15, -10, 0],
      y: [0, -7, 12, -10, 5, 8, 0],
      transition: transition,
    },
    {
      opacity: 1,
      x: [0, -8, 12, -15, 5, 10, 0],
      y: [0, 8, -12, 7, -5, 10, 0],
      transition: transition,
    },
    {
      opacity: 1,
      x: [0, 10, -7, 15, -12, 5, 0],
      y: [0, -15, 10, -5, 8, -12, 0],
      transition: transition,
    },
  ];

  const animateCardVariants = [
    {
      hidden: { opacity: 0, right: "130%", rotate: 360 },
      animateManga: { opacity: 1, right: "-50%", top: "35%", rotate: [360, 9] },
    },
    {
      hidden: { opacity: 0, right: "140%", rotate: 365 },
      animateManga: { opacity: 1, right: "-50%", top: "0%", rotate: [365, 6] },
    },
    {
      hidden: { opacity: 0, right: "130%", rotate: 355 },
      animateManga: {
        opacity: 1,
        right: "-50%",
        top: "-35%",
        rotate: [355, 3],
      },
    },
    {
      hidden: { opacity: 0, left: "130%", rotate: 355 },
      animateManga: { opacity: 1, left: "-50%", top: "35%", rotate: [355, -3] },
    },
    {
      hidden: { opacity: 0, left: "140%", rotate: 360 },
      animateManga: { opacity: 1, left: "-50%", top: "0%", rotate: [360, -6] },
    },
    {
      hidden: { opacity: 0, left: "130%", rotate: 365 },
      animateManga: {
        opacity: 1,
        left: "-50%",
        top: "-35%",
        rotate: [365, -9],
      },
    },
  ];

  const leftImages = imagesData.slice(0, 3);
  const rightImages = imagesData.slice(3, 6);

  return (
    <div className={cn("absolute -top-20 2xl:-top-28 hidden lg:flex", className)}>
      <div className="flex flex-col gap-0  ">
        {leftImages.map((image, index) => (
          <motion.img
            key={index}
            onClick={() => {
              setAnimate(!animate);
            }}
            initial={animateCardVariants[index].hidden}
            animate={
              animate
                ? visibleVariants[index]
                : animateCardVariants[index].animateManga
            }
            transition={{
              duration: 1,
              ease: [0.5, 0.1, 0.5, 1.0],
              delay: index * 0.2,
            }}
            src={image.src}
            alt={image.alt || "images"}
            className={`w-[30vh] 2xl:w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[${index + 1}] cursor-pointer`}
          />
        ))}
      </div>
      <div className="flex flex-col gap-0 -ml-[200px] xl:-ml-[100px] 2xl:-ml-0">
        {rightImages.map((image, index) => (
          <motion.img
            key={index + 3}
            onClick={() => {
              setAnimate(!animate);
            }}
            initial={animateCardVariants[index + 3].hidden}
            animate={
              animate
                ? visibleVariants[index + 3]
                : animateCardVariants[index + 3].animateManga
            }
            transition={{
              duration: 1,
              ease: [0.5, 0.1, 0.5, 1.0],
              delay: (index + 3) * 0.2 + 0.1,
            }}
            src={image.src}
            alt={image.alt || "images"}
            className={`max-w-[30vh] 2xl:max-w-[40vh] object-cover rounded-lg bg-white p-1 relative z-[${index + 4}] cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlottingImages;
