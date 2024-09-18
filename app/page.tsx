"use client";
import Loading from "@/components/Dashboard/Loading";
import { useRouter } from "next/navigation";
import Home_NavBar from "@/components/Home/Home_NavBar";
import Home_Main_Card_II from "@/components/Home/Home_Main_Card_II";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
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
      <div className="relative min-h-screen">
        <div className="absolute top-0 left-0 w-full z-10">
          <Home_NavBar />
        </div>
        <Home_Main_Card_II />
      </div>
    </>
  );
}
