import SplineNext from "@splinetool/react-spline";
import { motion } from "framer-motion";
const SplineComponent = () => {
  return (
    <main className="min-h-screen w-full overflow-hidden absolute z-[-10] ">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <SplineNext
          className="min-h-[100vh] w-full absolute top-[6vh] z-[-10] overflow-hidden hidden md:block"
          scene="https://prod.spline.design/yQoNevkGykqgOLCi/scene.splinecode"
        />
      </motion.div>
    </main>
  );
};

export default SplineComponent;
