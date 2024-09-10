"use client";
import Home_Main_Card from "@/components/Home/Home_Main_Card";
import Home_NavBar from "@/components/Home/Home_NavBar";

export default function Home() {
  return (
    <>
      <div className="min-h-fit h-screen">
        <Home_NavBar />
        <Home_Main_Card />
      </div>
    </>
  );
}
