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
import { useRouter } from "next/navigation";

export default function Home() {
const router = useRouter()
  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth <= 1500) {
        router.push("/dashboard");
      }
    };
    checkScreenSize();
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      <Loading />
    </>
  );
}
