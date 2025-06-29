"use client";
import NavbarMain from "@/components/NavBar/NavbarMain";
import { Skeleton } from "@/components/ui/skeleton";
import { getManga, getMangaChapterRead, getMangaImage } from "@/services/api";
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
import {
  getMangaById,
  getMangaChapter,
  getMangaChapterImage,
  getMangaChapterById,
} from "@/services/apiv2";
import { Manga } from "@/app/admin/page";
import { MangaChapter, MangaChapterImage } from "@prisma/client";

const ReadPage = () => {
  const { mangaId, mangaChapterId } = useParams();
  const router = useRouter();
  const [manga, setmanga] = useState<Manga | null>(null);
  const [mangaChapter, setMangaChapter] = useState<MangaChapter | null>(null);
  const [mangaChapterList, setMangaChapterList] = useState<
    MangaChapter[] | null
  >(null);
  const [mangaImage, setMangaImage] = useState<MangaChapterImage[] | null>(
    null
  );
  const [showChap, setShowChap] = useState<boolean>(false);
  const [slide, setSlide] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      const mangadata = await getMangaById(Number(mangaId));
      const mangaChapterdata = await getMangaChapterById(
        Number(mangaId),
        Number(mangaChapterId)
      );
      const mangaChapterImagedata = await getMangaChapterImage(
        Number(mangaChapterId)
      );
      const mangaChapterListdata = await getMangaChapter(Number(mangaId));

      setmanga(mangadata as unknown as Manga);
      setMangaChapter(mangaChapterdata.data);
      setMangaImage(mangaChapterImagedata.data);
      setMangaChapterList(mangaChapterListdata.data);
    };
    fetchData();
  }, []);

  const handleChapterClick = (chapterId: number) => {
    router.push(`/read/${mangaId}/${chapterId}`);
  };

  const handleChapterClickPrevious = () => {
    try {
      const currentChapterId = mangaChapter?.id;
      if (!currentChapterId) {
        toast.error("There is no chapter");
        return;
      }
      if (!mangaChapterList) {
        toast.error("There are no chapters");
        return;
      }
      const nextChapterIndex = mangaChapterList?.findIndex(
        (chapter) => chapter.id === currentChapterId
      );
      if (nextChapterIndex === -1 || nextChapterIndex === undefined || nextChapterIndex === 0) {
        toast.error("There is no more chapter");
        return;
      }
      // console.log(mangaChapterList?.[nextChapterIndex - 1]);
      router.push(
        `/read/${mangaId}/${mangaChapterList?.[nextChapterIndex -1].id}`
      );
    } catch (error) {
      toast.error("There is no chapter");
      return;
    }
  };

  const handleChapterClickNext = () => {
    try {
      const currentChapterId = mangaChapter?.id;
      if (!currentChapterId) {
        toast.error("There is no chapter");
        return;
      }
      if (!mangaChapterList) {
        toast.error("There are no chapters");
        return;
      }
      const nextChapterIndex = mangaChapterList?.findIndex(
        (chapter) => chapter.id === currentChapterId
      );
      if (nextChapterIndex === -1 || nextChapterIndex === undefined || nextChapterIndex === mangaChapterList.length - 1) {
        toast.error("There is no more chapter");
        return;
      }
      // console.log(mangaChapterList?.[nextChapterIndex - 1]);
      router.push(
        `/read/${mangaId}/${mangaChapterList?.[nextChapterIndex +1].id}`
      );
    } catch (error) {
      toast.error("There is no chapter");
      return;
    }
  };

  return (
    <>
      <NavbarMain />
      <div className="h-[92vh] w-full flex justify-center items-center flex-col md:flex-row overflow-hidden relative ">
        <div
          className="h-fit flex-wrap md:h-full w-full md:w-[40vh] md:bg-[#e9e9e9] md:dark:bg-gradient-to-r from-[#000000] to-[#363636] flex flex-row  md:flex-col justify-center md:justify-start  items-center p-3 px-5 md:pt-10 gap-4
          "
        >
          {manga == null ? (
            <>
              <Skeleton className="h-[40vh] w-full hidden md:block " />
            </>
          ) : (
            <>
              <img
                className="object-cover h-[40vh] hidden md:block rounded-[10px]  "
                src={(manga && mangaChapter && manga.coverImageUrl) || ""}
                alt="Naruto_lvhvkh.png"
              />
            </>
          )}

          <h1 className="w-full md:w-fit  text-xl font-bold text-center flex flex-col gap-2 items-center justify-center">
            {manga && mangaChapter && manga.title}
            <span className="text-primary text-lg font-medium">
              {mangaChapter?.chapterTitle}
            </span>
          </h1>

          <div className="w-fit md:w-full flex items-center justify-center relative ">
            <h1
              onClick={() => setShowChap(!showChap)}
              className="w-full font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-1 rounded-md  cursor-pointer px-3 select-none "
            >
              Chapter {mangaChapter?.chapterNumber}
            </h1>
            {showChap ? (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="w-fit z-30 absolute top-10 min-h-fit rounded-md bg-[#f8b416] flex flex-col justify-center items-center  gap-1 p-4 "
              >
                {mangaChapterList &&
                  mangaChapterList.map((manga) => {
                    return (
                      <motion.h1
                        key={manga.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 1.1 }}
                        className="w-[8rem] z-30 font-bold text-[1.2rem] md:text-[1.2rem]  text-center bg-[#e9962a]  py-1 rounded-md  cursor-pointer px-3 select-none "
                        onClick={() => handleChapterClick(manga.id)}
                      >
                        Chapter {manga.chapterNumber}
                      </motion.h1>
                    );
                  })}
              </motion.div>
            ) : (
              <></>
            )}
          </div>
          <div className="w-fit md:w-full  flex justify-center items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              onClick={handleChapterClickPrevious}
              className="w-1/2 py-[5px] px-3 bg-[#8031ff] rounded-md flex justify-center items-center cursor-pointer "
            >
              <ChevronLeft />
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 1.1 }}
              onClick={handleChapterClickNext}
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
          {mangaImage === null ? (
            <>
              <Skeleton className="h-[98%] lg:w-[65vh] md:w-[40vh] w-[30vh] " />
            </>
          ) : (
            <>
              {slide ? (
                mangaImage &&
                mangaImage.map((manga) => {
                  return (
                    <>
                      <div
                        key={manga.imageUrl}
                        className="mx-auto max-w-[50rem] px-5 mb-5 h-fit flex justify-center items-start "
                      >
                        <Image
                          className="object-cover select-none "
                          src={manga.imageUrl}
                          alt={manga.imageUrl}
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
                        {mangaImage &&
                          mangaImage.map((manga) => {
                            return (
                              <>
                                <CarouselItem>
                                  <div className="h-[80vh] md:h-fit w-full flex justify-center items-center ">
                                    <Image
                                      className="h-fit w-fit object-cover select-none rounded-[15px] "
                                      src={manga.imageUrl}
                                      alt={manga.imageUrl}
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
