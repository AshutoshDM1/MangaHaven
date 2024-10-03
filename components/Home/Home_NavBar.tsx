import { motion } from "framer-motion";

export default function Home_NavBar() {
  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Stagger delay for child items
        duration: 2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5, // Individual item animation duration
      },
    },
  };

  return (
    <div className="h-fit">
      <div className="flex h-full justify-center py-4 sm:py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{ when: "beforeChildren", delayChildren: 9 }} // 9 sec delay before the child animations start
          className="flex gap-8 h-full md:text-base"
        >
          {["Home", "Manhwa", "Manga", "Most Popular", "Top Airing"].map((text) => (
            <div className="overflow-hidden" key={text}>
              <motion.div variants={itemVariants} className="overflow-hidden w-fit">
                <NavItem text={text} className={`hover:cursor-pointer ${text === "Most Popular" ? "hidden md:block " : "" } ${text === "Top Airing" ? "hidden md:block " : "" } `}/>
              </motion.div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

interface NavItemProps {
  text: string;
  className?: string;
}

function NavItem({ text, className = "" }: NavItemProps) {
  return (
    <div className={`text-white flex flex-col justify-center group ${className}`}>
      <span className="relative font-medium text-md">
        {text}
        <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
      </span>
    </div>
  );
}
