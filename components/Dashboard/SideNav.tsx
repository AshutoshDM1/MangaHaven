"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../NavBar/ModeToggle";
import { AlignJustify } from "lucide-react";

const SideNav = () => {
  const router = useRouter();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <AlignJustify className="cursor-pointer" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>MangaHaven</SheetTitle>
          <SheetDescription>
            Welcome to MangaHaven, your ultimate destination for the latest
            manga updates, reviews, and recommendations. Dive into a world of
            captivating stories, vibrant characters, and thrilling adventures
            with our comprehensive manga database.
          </SheetDescription>
          <>
            <div className="flex flex-col gap-2 w-full justify-center items-center h-[50vh] ">
              <ModeToggle />
              <Button
                className="w-[50%] "
                onClick={() => router.push("/login")}
              >
                Log In
              </Button>
              <Button
                className="w-[50%] "
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </Button>
              <Button className="w-[50%] " onClick={() => router.push("/")}>
                Dashboard
              </Button>
              <Button className="w-[50%] " onClick={() => router.push("/home")}>
                Home
              </Button>
              <Button className="w-[50%] mt-24 " onClick={() => signOut()}>
                Sign Out
              </Button>
            </div>
          </>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
