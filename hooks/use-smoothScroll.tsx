import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { useEffect } from "react";

const useSmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      smoothWheel: true,  
      touchMultiplier: 2,
    });
    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;