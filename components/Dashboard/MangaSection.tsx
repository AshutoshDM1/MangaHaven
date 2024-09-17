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
      <div className="min-h-[60vh] w-full flex justify-center items-center">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-8 transition-all duration-300">
          {mangas.length === 1
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
                return (
                  <>
                    <Skeleton className="w-[21vh] h-[270px] rounded-lg" />
                  </>
                );
              })
            : mangas.map((item) => (
                <div
                  key={item.id}
                  style={{ 
                    boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
                    transition: 'background-color 0.3s ease, transform 0.3s ease'
                  }}
                  className="dark:border-[#3a3a3a] border dark:border hover:bg-zinc-900 transform cursor-pointer bg-card rounded-lg shadow-xl overflow-hidden cursor-pointer transition-transform bg-[#161616] h-full sm:w-[24vw] md:w-[20vw] lg:w-[16vw] xl:w-[12vw] 2xl:w-[10vw]"
                >
                  <div className="relative overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={item.imageUrl}
                        alt={`Manga ${item.title}`}
                        width={250}
                        height={250}
                        style={{ 
                          boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
                          transition: 'background-color 0.5s ease, transform 0.3s ease, opacity 0.5s ease'
                        }}
                        className="w-full h-[230px] md:h-[270px] group-hover:scale-105 group-hover:opacity-30 object-cover transition-opacity duration-500"
                      />
                      <div className="absolute bottom-0 right-0 flex flex-col items-end gap-1 transition-all duration-500 ease-in-out transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                        {item.genres.slice(0, 3).map((genre, index) => (
                          <p
                            key={index}
                            className="text-sm text-muted-foreground text-white px-3 py-[2px] rounded-md w-fit"
                            style={{
                              textShadow: '0 0 5px #A977E7, 0 0 10px #A977E7'
                            }}
                          >
                            {genre}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-1 py-3">
                    <h3 className="font-semibold w-full md:text-md text-sm text-center">{item.title}</h3>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default MangaSection;