import BackGround from "@/components/BackGround";
import { ModeToggle } from "@/components/ModeToggle";
import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-screen w-screen ">
        <Navbar />
        <div className="flex flex-col gap-10">
          <NavbarMain />
          <BackGround />
        </div>
      </div>
    </>
  );
}
