"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Moon,
  Send,
  Sun,
  Twitter,
} from "lucide-react";

function Footerdemo() {
  const [isDarkMode, setIsDarkMode] = React.useState(true);
  const [isChatOpen, setIsChatOpen] = React.useState(false);

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <footer className="relative border-t bg-background/10 text-foreground transition-colors duration-300">
      <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <h2 className="mb-4 text-3xl font-bold tracking-tight">
              MangaHaven
            </h2>
            <p className="mb-6 text-muted-foreground">
              Your Favorite Manga and Anime at one place
            </p>
            <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <nav className="space-y-2 text-sm">
              <a
                href="#"
                className="block hover:text-purple-500 transition-all duration-300"
              >
                Home
              </a>
              <a
                href="#"
                className="block hover:text-purple-500 transition-all duration-300"
              >
                About Us
              </a>
              <a
                href="#"
                className="block hover:text-purple-500 transition-all duration-300"
              >
                Manga
              </a>
              <a
                href="#"
                className="block hover:text-purple-500 transition-all duration-300"
              >
                Anime
              </a>
              <a
                href="#"
                className="block hover:text-purple-500 transition-all duration-300"
              >
                Contact
              </a>
            </nav>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <address className="space-y-1 gap-1 flex flex-col text-sm not-italic">
              <a
                href="https://github.com/AshutoshDM1/MangaHaven"
                target="_blank"
              >
                <p className="hover:text-purple-500 transition-all duration-300">
                  Github
                </p>
              </a>
              <a href="https://x.com/AshutoshDM_1" target="_blank">
                <p className="hover:text-purple-500 transition-all duration-300">
                  Twitter
                </p>
              </a>
              <a
                href="https://www.instagram.com/ashutosh_dm_1/"
                target="_blank"
              >
                <p className="hover:text-purple-500 transition-all duration-300">
                  Instagram
                </p>
              </a>
              <a
                href="https://www.linkedin.com/in/ashutosh-tiwari-8931b82b8/"
                target="_blank"
              >
                <p className="hover:text-purple-500 transition-all duration-300">
                  LinkedIn
                </p>
              </a>
            </address>
          </div>
          <div className="relative">
            <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
            <div className="mb-6 flex space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        window.open(
                          "https://github.com/AshutoshDM1/MangaHaven",
                          "_blank"
                        );
                      }}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Github className="h-4 w-4" />
                      <span className="sr-only">Github</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Github</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        window.open("https://x.com/AshutoshDM_1", "_blank");
                      }}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Twitter</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Instagram className="h-4 w-4" />
                      <span className="sr-only">Instagram</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Follow us on Instagram</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      onClick={() => {
                        window.open(
                          "https://www.linkedin.com/in/ashutosh-tiwari-8931b82b8/",
                          "_blank"
                        );
                      }}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <Linkedin className="h-4 w-4" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Connect with us on LinkedIn</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <div className="items-center space-x-2 hidden">
              <Sun className="h-4 w-4" />
              <Switch
                id="dark-mode"
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
              <Label htmlFor="dark-mode" className="sr-only">
                Toggle dark mode
              </Label>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 text-center md:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2025 MangaHaven. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with ❤️ by{" "}
            <a
              href="https://github.com/ShaileshIshere"
              className="text-primary hover:text-purple-500 transition-all duration-300"
            >
              shailesh
            </a>{" "}
            &{" "}
            <a
              href="https://github.com/AshutoshDM1"
              className="text-primary hover:text-purple-500 transition-all duration-300"
            >
              Ashutosh
            </a>
          </p>
          <nav className="flex gap-4 text-sm">
            <a
              href="#"
              className=" hover:text-purple-500 transition-all duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className=" hover:text-purple-500 transition-all duration-300"
            >
              Terms of Service
            </a>
            <a href="#" className="transition-colors hover:text-primary">
              Cookie Settings
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export { Footerdemo };
