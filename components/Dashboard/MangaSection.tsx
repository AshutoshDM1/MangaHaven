"use client";
import { useRecoilState } from "recoil";
import Image from "next/image";
import { mangaData } from "@/state/atoms";
import { Skeleton } from "../ui/skeleton";
import { useEffect, useState } from "react";
import { getManga } from "@/services/api";

const MangaSection = () => {
  const [mangas, setMangas] = useRecoilState(mangaData);
  // const [hoveredManga, setHoveredManga] = useState<number | null>(null);
  // const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getManga();
      setMangas(data);
    };
    fetchData();
  }, [setMangas]);

  // const handleMouseEnter = (id: number) => {
  //   setHoveredManga(id);
  // };

  // const handleMouseLeave = () => {
  //   setHoveredManga(null);
  // };

  // const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  //   const rect = e.currentTarget.getBoundingClientRect();
  //   setMousePosition({
  //     x: e.clientX - rect.left,
  //     y: e.clientY - rect.top,
  //   });
  // };

  return (
    <>
      <div className="min-h-[60vh] w-full flex justify-center items-center px-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8 transition-all duration-300">
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
                  className="dark:border-[#3a3a3a] border dark:border hover:bg-zinc-900 transform cursor-pointer bg-card rounded-lg shadow-xl overflow-hidden cursor-pointer transition-transform bg-[#161616] h-full md:w-[10vw]"
                >
                  <div 
                    // onMouseEnter={() => handleMouseEnter(item.id)}
                    // onMouseLeave={handleMouseLeave}
                    // onMouseMove={handleMouseMove}
                    className="overflow-hidden"
                  >
                    <Image
                      src={item.imageUrl}
                      alt={`Manga ${item.title}`}
                      width={250}
                      height={250}
                      style={{ 
                        boxShadow: '0 0 1rem rgba(0, 0, 0, 0.5)',
                        transition: 'background-color 0.3s ease, transform 0.3s ease'
                      }}
                      className="w-full h-[230px] md:h-[270px] hover:scale-105 object-cover"
                    />
                    {/* {hoveredManga === item.id && (
                      <div 
                        className="absolute bg-black bg-opacity-75 text-white p-2 rounded-md text-sm w-[120px]"
                        style={{
                          left: `${mousePosition.x}px`,
                          top: `${mousePosition.y}px`,
                          transform: 'translate(-50%, -50%)',
                          pointerEvents: 'none',
                        }}
                      >
                        <div className="flex flex-wrap justify-center gap-1">
                          {item.genres.slice(0, 9).map((genre, index) => (
                            <span key={index}>
                              {genre}
                            </span>
                          ))}
                        </div>
                      </div>
                    )} */}
                  </div>
                  <div className="flex items-center p-1 py-3">
                    <h3 className="font-semibold w-full text-md text-center">{item.title}</h3>
                    {/* <div className="flex flex-wrap gap-1">
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
                    </div> */}
                  </div>
                </div>
              ))}
        </div>
      </div>
    </>
  );
};

export default MangaSection;
