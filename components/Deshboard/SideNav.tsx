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

const SideNav = () => {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Menu</Button>
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
            <Button onClick={() => router.push("/login")}>Log In</Button>
            <Button onClick={() => router.push("/signup")}>Sign Up</Button>
            <Button onClick={() => router.push("/")}>Dashboard</Button>
            <Button onClick={() => router.push("/home")}>Home</Button>
            <Button onClick={() => signOut()}>Sign Out</Button>
          </>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
