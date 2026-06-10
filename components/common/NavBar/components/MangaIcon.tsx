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
          src="/logo.png"
          alt="MangaHaven Logo"
          className="flex-shrink-0 size-8"
          width={105}
          height={105}
        />
        <div className="ml-2 flex">
          <span className=" font-medium text-lg">Manga</span>
          <span className=" font-medium text-lg">Heaven</span>
        </div>
      </div>
      </Link>
    </>
  );
};

export default MangaIcon;
