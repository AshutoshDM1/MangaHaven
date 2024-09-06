"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const container = useRef(null);
  const container2 = useRef(null);
  const containermain = useRef(null);
  useGSAP(
    () => {
      let tl = gsap.timeline();
      tl.to(container.current, {
        delay: 2,
        y: -1000,
        duration: 1,
      });
      tl.to(container2.current, {
        duration: 3,
        ease: "power2.inOut",
      });
    },
    { scope: container }
  );

  return (
    <>
      <div
        ref={containermain}
        className="absolute top-0 left-0 right-0 bottom-0 z-50"
      >
        <div
          ref={container}
          className=" opacity-100 flex flex-col items-center justify-center min-h-screen bg-background "
        >
          <Loader2 className="w-10 h-10 animate-spin text-primary" />
          <p className="mt-4 text-lg font-medium text-muted-foreground">
            Loading...
          </p>
        </div>
      </div>
      <div ref={container2} className="min-h-screen bg-background"></div>
    </>
  );
}
