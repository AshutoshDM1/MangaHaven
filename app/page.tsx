"use client";
import { useState, useEffect } from "react";
import BackGroundMain from "@/components/Dashboard/BackGroundMain";
import Footer from "@/components/Footer";
import MangaSection from "@/components/Dashboard/MangaSection";
import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";
import MangaCarousel from "@/components/Dashboard/MangaCarousel";
import Loading from "@/components/Dashboard/Loading";
import { useRecoilState } from "recoil";
import { showLoadingAtom } from "@/state/atoms";

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
      <div className="absolute top-0 left-0 right-0 bottom-0 z-[-10]">
        <NavbarMain />
        <div className="max-w-7xl mx-auto flex flex-col">
          <div className="flex flex-col">
            <div className="relative">
              <BackGroundMain />
              <div className="md:-mt-1 -mt-36">
                <MangaCarousel />
              </div>
            </div>
          </div>
          <MangaSection />
        </div>
        <Footer />
      </div>
      {/* <Navbar /> */}
      <NavbarMain />
      <div className="max-w-7xl mx-auto flex flex-col">
        <div className="flex flex-col">
          <div className="relative">
            <BackGroundMain />
            <div className="md:-mt-1 -mt-36">
              <MangaCarousel />
            </div>
          </div>
        </div>
        <MangaSection />
      </div>
      <Footer />
    </>
  );
}
