import { useEffect } from "react";

export const usePageLoad = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      console.log("window is defined");
      // Monitor page load time
      window.addEventListener("load", () => {
        const timing = window.performance.timing;
        const pageLoadTime = timing.loadEventEnd - timing.navigationStart;
        console.log(`Page load time: ${pageLoadTime}ms`);
      });

      // Monitor API response times
      const originalFetch = window.fetch;
      window.fetch = async (...args) => {
        const start = performance.now();
        const response = await originalFetch(...args);
        const end = performance.now();
        console.log(`API call to ${args[0]} took ${end - start}ms`);
        return response;
      };
    }
  }, []);
};