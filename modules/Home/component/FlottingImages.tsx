import { useState } from 'react';
import { motion } from 'framer-motion';
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

const FlottingImages = ({
  className,
  imagesData = defaultImages,
}: {
  className?: string;
  imagesData?: FlottingImagesData[];
}) => {
  const [animate, setAnimate] = useState(false);

  // Floating animation patterns for when images are spread out
  const floatingTransition = {
    y: {
      repeat: Infinity,
      duration: !animate ? 20 : 30,
      ease: 'easeInOut',
      delay: 2,
    },
    x: {
      repeat: Infinity,
      duration: !animate ? 20 : 30,
      ease: 'easeInOut',
      delay: 2,
    },
  };
  console.log(animate);
  const floatingPatterns = [
    { x: [0, -15, 5, 12, -8, -5, 0], y: [0, -12, 7, 5, -10, 3, 0] },
    { x: [0, 8, -12, 5, -7, 10, 0], y: [0, 5, -8, 12, -5, -10, 0] },
    { x: [0, -5, 15, -10, 8, -12, 0], y: [0, 10, -5, -8, 12, -3, 0] },
    { x: [0, 12, -8, -5, 15, -10, 0], y: [0, -7, 12, -10, 5, 8, 0] },
    { x: [0, -8, 12, -15, 5, 10, 0], y: [0, 8, -12, 7, -5, 10, 0] },
    { x: [0, 10, -7, 15, -12, 5, 0], y: [0, -15, 10, -5, 8, -12, 0] },
  ];

  // Rotation values for each image when in center
  const centerRotations = [9, 6, 3, -3, -6, -9];

  return (
    <div className={cn('absolute inset-0 z-50', className)}>
      <div className="relative h-full w-full">
        {imagesData.map((image, index) => {
          // Define variants for this specific image
          const variants = {
            spread: {
              opacity: 1,
              left: image.left,
              right: image.right,
              top: image.top,
              x: floatingPatterns[index].x,
              y: floatingPatterns[index].y,
              rotate: 0,
              transition: floatingTransition,
            },
            center: {
              opacity: 1,
              left: '50%',
              top: '50%',
              x: '-50%',
              y: '-50%',
              rotate: centerRotations[index],
              transition: {
                duration: 1,
                ease: [0.5, 0.1, 0.5, 1.0],
                delay: index * 0.2,
              },
            },
          };

          return (
            <motion.img
              key={index}
              onClick={() => {
                setAnimate(!animate);
              }}
              variants={variants}
              initial="spread"
              transition={{
                duration: 1,
                ease: [0.5, 0.1, 0.5, 1.0],
                delay: index * 0.2,
              }}
              animate={animate ? 'center' : 'spread'}
              src={image.src}
              alt={image.alt || 'images'}
              className={cn(
                'w-[300px] object-cover rounded-lg bg-white p-1 absolute cursor-pointer transform',
                `z-[${index + 1}]`
              )}
            />
          );
        })}
      </div>
    </div>
  );
};

export default FlottingImages;
