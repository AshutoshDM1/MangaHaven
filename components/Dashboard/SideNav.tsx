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
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "../NavBar/ModeToggle";
import {
  AlignJustify,
  Home,
  BookOpen,
  User,
  LogIn,
  LogOut,
  UserPlus,
  UserRoundCheck,
  ArrowLeft,
  Users,
  BookImage,
  Download,
} from "lucide-react";

const SideNav = () => {
  const currentPath = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet: any = () => setIsOpen(false);

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
    router.push("/login");
  };

  const adminItems = [
    { name: "Admin", icon: UserRoundCheck, path: "/admin" },
    { name: "Users", icon: Users, path: "/admin/users" },
    { name: "Add New Manga", icon: BookImage, path: "/admin/addmanga" },
    { name: "Add New Chapter", icon: BookOpen, path: "/admin/addnewChapter" },
    { name: "Download Manga", icon: Download, path: "/admin/downloadmanga" },
    {
      name: "Add Manga Category",
      icon: BookImage,
      path: "/admin/addmangaCategory",
    },
    { name: "Back to Dashboard", icon: ArrowLeft, path: "/dashboard" },
  ];

  const userLoginItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Home", icon: BookOpen, path: "/" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Log Out", icon: LogOut, path: "/logout" },
    ...(session?.user?.email === "mangahaven.admin@gmail.com" || session?.user?.email === "downlodemaster1@gmail.com"
      ? [{ name: "Admin", icon: UserRoundCheck, path: "/admin" }]
      : []),
  ];

  const userNotLoginItems = [
    { name: "Dashboard", icon: Home, path: "/dashboard" },
    { name: "Home", icon: BookOpen, path: "/" },
    { name: "Profile", icon: User, path: "/profile" },
    { name: "Log In", icon: LogIn, path: "/login" },
    { name: "Sign Up", icon: UserPlus, path: "/signup" },
  ];

  const dashboardItems =
    status === "authenticated" ? userLoginItems : userNotLoginItems;

  const navItems = currentPath.startsWith("/admin")
    ? adminItems
    : dashboardItems;

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
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
          <SheetTitle className="text-2xl font-bold text-primary flex gap-1 justify-start items-center">
            <span>
              <img
                src="/MangaHaven Logo.png"
                alt="logo"
                className="w-10 mb-2 cover"
              />
            </span>
            MangaHaven
          </SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Welcome to MangaHaven, your ultimate destination for the latest
            manga updates, reviews, and recommendations. Dive into a world of
            captivating stories, vibrant characters, and thrilling adventures
            with our comprehensive manga database.
          </SheetDescription>
        </SheetHeader>
        <nav className="flex flex-col mt-4 gap-2">
          {navItems.map((item) => {
            if (item.name === "Admin") {
              return (
                <div 
                key={item.name}
                className="flex flex-col gap-2 border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                  <div className="px-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-1">
                    Admin Panel
                  </div>
                  <Button
                    key={item.name}
                    variant="ghost"
                    className="w-full justify-start bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 text-white shadow-md hover:shadow-lg transition-all duration-300 font-medium relative overflow-hidden"
                    onClick={() => handleNavigation(item.path)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                    <item.icon className="mr-3 h-5 w-5 relative z-10" />
                    <span className="relative z-10">{item.name}</span>
                    <div className="ml-auto flex items-center relative z-10">
                      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    </div>
                  </Button>
                </div>
              );
            }
            if (item.name === "Log Out") {
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-start bg-red-600/90 hover:bg-red-500 text-white"
                  onClick={handleSignOut}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.name}
                </Button>
              );
            }
            return (
              <Button
                key={item.name}
                variant="ghost"
                className="w-full justify-start bg-[#832bff]/70 hover:bg-[#832bff]/90 text-white"
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            );
          })}
        </nav>
        {status === "unauthenticated" && (
          <div className="mt-auto px-4 py-4 border-t border-gray-200 dark:border-gray-700">
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Login as admin to upload manga
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default SideNav;
