'use client'
import React from 'react';
import { FaSquareXTwitter, FaReddit, FaDiscord } from 'react-icons/fa6';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

const Footer: React.FC = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8
      }
    }
  };

  return (
    <motion.footer 
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-8 border-t border-gray-200 dark:border-zinc-700 mt-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          variants={containerVariants}
        >
          <motion.div className="flex flex-col items-center" variants={itemVariants}>
            <div className="mb-4 flex justify-center">
              <Image
                src="/MangaHaven Logo.png"
                alt="MangaHaven Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <h3 className="text-lg font-semibold mb-4">MangaHaven</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Your ultimate destination for manga and anime content.
            </p>
          </motion.div>
          <motion.div className="flex flex-col items-center" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">Home</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">Browse Manga</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">Latest Updates</a></li>
              <li><a href="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">About Us</a></li>
            </ul>
          </motion.div>
          <motion.div className="flex flex-col items-center" variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaSquareXTwitter className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaReddit className="w-6 h-6" />
              </motion.a>
              <motion.a 
                href="#" 
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaDiscord className="w-6 h-6" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
        <motion.div 
          variants={itemVariants}
          className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 text-center"
        >
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} MangaHaven. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;
