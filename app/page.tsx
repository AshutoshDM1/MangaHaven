"use client";
import { useRouter } from "next/navigation";

import { useEffect } from "react";
import Loading from "@/components/Dashboard/Loading";
import { useRecoilState } from "recoil";
import { showLoadingAtom } from "@/state/atoms";
export default function Home() {
  const Router = useRouter();
  const [showLoading, setShowLoading] = useRecoilState(showLoadingAtom);
  useEffect(() => {
    const checkScreenSize = () => {
      setShowLoading(window.innerWidth >= 1500);
      if(window.innerWidth < 1500){
        Router.push("/home");
      }
    };
    checkScreenSize();
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <>
      {showLoading && <Loading />}
    </>
  );
}
