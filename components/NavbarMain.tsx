"use client"
import { useState } from "react";

interface NavbarMainProps {}

const NavbarMain: React.FC<NavbarMainProps> = () => {

const [showList , setShowList] =  useState<Boolean>(false);

const handleClick = () => {
  setShowList(prevState => !prevState);
}

  return (
    <>
      <div className="h-8h w-full bg-zinc-800 flex justify-center items-center">
        <div className="h-full w-70w  flex justify-between items-center">
          <div className="h-full flex justify-center items-center">
            <img className="h-80h " src="./MangaHaven Logo.png" />
            <h1 className="text-white mt-4 ml-4 font-bold text-2xl">
              MangaHaven
            </h1>
          </div>
          <button className="text-white mt-4 ml-4 font-semibold text-base">
            Completed
          </button>
          <div className="h-full flex justify-center items-center relative ">
            
            <button
            onClick={handleClick}
            className="text-white mt-4 ml-4 font-semibold text-base">
              Types
            </button>
            {showList === true ? (
              <>
              <div className={`absolute ease-in-out duration-100 flex h-64 w-56 rounded-3xl top-28 left-1 flex-col justify-center items-center bg-zinc-800`}>
              <h1 className="h-15h w-90w flex pl-6 rounded-xl items-center text-white font-semibold text-base hover:bg-zinc-500  cursor-pointer ease-in duration-100">
                Manga
              </h1>
              <h1 className="h-15h w-90w flex pl-6 rounded-xl items-center text-white font-semibold text-base hover:bg-zinc-500  cursor-pointer ease-in duration-100">
                One-Short
              </h1>
              <h1 className="h-15h w-90w flex pl-6 rounded-xl items-center text-white font-semibold text-base hover:bg-zinc-500  cursor-pointer ease-in duration-100">
                Manhwa
              </h1>
              <h1 className="h-15h w-90w flex pl-6 rounded-xl items-center text-white font-semibold text-base hover:bg-zinc-500  cursor-pointer ease-in duration-100">
                Manhua
              </h1>
              <h1 className="h-15h w-90w flex pl-6 rounded-xl items-center text-white font-semibold text-base hover:bg-zinc-500  cursor-pointer ease-in duration-100">
                Comic
              </h1>
            </div>
              </> 
            
            ) : (<></>) }
          </div>
          <button className="text-white mt-4 ml-4 font-semibold text-base">
            A-Z List
          </button>
          <button className="text-white mt-4 ml-4 font-semibold text-base">
            News
          </button>
          <div className="w-40w h-full flex mt-4 justify-center items-center gap-10" >
          <input className="h-50h w-60w rounded-xl border-none focus:border focus:outline-none pl-6" type="text" placeholder="Search" />
          <button className="text-white  ml-4 font-medium text-base">
            Member
          </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarMain;
