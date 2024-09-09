"use client";
import Loading from "@/components/Dashboard/Loading";
import Home_Main_Card from "@/components/Home/Home_Main_Card";
import Home_NavBar from "@/components/Home/Home_NavBar";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
export default function Home() {
  const container = useRef(null);
  const AnimatHome = () => {
    let tl = gsap.timeline();
    tl.to(".Heading1", {
      duration: 1,
      ease: "power2.inOut",
      x: 0,
    });
    tl.to(
      ".Heading2",
      {
        duration: 1,
        ease: "power2.inOut",
        x: 0,
      },
      "<"
    );
    tl.to(
      ".video2",
      {
        duration: 1,
        width: "200vh",
        ease: "power2.inOut",
        x: 0,
      },
      "<"
    );
  };

  useGSAP(() => {
    AnimatHome();
  });
  return (
    <div className="min-h-fit h-screen">
      {/* <Loading /> */}
      <Home_NavBar />
      <div className="flex items-center justify-center h-[70vh]">
        <video
          className="video2 h-fit w-[60vh] rounded-[20px] absolute top-40% left-30%   overflow-hidden z-0 "
          src="./Jujutsu Kaisen AMV Cut.mp4"
          autoPlay
          loop
          muted
        ></video>

        <h1 className="Heading1 text-[10rem] font-bold translate-x-[-60%] ">
          Manga{" "}
        </h1>
        <h1 className="Heading2 text-[10rem] font-bold  translate-x-[60%] ">
          {" "}
          Haven
        </h1>
      </div>
    </div>
  );
}
