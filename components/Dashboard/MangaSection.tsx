"use client";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { mangaData } from "@/state/atoms";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import { getManga } from "@/services/api";

const MangaSection = () => {
  const [mangas, setMangas] = useRecoilState(mangaData);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getManga();
      setMangas(data);
    };
    fetchData();
  }, [setMangas]);

  return (
    <>
      <div className="min-h-[60vh] w-full flex justify-center items-center  px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8  transition-all duration-300">
          {mangas.length === 1
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
                return (
                  <>
                    <Skeleton className="w-[20vh] h-[250px] p-5 rounded-lg" />
                  </>
                );
              })
            : mangas.map((item) => (
                <div
                  key={item.id}
                  className="bg-card rounded-lg shadow-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 w-fit bg-[#161616] "
                >
                  <Image
                    src={item.imageUrl}
                    alt={`Manga ${item.title}`}
                    width={250}
                    height={250}
                    className="w-full h-[230px] md:h-[250px] object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                    <div className="flex flex-wrap gap-1">
                      {item.genres.map((item, index) => {
                        return (
                          <p
                            key={index}
                            className="text-sm text-muted-foreground text-white bg-[#995de3] px-3 py-[2px] rounded-md "
                          >
                            {item}
                          </p>
                        );
                      })}
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
