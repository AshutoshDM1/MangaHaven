import React from "react";
import { motion, Variants } from "framer-motion";
import { SocialLink, SOCIAL_LINKS } from "../footerData";

interface FooterSocialsProps {
  variants?: Variants;
  title?: string;
  socials?: SocialLink[];
}

const FooterSocials: React.FC<FooterSocialsProps> = ({
  variants,
  title = "Follow Us",
  socials = SOCIAL_LINKS,
}) => {
  return (
    <motion.div className="flex flex-col items-center" variants={variants}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex space-x-4">
        {socials.map((social, index) => {
          const Icon = social.icon;
          return (
            <motion.a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Icon className="w-6 h-6" />
            </motion.a>
          );
        })}
      </div>
    </motion.div>
  );
};

export default FooterSocials;
