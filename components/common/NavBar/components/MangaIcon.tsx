import Image from "next/image";
import Link from "next/link";

const MangaIcon = () => {
  return (
    <>
      <Link href="/dashboard">
      <div
        className="h-full w-fit justify-center items-center cursor-pointer flex"
      >
        <Image
          src="/favicon.ico"
          alt="MangaHaven Logo"
          width={35}
          height={35}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="ml-2 flex flex-col">
          <span className=" font-medium text-[1.2rem]">Manga</span>
          <span className=" font-medium text-[1.2rem] -mt-2">Heaven</span>
        </div>
      </div>
      </Link>
    </>
  );
};

export default MangaIcon;
