import { motion } from 'framer-motion';
import { GalleryHorizontal, GalleryVertical } from 'lucide-react';

interface ViewModeToggleProps {
  isVertical: boolean;
  onToggle: (isVertical: boolean) => void;
}

export const ViewModeToggle = ({ isVertical, onToggle }: ViewModeToggleProps) => {
  return (
    <div className="w-fit md:w-full flex justify-center items-center gap-3">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.1 }}
        onClick={() => onToggle(true)}
        className={`w-1/2 py-[5px] px-3 bg-[#ec2f4b] ${
          isVertical ? 'bg-[#ff2b2b]' : ''
        } rounded-md flex justify-center items-center cursor-pointer`}
      >
        <GalleryVertical />
      </motion.div>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 1.1 }}
        onClick={() => onToggle(false)}
        className={`w-1/2 py-[5px] px-3 bg-[#ec2f4b] ${
          isVertical ? '' : 'bg-[#ff2b2b]'
        } rounded-md flex justify-center items-center cursor-pointer`}
      >
        <GalleryHorizontal />
      </motion.div>
    </div>
  );
};

