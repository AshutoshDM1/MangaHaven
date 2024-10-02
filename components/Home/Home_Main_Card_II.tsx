import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home_Main_Card_II() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/dashboard"); // Navigate to /dashboard
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 relative"
      style={{
        backgroundImage: "url('/background-image-home.webp')",
        backgroundSize: "150%",
        backgroundPosition: "left 5%",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="w-full max-w-3xl z-10">
        <img
          src="https://images.fineartamerica.com/images/artworkimages/medium/3/animal-demon-slayer-anime-tanjiro-kamado-anime-video-game-transparent.png"
          alt="Anime characters eating together"
          width={400}
          height={200}
          className="mx-auto mb-2 w-[30vh] sm:w-[40vh] "
        />

        <h1 className="HomeH1 text-[5rem] font-bold mb-4 text-center text-white leading-[1] ">
          Manga Haven
        </h1>
        <p className="text-xl mb-8 text-center text-white">
          Dive into the world of manga with MangaHeaven. Search for your
          favorite titles, discover new series, and start reading instantly.
        </p>

        <div className="flex justify-center mb-8 flex-wrap gap-4 ">
          <div className="relative w-full max-w-md  ">
            <Input
              type="text"
              placeholder="Search manga..."
              className="w-full pl-10 pr-4 py-2 rounded-full bg-opacity-20 text-white  "
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
          <Button className="ml-2 text-white bg-purple-500 hover:bg-purple-700 rounded-full transition duration-500 ease-in-out">
            Search
          </Button>
          <Button
            onClick={handleGetStarted}
            className="text-white bg-transparent border-[1px] border-white rounded-full px-6 py-3 text-lg transition duration-500 ease-in-out hover:bg-white hover:bg-opacity-20 ml-4 "
          >
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
