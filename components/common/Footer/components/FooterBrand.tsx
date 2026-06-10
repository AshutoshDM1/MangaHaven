import React from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";

interface FooterBrandProps {
  variants?: Variants;
  logoSrc?: string;
  logoAlt?: string;
  title?: string;
  description?: string;
}

const FooterBrand: React.FC<FooterBrandProps> = ({
  variants,
  logoSrc = "/favicon.ico",
  logoAlt = "MangaHaven Logo",
  title = "MangaHeaven",
  description = "Your ultimate destination for manga and anime content.",
}) => {
  return (
    <motion.div className="flex flex-col items-center" variants={variants}>
      <div className="mb-4 flex justify-center">
        <Image
          src={logoSrc}
          alt={logoAlt}
          width={40}
          height={40}
          className="h-10 w-auto"
        />
      </div>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
    </motion.div>
  );
};

export default FooterBrand;
