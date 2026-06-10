"use client";
import React from "react";
import { motion, useInView } from "framer-motion";
import FooterBrand from "./components/FooterBrand";
import FooterLinks from "./components/FooterLinks";
import FooterSocials from "./components/FooterSocials";
import FooterCredits from "./components/FooterCredits";

const Footer: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <motion.footer
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-8 border-t border-zinc-200 dark:border-zinc-700 mt-10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
        >
          <FooterBrand variants={itemVariants} />
          <FooterLinks variants={itemVariants} />
          <FooterSocials variants={itemVariants} />
        </motion.div>
        <FooterCredits variants={itemVariants} />
      </div>
    </motion.footer>
  );
};

export default Footer;
