"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import MangaIcon from "./MangaIcon";
import DropMenuTypes from "../DropMenuTypes";
import DropMenuGenres from "../ui/DropMenuGenres";
import { Button } from "../ui/button";
import SideNav from "../Dashboard/SideNav";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface NavbarMainProps {}

const NavbarMain: React.FC<NavbarMainProps> = () => {
  const router = useRouter();
  const session = useSession();

  return (
    <>
      <div className="min-h-[5vh]  md:min-h-[8vh]  py-1 lg:py-3 max-h-fit flex justify-center items-center px-1 lg:px-4 border-[#828282a8] border-b-[1px] sticky top-0 z-50 backdrop-blur-md ">
        <div className="h-full w-full md:w-full flex flex-wrap justify-between items-center gap-4 ">
          <div className="h-full flex gap-8 items-center justify-center lg:justify-start w-full lg:w-fit ">
            <div className="hidden lg:flex ">
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
              <button className="font-semibold text-base ml-4">A-Z List</button>
            </div>
          </div>
          <div className="h-full flex lg:flex-row flex-row-reverse justify-between items-center gap-3 w-full xl:w-[60%]  lg:w-[75%] transition-all duration-300 ">
            <div className="w-[90%] h-full flex justify-center items-center gap-3">
              <input
                className="h-[4.5vh] w-full text-black dark:text-white bg-zinc-200 dark:bg-zinc-900 rounded-full border-none focus:border focus:outline-none pl-6 pr-4 md:text-none text-center"
                type="text"
                placeholder="Search Manga..."
              />
            </div>
            <div className="flex flex-row-reverse  justify-evenly items-center gap-3 w-fit lg:w-[35%] md:w-[40%] ">
              <Avatar
                className="cursor-pointer  border-[2px] hover:dark:border-white hover:border-black border-transparent duration-300 transition-ease-in  "
                onClick={() => router.push("/profile")}
              >
                <AvatarImage
                  src={
                    session.data?.user?.image || "https://github.com/shadcn.png"
                  }
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              {session.data?.user?.name ? (
                <>
                  <h1 className="text-base font-semibold w-fit hidden md:flex ">
                    Hi! {session.data?.user?.name.toUpperCase()}
                  </h1>{" "}
                </>
              ) : (
                <>
                  <Button
                    className="h-[3.5vh] bg-[#A977E7] hover:bg-[#a05cf3] text-white sm:block hidden "
                    onClick={() => router.push("/login")}
                  >
                    Log In
                  </Button>
                  <Button
                    className="h-[3.5vh] bg-[#ff5289] hover:bg-[#fa457e] text-white "
                    onClick={() => router.push("/signup")}
                  >
                    Sign Up
                  </Button>
                </>
              )}
              <div className="w-fit ">
                {" "}
                <SideNav />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMain;
