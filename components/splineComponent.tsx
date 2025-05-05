import SplineNext from "@splinetool/react-spline";
import { motion } from "framer-motion";
const SplineComponent = () => {
  return (
    <main className="min-h-screen w-full absolute overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <SplineNext
          className="min-h-[100vh] w-full absolute top-[10%] left-[10%] z-[-10] overflow-hidden hidden md:block"
          scene="https://prod.spline.design/yQoNevkGykqgOLCi/scene.splinecode"
        />
      </motion.div>
    </main>
  );
};

export default SplineComponent;
