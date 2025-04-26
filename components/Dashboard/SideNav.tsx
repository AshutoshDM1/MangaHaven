"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ModeToggle } from "../NavBar/ModeToggle";
import {
  AlignJustify,
  Home,
  BookOpen,
  User,
  LogIn,
  LogOut,
  UserPlus,
} from "lucide-react";

const SideNav = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => setIsOpen(false);

  useEffect(() => {
    const handleRouteChange = () => closeSheet();
    // router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      // router.events.off("routeChangeComplete", handleRouteChange)
    };
  }, [router]);

  const handleNavigation = (path: string) => {
    router.push(path);
    closeSheet();
  };

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    closeSheet();
    router.push("/");
  };

  const navItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Home", icon: BookOpen, path: "/" },
    ...(status === "authenticated"
      ? [{ name: "Profile", icon: User, path: "/profile" }]
      : []),
    ...(status === "unauthenticated"
      ? [
          { name: "Log In", icon: LogIn, path: "/login" },
          { name: "Sign Up", icon: UserPlus, path: "/signup" },
        ]
      : []),
  ];

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button
          className="hover:bg-transparent hover:text-black dark:hover:text-white duration-300 transition-all"
          variant="ghost"
          size="icon"
          aria-label="Open menu"
        >
          <AlignJustify className="h-14 w-14" />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold">MangaHaven</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Welcome to MangaHaven, your ultimate destination for the latest
            manga updates, reviews, and recommendations. Dive into a world of
            captivating stories, vibrant characters, and thrilling adventures
            with our comprehensive manga database.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col mt-4">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Button>
          ))}
        </nav>
        <div className="flex flex-col gap-2 mt-4">
          <ModeToggle />
          {status === "authenticated" && (
            <Button
              className="w-full justify-start"
              variant="destructive"
              onClick={handleSignOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
