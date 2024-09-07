"use client";
import NavbarMain from "@/components/NavBar/NavbarMain";
import { useParams } from "next/navigation";

const ReadPage = () => {
  const { manganame } = useParams();

  return (
    <>
      <NavbarMain />
      <div className="h-[90vh] w-full flex justify-center items-center">
        <div
          className="h-full w-[40%] lg:w-[20%] md:w-[30%] bg-foreground/10 flex flex-col justify-start items-start p-3 pt-10
          "
        >
          <h1 className="text-2xl font-bold text-center">You Are Reading</h1>
          <h1 className="text-2xl font-normal text-center">
            {manganame[0].split("%20").join(" ")}
          </h1>
          <h1 className="text-2xl font-normal text-center">
            Chapter -{manganame[1]}
          </h1>
        </div>
        <div className="h-full w-[80%] bg-foreground/5 "></div>
      </div>
    </>
  );
};

export default ReadPage;
