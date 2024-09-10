"use client";
import { motion } from "framer-motion";
import Loading from "@/components/Dashboard/Loading";
import Home_Main_Card from "@/components/Home/Home_Main_Card";
import Home_NavBar from "@/components/Home/Home_NavBar";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Footer from "@/components/Footer";
export default function Home() {
  const container = useRef(null);
  const AnimatHome = () => {
    let tl = gsap.timeline();

    tl.fromTo(
      ".video2",
      {
        duration: 1,
        ease: "power2.inOut",
        y: -700,
      },
      {
        duration: 1,
        ease: "power2.inOut",
        y: 50,
      },
      "<"
    );
    tl.to(".video2", {
      duration: 1,
      ease: "power2.inOut",
      x: 600,
    });
    tl.to(".video2", {
      duration: 1,
      ease: "power2.inOut",
      x: 0,
    });
  };

  useGSAP(() => {
    AnimatHome();
  });
  return (
    <>
      <div className="min-h-fit h-screen">
        <Loading />
        <Home_NavBar />
        <div className="flex items-end justify-center h-[50vh]">
          <video
            className="video2 h-fit w-[60vh] rounded-[20px] translate-y-[-500%] translate-x-[-110%] absolute top-40% left-30%   overflow-hidden z-0 "
            src="./Jujutsu Kaisen AMV Cut.mp4"
            autoPlay
            loop
            muted
          ></video>
          <h1 className="Heading1 text-[10rem] font-bold  translate-x-[-70%] mix-blend-difference ">
            Manga{" "}
          </h1>
          <h1 className="Heading2 text-[10rem] font-bold  translate-x-[70%] mix-blend-difference ">
            {" "}
            Haven
          </h1>
        </div>
        <div className="h-[20vh] flex gap-6 justify-center items-end w-full ">
          <h1 className="text-[3rem] font-medium mix-blend-difference">
            Exprience the World{" "}
          </h1>
          <h1 className="text-[3rem] font-medium mix-blend-difference">
            of Manga{" "}
          </h1>
          <h1 className="text-[3rem] font-medium mix-blend-difference">
            in one place{" "}
          </h1>
        </div>
      </div>
      <Footer />
    </>
  );
}
