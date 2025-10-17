import SplineNext from "@splinetool/react-spline";
import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
// https://prod.spline.design/mkHI03MKmKHk75Qj/scene.splinecode 1  full scene
// https://prod.spline.design/naSr5jNec-Ixl3Su/scene.splinecode 2  full scene
// https://prod.spline.design/jjqv5WzFTBqazsc7/scene.splinecode 3  only particals
const SplineComponent = () => {
  const [shouldShowSpline, setShouldShowSpline] = useState(true);
  const [pageLoadTime, setPageLoadTime] = useState(0);
  const [apiLoadTime, setApiLoadTime] = useState(0);
  const loadStartTime = useRef(performance.now());
  const [isSplineLoaded, setIsSplineLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Monitor API response times
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const start = performance.now();
        try {
          const response = await originalFetch(...args);
          const end = performance.now();
          const apiTime = end - start;
          setApiLoadTime(apiTime);
          console.log(`API call to ${args[0]} took ${apiTime.toFixed(2)}ms`);

          if (apiTime > 3000) {
            console.log("API call too slow, hiding spline");
            setShouldShowSpline(false);
          }
          return response;
        } catch (error) {
          console.error("API call failed:", error);
          return originalFetch(...args);
        }
      };
    }
  }, []);

  // Monitor overall page load time
  useEffect(() => {
    const checkLoadTime = () => {
      const currentTime = performance.now();
      const totalLoadTime = currentTime - loadStartTime.current;
      setPageLoadTime(totalLoadTime);
      console.log(`Total load time: ${totalLoadTime.toFixed(2)}ms`);

      if (totalLoadTime > 700) {
        console.log("Page load too slow, hiding spline");
        setShouldShowSpline(false);
      }
    };

    // Check load time after a short delay to ensure all resources are loaded
    const timeoutId = setTimeout(checkLoadTime, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  // Monitor Spline component load time
  const handleSplineLoad = () => {
    const splineLoadTime = performance.now() - loadStartTime.current;
    console.log(`Spline load time: ${splineLoadTime.toFixed(2)}ms`);
    setIsSplineLoaded(true);

    if (splineLoadTime > 5000) {
      console.log("Spline load too slow, hiding component");
      setShouldShowSpline(false);
    }
  };

  // Log current state whenever it changes
  useEffect(() => {
    console.log("Current loading times:", {
      pageLoad: pageLoadTime.toFixed(2),
      apiLoad: apiLoadTime.toFixed(2),
      showingSpline: shouldShowSpline,
      isSplineLoaded,
    });
  }, [pageLoadTime, apiLoadTime, shouldShowSpline, isSplineLoaded]);

  if (!shouldShowSpline) {
    console.log("Spline component hidden due to performance");
    return null;
  }

  return (
    <main className="min-h-screen bg-transparent w-full overflow-hidden absolute z-[0] pointer-events-none">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 1 }}
      >
        <SplineNext
          className="min-h-[100vh] w-full absolute top-[6vh] z-[10] overflow-hidden hidden md:block bg-transparent"
          scene="https://prod.spline.design/naSr5jNec-Ixl3Su/scene.splinecode"
          onLoad={handleSplineLoad}
        />
      </motion.div>
    </main>
  );
};

export default SplineComponent;
