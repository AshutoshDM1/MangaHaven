"use client";
import NavbarMain from "@/components/NavBar/NavbarMain";
import { ChevronLeft, ChevronRight, GalleryHorizontal, GalleryVertical } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";

const ReadPage = () => {
  const { manganame } = useParams();

  return (
    <>
      <NavbarMain />
      <div className="h-[92vh] w-full flex justify-center items-center flex-col md:flex-row ">
        <div
          className="min-h-[10vh] h-[15vh] flex-wrap md:h-full w-full md:w-[40vh] md:bg-foreground/10 flex flex-row  md:flex-col justify-start items-center p-3 px-5 md:pt-10 gap-4
          "
        >
          <Image
            className="object-cover hidden md:block rounded-[10px]  "
            src="/Naruto_lvhvkh.png"
            width={200}
            height={200}
            alt="Naruto_lvhvkh.png"
          />

          <h1 className="w-fit text-xl font-bold text-center">
            {manganame[0].split("%20").join(" ")}
          </h1>
          <div className="w-fit md:w-full flex items-center justify-center ">
            <h1 className="w-full font-medium text-[1rem] md:text-[1.2rem]  text-center bg-foreground/5  py-2 rounded-md  cursor-pointer px-3 ">
              Chapter {manganame[1]}
            </h1>
          </div>
          <div className="w-fit md:w-full  flex justify-center items-center gap-3 ">
            <div className="w-1/2 py-[5px] px-3 bg-foreground/10 rounded-md flex justify-center items-center cursor-pointer ">
              <ChevronLeft />
            </div>
            <div className="w-1/2 py-[5px] px-3 bg-foreground/10 rounded-md flex justify-center items-center  cursor-pointer  ">
              <ChevronRight />
            </div>
          </div>
          <div className="w-fit md:w-full hidden md:flex  justify-center items-center gap-3 ">
            <div className="w-1/2 py-[5px] px-3 bg-foreground/10 rounded-md flex justify-center items-center cursor-pointer ">
            <GalleryVertical />
            </div>
            <div className="w-1/2 py-[5px] px-3 bg-foreground/10 rounded-md flex justify-center items-center  cursor-pointer  ">
            <GalleryHorizontal />
            </div>
          </div>
        </div>
        <div className="h-full w-full md:bg-foreground/5 md:overflow-y-auto overflow-hidden">
          {[1, 2, 3].map(() => {
            return (
              <>
                <div className="mx-auto max-w-[50rem] px-5 h-full flex justify-center items-start ">
                  <Image
                    className="object-cover"
                    src="/OPM_0004-001.png"
                    alt="OPM_0004-001.png"
                    width={550}
                    height={550}
                  />
                </div>
              </>
            );
          })}
          <div className="h-[5vh] sticky bottom-0 w-full flex justify-center">
            <div className="md:w-[60%] w-full h-full bg-[#383838] rounded-t-[10px] flex justify-evenly items-center ">
              <div className="flex justify-center items-center ">
                <ChevronLeft className="text-[#f4bc2cf4]" />
                <h1 className="font-normal text-[1rem] md:text-[1.2rem]">
                  Prev
                </h1>
              </div>
              <div className="flex justify-center items-center ">
                <h1 className="w-fit font-normal text-[1rem] md:text-[1.2rem]">
                  33/55
                </h1>
              </div>
              <div className="flex justify-center items-center ">
                <h1 className="font-normal text-[1rem] md:text-[1.2rem]">
                  Next
                </h1>
                <ChevronRight className="text-[#f4bc2cf4]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReadPage;
