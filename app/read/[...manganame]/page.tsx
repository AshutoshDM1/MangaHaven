"use client";
import NavbarMain from "@/components/NavBar/NavbarMain";
import { Skeleton } from "@/components/ui/skeleton";
import { getMangaChapterRead, getMangaImage } from "@/services/api";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

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
  const [mangaImage, setMangaImage] = useState("");
  const [showChap, setShowChap] = useState<boolean>(false);
  const [slide, setSlide] = useState<boolean>(true);

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
      const sendMangaImage = { title: manganame[0].split("%20").join(" ") };
      const mangaimage = await getMangaImage(sendMangaImage);
      setMangaImage(mangaimage);
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
          {mangaImage === "" ? (
            <>
              <Skeleton className="h-[40vh] w-full hidden md:block " />
            </>
          ) : (
            <>
              <img
                className="object-cover h-[40vh] hidden md:block rounded-[10px]  "
                src={mangaImage}
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
                className="w-fit z-30 absolute top-10 min-h-fit rounded-md bg-[#f8b416] flex flex-col justify-center items-center  gap-1 p-4 "
              >
                <motion.h1
                  onClick={() => handleRoute("1")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.1 }}
                  className="w-[8rem] z-30 font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-1 rounded-md  cursor-pointer px-3 select-none "
                >
                  Chapter 1
                </motion.h1>
                <motion.h1
                  onClick={() => handleRoute("2")}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 1.1 }}
                  className="w-[8rem] z-30 font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-1 rounded-md  cursor-pointer px-3 select-none "
                >
                  Chapter 2
                </motion.h1>
              </motion.div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-fit md:w-full  flex justify-center items-center gap-3 ">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              onClick={() => {
                if (Number(manganame[1]) >= 2) {
                  router.push(
                    `/read/${manganame[0]}/${Number(manganame[1]) - 1}`,
                  );
                } else {
                  toast.error("There is no Chapter 0");
                }
              }}
              className="w-1/2 py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center cursor-pointer "
            >
              <ChevronLeft />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              onClick={() => {
                if (Number(manganame[1]) <= 1) {
                  router.push(
                    `/read/${manganame[0]}/${Number(manganame[1]) + 1}`,
                  );
                } else {
                  toast.error("There is no more than 2 Chapter");
                }
              }}
              className="w-1/2 py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center  cursor-pointer  "
            >
              <ChevronRight />
            </motion.div>
          </div>
          <div className="w-fit md:w-full flex justify-center items-center gap-3 ">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              onClick={() => {
                setSlide(true);
              }}
              className={`w-1/2 py-[5px] px-3 bg-[#ec2f4b] ${
                slide ? "bg-[#ff2b2b]" : ""
              } rounded-md flex justify-center items-center cursor-pointer `}
            >
              <GalleryVertical />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              onClick={() => {
                setSlide(false);
              }}
              className={`w-1/2 py-[5px] px-3 bg-[#ec2f4b] ${
                slide ? "" : "bg-[#ff2b2b]"
              } rounded-md flex justify-center items-center cursor-pointer `}
            >
              <GalleryHorizontal />
            </motion.div>
          </div>
        </div>
        <div className="h-full max-w-[50rem] mx-auto pt-5 overflow-y-auto relative ">
          {manga.length === 1 ? (
            <>
              <Skeleton className="h-[98%] lg:w-[65vh] md:w-[40vh] w-[30vh] " />
            </>
          ) : (
            <>
              {slide ? (
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
              ) : (
                <>
                  <div className="max-h-[90%] w-full sm:w-[30rem] mx-auto mt-5 px-2 flex justify-center items-center overflow-hidden rounded-[15px] ">
                    <Carousel className="w-full flex justify-center items-center">
                      <CarouselContent>
                        {manga.map((manga) => {
                          return (
                            <>
                              <CarouselItem>
                                <div className="h-[80vh] md:h-fit w-full flex justify-center items-center ">
                                  <Image
                                    className="h-fit w-fit object-cover select-none rounded-[15px] "
                                    src={manga.url}
                                    alt={manga.url}
                                    width={550}
                                    height={550}
                                  />
                                </div>
                              </CarouselItem>
                            </>
                          );
                        })}
                      </CarouselContent>
                    </Carousel>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ReadPage;
