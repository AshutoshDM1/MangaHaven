import Home_Main_Card from "@/components/ui/Home_Main_Card";
import Home_NavBar from "@/components/ui/Home_NavBar";

export default function Home() {
  return (
    <div className="min-h-fit h-screen">
        <Home_NavBar />
        <Home_Main_Card />
    </div>
  )
}
