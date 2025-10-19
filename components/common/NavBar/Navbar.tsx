"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import MangaIcon from "./components/MangaIcon";
import DropMenuAtoZ from "./components/Dropdown-Atoz";
import MainAutoSearch from "./components/MainAutoSearch";
import SideNav from "./components/SideNav";
import DropMenuTypes from "./components/DropMenuTypes";
import DropMenuGenres from "./components/DropMenuGenres";
import SideNavV2 from "./components/SideNavV2";

const Navbar: React.FC = () => {
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
                onClick={() => router.push("/dashboard")}
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
            <MainAutoSearch  />
            <div className="flex justify-evenly items-center gap-3">
              <Avatar 
                className="cursor-pointer border-[2px] hover:dark:border-white hover:border-black border-transparent duration-300 transition-ease-in  "
                onClick={() => router.push("/profile")}
              >
                <AvatarImage
                  src={
                    session.data?.user?.image || "https://github.com/shadcn.png"
                  }
                  alt="Avatar"
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

export default Navbar;
