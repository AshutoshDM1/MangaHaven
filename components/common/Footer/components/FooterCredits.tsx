import React from "react";
import { motion, Variants } from "framer-motion";
import { Creator, CREATORS } from "../footerData";

interface FooterCreditsProps {
  variants?: Variants;
  companyName?: string;
  creators?: Creator[];
}

const FooterCredits: React.FC<FooterCreditsProps> = ({
  variants,
  companyName = "MangaHaven",
  creators = CREATORS,
}) => {
  return (
    <motion.div
      variants={variants}
      className="mt-8 border-t border-zinc-200 dark:border-zinc-700 pt-8 text-center flex flex-col sm:flex-row items-center justify-center gap-2"
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        © {new Date().getFullYear()} {companyName}. All rights reserved.
      </p>
      {creators.length > 0 && (
        <p className="text-sm text-muted-foreground flex items-center gap-1">
          <span>Made with ❤️ by</span>
          <span className="flex items-center gap-1">
            {creators.map((creator, index) => (
              <React.Fragment key={creator.name}>
                {index > 0 && <span>&</span>}
                <a
                  href={creator.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {creator.name}
                </a>
              </React.Fragment>
            ))}
          </span>
        </p>
      )}
    </motion.div>
  );
};

export default FooterCredits;
