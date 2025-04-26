"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

export default function Loading() {
  const container = useRef(null);
  const containermain = useRef(null);
  const router = useRouter();

  const Animated = () => {
    let tl = gsap.timeline();
    tl.to("video", {
      delay: 0,
      duration: 2,
      ease: "linear",
      x: 0,
    });
    tl.to("h1", {
      duration: 1,
      ease: "power2.inOut",
      x: 0,
    }); // Start at the same time as the video animation ends
    tl.to(
      ".heading2",
      {
        duration: 1,
        ease: "power2.inOut",
        x: 0,
      },
      "<",
    ); // Start at the same time as the h1 animation
    tl.to("video", {
      duration: 1,
      top: "0",
      left: "0",
      bottom: "0",
      right: "0",
      ease: "power2.inOut",
      width: "203vh",
      borderRadius: "0px",
    });
    tl.to(containermain.current, {
      delay: 4,
      y: "-120vh",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        router.push("/home");
      },
    });
  };
  useGSAP(
    () => {
      Animated();
    },
    { scope: container },
  );

  return (
    <>
      <div
        ref={containermain}
        className="absolute top-0 left-0 right-0 bottom-0 z-[50] overflow-hidden bg-black "
        style={{
          overflowX: "hidden",
        }}
      >
        <div
          ref={container}
          className="opacity-100 flex flex-col items-center justify-center h-screen  relative "
        >
          <div className="h-fit w-fit overflow-hidden">
            <h1 className="text-white text-[8.8vw] font-medium uppercase h-[20vh] w-fit relative z-20 mix-blend-difference translate-x-[-1700px]">
              Experience
            </h1>
          </div>
          <div className="h-fit w-fit flex gap-10 overflow-hidden">
            <div className="heading2 h-[20vh] w-fit flex items-center justify-center gap-16 overflow-hidden relative z-20 mix-blend-difference translate-x-[1700px]">
              <h2 className="text-white overflow-hidden text-[8.8vw] font-medium uppercase  h-[20vh] w-fit relative z-20 mix-blend-difference">
                The New{" "}
              </h2>
              <h2
                style={{
                  WebkitTextStroke: "1px white",
                  fontFamily:
                    'Bebas Neue, Anton, Oswald, Teko, Staatliches, "Fjalla One", sans-serif',
                }}
                className="text-transparent overflow-hidden text-[8.8vw] font-medium uppercase h-[20vh] w-fit relative z-20 mix-blend-difference"
              >
                World
              </h2>
            </div>
          </div>
          <div className="h-[20vh] flex items-end justify-center gap-10">
            <div className="h-fit w-fit overflow-hidden">
              <h1 className="text-white text-[8.8vw] font-medium uppercase overflow-hidden h-[20vh] w-fit mix-blend-light relative z-20 mix-blend-difference translate-x-[-1400px]">
                Of Manga
              </h1>
            </div>
            <div className=" h-[15vh] w-[25vh] overflow-hidden ">
              <video
                className="video translate-x-[-1800px] w-[35vh] rounded-[20px] absolute right-[28vh] bottom-[17vh] z-10 object-cover "
                src="./Jujutsu Kaisen AMV Cut.mp4"
                autoPlay
                loop
                muted
              ></video>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
