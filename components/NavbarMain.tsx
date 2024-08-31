"use client";
import { useState } from "react";
import { ModeToggle } from "./ModeToggle";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import DropMenuTypes from "./DropMenuTypes";
import DropMenuGenres from "./ui/DropMenuGenres";

interface NavbarMainProps {}

const NavbarMain: React.FC<NavbarMainProps> = () => {
  const [showList, setShowList] = useState<Boolean>(false);

  const handleClick = () => {
    setShowList((prevState) => !prevState);
  };

  return (
    <>
      <div className="min-h-[8vh] py-3 max-h-fit flex justify-center items-center px-0 md:px-4 border-white border-b-[1px]">
        <div className="h-full w-full md:w-full max-w-[70vw] flex flex-wrap justify-between items-center gap-4 ">
          <div className="h-full flex gap-8 items-center justify-center lg:justify-start w-full lg:w-fit mt-5 md:mt-0 ">
            <div className="h-full flex justify-center items-center">
              <img className="h-[50px]" src="./MangaHaven Logo.png" />
              <div className="ml-2 flex flex-col">
                <h1 className=" font-bold text-2xl">Manga</h1>
                <h1 className=" font-bold text-2xl -mt-2">Heaven</h1>
              </div>
            </div>
            <div className="2xl:flex gap-4 hidden ">
              <DropMenuTypes />
              <DropMenuGenres />
              <button className=" font-semibold text-base">Completed</button>
              <button className="font-semibold text-base ml-4">A-Z List</button>
            </div>
          </div>
          <div className="h-full flex justify-between items-center gap-3 w-full lg:w-[50%]">
            <div className="w-[90%] h-full flex justify-center items-center">
              <input
                className="h-[4.5vh] w-full text-black dark:text-white bg-zinc-200 dark:bg-zinc-900 rounded-full border-none focus:border focus:outline-none pl-6"
                type="text"
                placeholder="Search Manga..."
              />
            </div>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            {/* <div>
              <ModeToggle />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMain;
