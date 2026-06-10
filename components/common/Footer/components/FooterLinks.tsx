import React from "react";
import { motion, Variants } from "framer-motion";
import { FooterLink, QUICK_LINKS } from "../footerData";

interface FooterLinksProps {
  variants?: Variants;
  title?: string;
  links?: FooterLink[];
}

const FooterLinks: React.FC<FooterLinksProps> = ({
  variants,
  title = "Quick Links",
  links = QUICK_LINKS,
}) => {
  return (
    <motion.div className="flex flex-col items-center" variants={variants}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <a
              href={link.href}
              className="text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default FooterLinks;
