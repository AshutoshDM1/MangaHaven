"use client";
import NavbarMain from "@/components/NavBar/NavbarMain";
import { Skeleton } from "@/components/ui/skeleton";
import { getManga, getMangaChapterRead } from "@/services/api";
import { motion } from "framer-motion";

import {
  ChevronLeft,
  ChevronRight,
  GalleryHorizontal,
  GalleryVertical,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ReadPage = () => {
  const { manganame } = useParams();
  const router = useRouter();
  const [manga, setmanga] = useState([{ url: "" }]);
  const [mangaImage, setMangaImage] = useState({ imageUrl: "" });
  const [showChap, setShowChap] = useState<boolean>(false);

  const handleRoute = (route: string) => {
    router.push(`/read/${manganame[0]}/${route}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      const mangadata = {
        mangaName: manganame[0].split("%20").join(" "),
        chapter: `chapter-${manganame[1]}`,
      };
      const data = await getMangaChapterRead(mangadata);
      const mangaimage = await getManga();
      // Fix the filter to compare the correct property
      const filteredManga = mangaimage.find(
        (item: any) => item.title === manganame[0].split("%20").join(" ")
      ); // Assuming 'name' is the correct property
      setMangaImage(filteredManga);
      setmanga(data);
    };
    fetchData();
  }, [setmanga]);

  return (
    <>
      <NavbarMain />
      <div className="h-[92vh] w-full flex justify-center items-center flex-col md:flex-row overflow-hidden relative ">
        <div
          className="h-fit flex-wrap md:h-full w-full md:w-[40vh] md:bg-[#e9e9e9] md:dark:bg-gradient-to-r from-[#000000] to-[#363636] flex flex-row  md:flex-col justify-center md:justify-start  items-center p-3 px-5 md:pt-10 gap-4
          "
        >
          {mangaImage.imageUrl === "" ? (
            <>
              <Skeleton className="h-[40vh] w-full hidden md:block " />
            </>
          ) : (
            <>
              <img
                className="object-cover h-[40vh] hidden md:block rounded-[10px]  "
                src={mangaImage.imageUrl}
                alt="Naruto_lvhvkh.png"
              />
            </>
          )}

          <h1 className="w-full md:w-fit  text-xl font-bold text-center">
            {manganame[0].split("%20").join(" ")}
          </h1>
          <div className="w-fit md:w-full flex items-center justify-center relative ">
            <h1
              onClick={() => setShowChap(!showChap)}
              className="w-full font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-1 rounded-md  cursor-pointer px-3 select-none "
            >
              Chapter {manganame[1]}
            </h1>
            {showChap ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-[80%] absolute top-10 min-h-fit rounded-md bg-[#f8b416] flex flex-col justify-center items-center  gap-1  py-4 "
              >
                <motion.h1
                  onClick={() => handleRoute("1")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.1 }}
                  className="w-[80%] font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-1 rounded-md  cursor-pointer px-3 select-none "
                >
                  Chapter 1
                </motion.h1>
                <motion.h1
                  onClick={() => handleRoute("2")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.1 }}
                  className="w-[80%] font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-1 rounded-md  cursor-pointer px-3 select-none "
                >
                  Chapter 2
                </motion.h1>
              </motion.div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-fit md:w-full  flex justify-center items-center gap-3 ">
            <div
              onClick={() => {
                if (Number(manganame[1]) >= 2) {
                  router.push(
                    `/read/${manganame[0]}/${Number(manganame[1]) - 1}`
                  );
                } else {
                  toast.error("There is no Chapter 0");
                }
              }}
              className="w-1/2 py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center cursor-pointer "
            >
              <ChevronLeft />
            </div>
            <div
              onClick={() => {
                if (Number(manganame[1]) <= 1) {
                  router.push(
                    `/read/${manganame[0]}/${Number(manganame[1]) + 1}`
                  );
                } else {
                  toast.error("There is no more than 2 Chapter");
                }
              }}
              className="w-1/2 py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center  cursor-pointer  "
            >
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
        <div className="h-full w-full pt-5 overflow-y-auto relative ">
          {manga.length === 1 ? (
            <>
              <Skeleton className="h-full max-w-[50rem] mx-5 md:mx-auto " />
            </>
          ) : (
            manga.map((manga) => {
              return (
                <>
                  <div
                    key={manga.url}
                    className="mx-auto max-w-[50rem] px-5 mb-5 h-fit flex justify-center items-start "
                  >
                    <Image
                      className="object-cover select-none "
                      src={manga.url}
                      alt={manga.url}
                      width={550}
                      height={550}
                    />
                  </div>
                </>
              );
            })
          )}
          <div className="h-[5vh] sticky bottom-0 w-full flex justify-center items-center  overflow-hidden ">
            <div className="w-[70vh] h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-t-[10px] flex justify-evenly items-center flex-shrink ">
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
