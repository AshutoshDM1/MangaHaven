import { useState } from 'react';
import { easeIn, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface FlottingImagesData {
  src: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  top: string;
  left?: string;
  right?: string;
}

const defaultImages: FlottingImagesData[] = [
  {
    src: 'https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372213/MangaHaven/MangaLandingPage/solo-leveling_quzeqr.jpg',
    alt: 'Solo Leveling',
    top: '10%',
    left: '8%',
  },
  {
    src: 'https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372211/MangaHaven/MangaLandingPage/girlfriend-girlfriend_aobpvx.jpg',
    alt: 'Girlfriend Girlfriend',
    top: '40%',
    left: '8%',
  },
  {
    src: 'https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372209/MangaHaven/MangaLandingPage/Rent-a-girlfriend_o36fx7.jpg',
    alt: 'Rent a Girlfriend',
    top: '70%',
    left: '8%',
  },
  {
    src: 'https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372208/MangaHaven/MangaLandingPage/one-punch-man_rxpd2z.jpg',
    alt: 'One Punch Man',
    top: '10%',
    right: '8%',
  },
  {
    src: 'https://res.cloudinary.com/dnvl8mqba/image/upload/v1746374741/MangaHaven/MangaLandingPage/high-school-dxd_dxj3cc.webp',
    alt: 'High School DxD',
    top: '40%',
    right: '8%',
  },
  {
    src: 'https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372204/MangaHaven/MangaLandingPage/jujutsu-kaisen_ryhzhu.webp',
    alt: 'Jujutsu Kaisen',
    top: '70%',
    right: '8%',
  },
];

const FlottingImagesV2 = ({
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
      ease: 'easeInOut',
    },
    x: {
      repeat: Infinity,
      duration: 20,
      ease: 'easeInOut',
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
      hidden: { opacity: 1, top: "10%" ,  left : "8%", rotate: 360  },
      animateManga: { opacity: 1, left: '50%', top: '50%' , },
    },
    {
      hidden: { opacity: 1, top: "40%" ,  left: '8%', rotate: 365  },
      animateManga: { opacity: 1, left: '50%', top: '50%' , },
    },
    {
      hidden: { opacity: 1, top: "70%" ,  left: '8%', rotate: 355  },
      animateManga: { opacity: 1, left: '50%', top: '50%' , },
    },
    {
      hidden: { opacity: 1, top: "10%" ,  right: '8%', rotate: 355  },
      animateManga: { opacity: 1, left: '50%', top: '50%' ,  },
    },
    {
      hidden: { opacity: 1, top: "40%" ,  right: '8%', rotate: 360  },
      animateManga: { opacity: 1, left: '50%', top: '50%' ,  },
    },
    {
      hidden: { opacity: 1, top: "70%" ,  right: '8%', rotate: 365  },
      animateManga: { opacity: 1, left: '50%', top: '50%' ,  },
    },
  ];

  return (
    <div className={cn('absolute inset-0 z-50', className)}>
      <div className="relative h-full w-full bg-red-200">
        {imagesData.map((image, index) => (
          <motion.img
            key={index}
            onClick={() => {
              setAnimate(!animate);
            }}
            initial={animateCardVariants[index].hidden}
            animate={animate ? animateCardVariants[index].hidden : animateCardVariants[index].animateManga}
            transition={{
              duration: 2,
              ease: [0.5, 0.1, 0.5, 1.0],
              delay: index * 0.2,
            }}
            src={image.src}
            alt={image.alt || 'images'}
            className={`w-[300px]  object-cover rounded-lg bg-black p-1 translate-x-[-50%] translate-y-[-50%] absolute z-[${index + 1}] cursor-pointer`}
          />
        ))}
      </div>
    </div>
  );
};

export default FlottingImagesV2;
