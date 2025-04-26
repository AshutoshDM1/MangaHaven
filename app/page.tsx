"use client";
import Home_Main_Card_II from "@/components/Home/Home_Main_Card_II";
import Home_NavBar from "@/components/Home/Home_NavBar";

export default function homepage() {
  return (
    <>
      <div className="relative min-h-screen  overflow-hidden">
        <div className="absolute top-0 left-0 w-full z-10">
          <Home_NavBar />
        </div>
        <Home_Main_Card_II />
      </div>
    </>
  );
}
