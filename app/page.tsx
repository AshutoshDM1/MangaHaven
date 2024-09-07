"use client";
import { useState, useEffect } from "react";
import BackGroundMain from "@/components/Dashboard/BackGroundMain";
import Footer from "@/components/Footer";
import MangaSection from "@/components/Dashboard/MangaSection";
import MangaCarousel from "@/components/Dashboard/MangaCarousel";
import Loading from "@/components/Dashboard/Loading";
import { useRecoilState } from "recoil";
import { showLoadingAtom } from "@/state/atoms";
import NavbarMain from "@/components/NavBar/NavbarMain";

export default function Home() {
  const [showLoading, setShowLoading] = useRecoilState(showLoadingAtom);

  useEffect(() => {
    const checkScreenSize = () => {
      setShowLoading(window.innerWidth >= 1500);
    };
    checkScreenSize();
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {showLoading && <Loading />}
      <div className="relative z-0 ">
      <NavbarMain />
        <div className="max-w-7xl mx-auto flex flex-col">
          <BackGroundMain />
        </div>
        <MangaCarousel />
        <div className="max-w-7xl mx-auto flex flex-col">
          <MangaSection />
        </div>
        <Footer />
      </div>
    </>
  );
}
