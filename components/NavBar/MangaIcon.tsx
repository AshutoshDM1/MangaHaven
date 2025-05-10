import Image from "next/image";
import { useRouter } from "next/navigation";

const MangaIcon = () => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/")}
        className="h-full w-fit justify-center items-center cursor-pointer flex"
      >
        <Image
          src="/MangaHaven Logo.png"
          alt="MangaHaven Logo"
          width={35}
          height={35}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="ml-2 flex flex-col">
          <h1 className=" font-bold text-[1.2rem]">Manga</h1>
          <h1 className=" font-bold text-[1.2rem] -mt-2">Heaven</h1>
        </div>
      </div>
    </>
  );
};

export default MangaIcon;
