"use client";
import NavbarMain from "@/components/NavBar/NavbarMain";
import { getManga, getMangaChapterRead } from "@/services/api";
import {
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  GalleryVertical,
} from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ReadPage = () => {
  const { manganame } = useParams();
  const [manga, setmanga] = useState([{ url: "" }]);
  const [mangaImage, setMangaImage] = useState({ imageUrl : ""});

  useEffect(() => {
    const fetchData = async () => {
      const mangadata = {
        mangaName: manganame[0].split("%20").join(" "),
        chapter: `chapter ${manganame[1]}`,
      };
      const data = await getMangaChapterRead(mangadata);
      const mangaimage = await getManga();
      // Fix the filter to compare the correct property
      const filteredManga = mangaimage.find((item: any) => item.title === manganame[0].split("%20").join(" ")); // Assuming 'name' is the correct property
      setMangaImage(filteredManga)
      setmanga(data);
    };
    fetchData();
  }, [setmanga]);

  return (
    <>
      <NavbarMain />
      <div className="h-[92vh] w-full flex justify-center items-center flex-col md:flex-row ">
        <div
          className="h-fit flex-wrap md:h-full w-full md:w-[40vh] md:bg-[#e9e9e9] md:dark:bg-gradient-to-r from-[#000000] to-[#363636]      flex flex-row  md:flex-col justify-center md:justify-start  items-center p-3 px-5 md:pt-10 gap-4
          "
        >
          <img
            className="object-cover hidden md:block rounded-[10px]  "
            src= {mangaImage.imageUrl}
            alt="Naruto_lvhvkh.png"
          />

          <h1 className="w-full md:w-fit  text-xl font-bold text-center">
            {manganame[0].split("%20").join(" ")}
          </h1>
          <div className="w-fit md:w-full flex items-center justify-center  ">
            <h1 className="w-full font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-2 rounded-md  cursor-pointer px-3 ">
              Chapter {manganame[1]}
            </h1>
          </div>
          <div className="w-fit md:w-full  flex justify-center items-center gap-3 ">
            <div className="w-1/2 py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center cursor-pointer ">
              <ChevronLeft />
            </div>
            <div className="w-1/2 py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center  cursor-pointer  ">
              <ChevronRight />
            </div>
          </div>
          <div className="w-fit md:w-full hidden md:flex  justify-center items-center gap-3 ">
            <div className="w-1/2 py-[5px] px-3 bg-[#ec2f4b] rounded-md flex justify-center items-center cursor-pointer ">
              <GalleryVertical />
            </div>
            <div className="w-1/2 py-[5px] px-3 bg-[#ec2f4b] rounded-md flex justify-center items-center  cursor-pointer  ">
              <GalleryHorizontal />
            </div>
          </div>
        </div>
        <div className="h-full w-full pt-5 overflow-y-auto  ">
          {manga.map((manga) => {
            return (
              <>
                <div
                  key={manga.url}
                  className="mx-auto max-w-[50rem] px-5 mb-5 h-fit flex justify-center items-start "
                >
                  <Image
                    className="object-cover"
                    src={manga.url}
                    alt="OPM_0004-001.png"
                    width={550}
                    height={550}
                  />
                </div>
              </>
            );
          })}
          <div className="h-[5vh] absolute md:sticky bottom-0 w-full flex justify-center">
            <div className="md:w-[60%] w-full h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-[10px] flex justify-evenly items-center ">
              <div className="flex justify-center items-center cursor-pointer ">
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
              <div className="flex justify-center items-center cursor-pointer ">
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
