import { useRecoilState } from "recoil";
import Image from "next/image";
import { mangaData } from "@/state/atoms";
import { Skeleton } from "../ui/skeleton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getAllManga } from "@/services/apiv2";
import { Manga } from "@/app/admin/page";


const MangaSection = () => {
  const [mangas, setMangas] = useRecoilState(mangaData);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllManga();
      setMangas(data);
    };
    fetchData();
  }, [setMangas]);

  console.log(mangas);

  const handleMangaClick = (mangaId: number) => {
      router.push(`/read/${mangaId}`);
  };

  return (
    <>
      <div className="w-[96%] mx-auto">
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-8 transition-all duration-300"
        >
          {mangas.length === 1
            ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => {
                return (
                  <Skeleton
                    key={index}
                    className="w-[21vh] h-[270px] rounded-lg"
                  />
                );
              })
            : mangas.map((item) => (
                <motion.div
                  onClick={() => handleMangaClick(item.id)}
                  key={item.id}
                  className="dark:border-[#3a3a3a] border dark:border dark:hover:bg-zinc-900 transform  bg-card rounded-lg shadow-xl overflow-hidden transition-transform bg-[#161616] h-full cursor-pointer"
                >
                  <div className="relative overflow-hidden group">
                    <div className="relative">
                      <Image
                        src={item.coverImageUrl}
                        alt={`Manga ${item.title}`}
                        width={250}
                        height={250}
                        style={{
                          transition:
                            "background-color 0.5s ease, transform 0.3s ease, opacity 0.5s ease",
                        }}
                        className="w-full h-[250px] group-hover:scale-105  group-hover:opacity-50 object-cover transition-opacity duration-500"
                      />
                      <div className="absolute bottom-4 right-0 flex flex-col items-end gap-1 transition-all duration-500 ease-in-out transform translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100">
                        {item.genres.slice(0, 3).map((genre, index) => (
                          <p
                            key={`${item.id}-${genre}`}
                            className={`text-sm text-white px-3 py-[2px] rounded-md w-fit`}
                            style={{
                              textShadow: "0 0 10px #A977E7, 0 0 10px #A977E7",
                            }}
                          >
                            {genre}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center p-1 py-3">
                    <h3 className="font-semibold w-full md:text-md text-sm text-center">
                      {item.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
        </motion.div>
      </div>
    </>
  );
};

export default MangaSection;
