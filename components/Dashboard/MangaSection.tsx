"use client";
import { useRecoilValue } from "recoil";
import { Button } from "../ui/button";
import Image from "next/image";
// import { manga } from "@/state/atoms";

const MangaSection = () => {

  // const mangas = useRecoilValue(manga);
  // console.log(mangas);
  return (
    <>
      <div className="min-h-[60vh] w-full flex justify-center items-center  px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8  transition-all duration-300">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <div
              key={item}
              className="bg-card rounded-lg shadow-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 w-fit bg-[#161616] "
            >
              <Image
                height={250}
                width={250}
                src={`https://img.mreadercdn.com/_m/300x400/100/3e/c1/3ec1028a31fa8dc8d67c4cd511b14b55/3ec1028a31fa8dc8d67c4cd511b14b55.jpg`}
                alt={`Manga ${item}`}
                className="w-full h-[230px] md:h-[250px] object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Reat a Girlfriend {item}
                </h3>
                <div className="flex gap-1" >
                  {" "}
                  <p className="text-sm text-white bg-[#2d91d9] px-3 py-[2px] rounded-md ">Action</p>
                  <p className="text-sm text-muted-foreground text-white bg-[#ff437f] px-3 py-[2px] rounded-md ">Comedy</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MangaSection;
