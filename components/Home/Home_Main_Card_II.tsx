import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react'

export default function Home_Main_Card_II() {
  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center px-4 relative"
    // style={{backgroundImage: "url('/background-image-home.webp')", backgroundSize: '200%', backgroundPosition: 'left 30%'}}>
    style={{backgroundImage: "url('/background-image-home.webp')", backgroundSize: '150%', backgroundPosition: 'left 5%'}}>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="w-full max-w-3xl z-10">
        <Image
          src="/bg-image.png"
          alt="Anime characters eating together"
          width={400}
          height={200}
          className="mx-auto mb-8"
        />
        
        <h1 className="text-5xl font-bold mb-4 text-center text-white">Your Manga Explorer</h1>
        
        <p className="text-xl mb-8 text-center text-white">
          Dive into the world of manga with MangaHeaven. Search for your favorite titles, discover new series, and start reading instantly.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <Input 
              type="text" 
              placeholder="Search manga..." 
              className="w-full pl-10 pr-4 py-2 rounded-full bg-opacity-20 text-white"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white" />
          </div>
          <Button className="ml-2 bg-purple-600 hover:bg-purple-700 rounded-full">
            Search
          </Button>
        </div>
      </div>
    </div>
  )
}