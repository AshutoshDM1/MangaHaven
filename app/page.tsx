import Navbar from "@/components/Navbar";
import NavbarMain from "@/components/NavbarMain";

export default function Home() {
  return (
    <>
      <div className="h-screen">
        <Navbar />       
        <NavbarMain/>
      </div>
    </>
  );
}
