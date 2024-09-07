import Image from "next/image";
import { useRouter } from "next/navigation";

const MangaIcon = () => {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push("/home")}
        className="h-full w-fit justify-center items-center cursor-pointer flex"
      >
        <Image
          src="/MangaHaven Logo.png"
          alt="MangaHaven Logo"
          width={40}
          height={40}
          style={{ width: "auto", height: "auto" }}
        />
        <div className="ml-2 flex flex-col">
          <h1 className=" font-bold text-xl">Manga</h1>
          <h1 className=" font-bold text-xl -mt-2">Heaven</h1>
        </div>
      </div>
    </>
  );
};

export default MangaIcon;
