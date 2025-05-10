"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MangaIcon from "./MangaIcon";
import DropMenuTypes from "../DropMenuTypes";
import DropMenuGenres from "../ui/DropMenuGenres";
import SideNav from "../Dashboard/SideNav";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Search } from "lucide-react";
import DropMenuAtoZ from "../ui/Dropdown-Atoz";

interface NavbarMainProps {}

const NavbarMain: React.FC<NavbarMainProps> = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <>
      <div className="flex justify-center items-center px-1 lg:px-4 border-[#828282a8] border-b-[1px] sticky top-0 z-50 backdrop-blur-md py-3 ">
        <div className="w-full md:w-full flex justify-between items-center gap-4 ">
          <div className="flex gap-8 items-center justify-center lg:justify-start w-fit">
            <div className="flex items-center gap-3">
              <SideNav />
              <MangaIcon />
            </div>
            <div className="2xl:flex gap-4 hidden ">
              <button
                onClick={() => router.push("/")}
                className=" font-semibold text-base"
              >
                Home
              </button>
              <DropMenuTypes />
              <DropMenuGenres />
              <DropMenuAtoZ />
            </div>
          </div>
          <div className="h-full flex items-center gap-3 w-fit transition-all duration-300">
            <div className="w-full h-full justify-center items-center gap-3 lg:flex hidden select-none">
              <input
                className="h-[4.5vh] w-[65vh] text-black dark:text-white bg-zinc-200 dark:bg-zinc-900 rounded-full border-none focus:border focus:outline-none pl-6 pr-4 md:text-none "
                type="text"
                placeholder="Search Manga..."
              /> 
            </div>
            <Search className="h-8 w-8 text-[#c4c4c4] text-xl cursor-pointer" />
            <div className="flex justify-evenly items-center gap-3">
              <Avatar
                className="cursor-pointer border-[2px] hover:dark:border-white hover:border-black border-transparent duration-300 transition-ease-in  "
                onClick={() => router.push("/profile")}
              >
                <AvatarImage
                  src={
                    session.data?.user?.image || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMain;
