"use client";
import { ModeToggle } from "./ModeToggle";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DropMenuTypes from "./DropMenuTypes";
import DropMenuGenres from "./ui/DropMenuGenres";
import { signOut, useSession } from "next-auth/react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import SideNav from "./Deshboard/SideNav";
import { SearchIcon } from "lucide-react";
import Image from "next/image";

interface NavbarMainProps {}

const NavbarMain: React.FC<NavbarMainProps> = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <>
      <div className="min-h-[5vh]  md:min-h-[8vh]  py-1 md:py-3 max-h-fit flex justify-center items-center px-0 md:px-4 border-[#828282a8] border-b-[1px] sticky top-0 z-50 backdrop-blur-md ">
        <div className="h-full w-full md:w-full flex flex-wrap justify-between items-center gap-4 ">
          <div className="h-full flex gap-8 items-center justify-center lg:justify-start w-full lg:w-fit ">
            <div
              onClick={() => router.push("/home")}
              className="h-full flex justify-center items-center cursor-pointer "
            >
              <Image
                className="h-[50px]"
                src="/MangaHaven Logo.png"
                alt="MangaHaven Logo"
                width={50}
                height={50}
              />
              <div className="ml-2 flex flex-col">
                <h1 className=" font-bold text-2xl">Manga</h1>
                <h1 className=" font-bold text-2xl -mt-2">Heaven</h1>
              </div>
            </div>
            <div className="2xl:flex gap-4 hidden ">
              <button
                onClick={() => router.push("/home")}
                className=" font-semibold text-base"
              >
                Home
              </button>
              <DropMenuTypes />
              <DropMenuGenres />
              <button className="font-semibold text-base ml-4">A-Z List</button>
            </div>
          </div>
          <div className="h-full flex flex-col md:flex-row justify-between items-center gap-3 w-full xl:w-[60%]  lg:w-[75%] transition-all duration-300 ">
            <div className="w-[90%] h-full flex justify-center items-center gap-3">
              <input
                className="h-[4.5vh] w-full text-black dark:text-white bg-zinc-200 dark:bg-zinc-900 rounded-full border-none focus:border focus:outline-none pl-6 pr-4 "
                type="text"
                placeholder="Search Manga..."
              />
            </div>
            <div className="flex justify-evenly items-center gap-3 w-[50%] lg:w-[35%] md:w-[40%] ">
              <Avatar>
                <AvatarImage
                  src={
                    session.data?.user?.image || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Button className="h-[3.5vh] bg-[#A977E7] hover:bg-[#a05cf3] text-white "  onClick={() => router.push("/login")}>Log In</Button>
              <Button className="h-[3.5vh] bg-[#ff5289] hover:bg-[#fa457e] text-white " onClick={() => router.push("/signup")}>Sign Up</Button>
              <SideNav />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMain;
