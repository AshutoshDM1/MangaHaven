"use client";
import { useRouter } from "next/navigation";
import Home_NavBar from "@/components/Home/Home_NavBar";
import Home_Main_Card_II from "@/components/Home/Home_Main_Card_II";
import { useEffect } from "react";
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
      {/* {showLoading && <Loading />} */}
      <div className="relative min-h-screen  overflow-hidden">
        <div className="absolute top-0 left-0 w-full z-10">
          <Home_NavBar />
        </div>
        <Home_Main_Card_II />
      </div>
    </>
  );
}
