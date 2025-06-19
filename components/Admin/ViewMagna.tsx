import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { MangaData } from "./EditManga";
import { getMangaImage } from "@/services/api";

const ViewMagna = ({
  open,
  setOpen,
  mangaData,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  mangaData: MangaData;
}) => {
  const [mangaCover, setMangaCover] = useState<string>("");
  useEffect(() => {
    const fetchMangaCover = async () => {
      if (!mangaData.title) {
        return;
      }
      const mangaCover = await getMangaImage({ title: mangaData.title });
      setMangaCover(mangaCover);
    };
    fetchMangaCover();
  }, [mangaData]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[700px] select-none bg-black border-zinc-800">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-white">
            Manga Details
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            View detailed information about this manga
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Cover Image and Title Section */}
          <div className="flex gap-6">
            <div className="w-32 h-48 bg-zinc-800 rounded-lg flex items-center justify-center">
              <img
                src={mangaCover || "https://t4.ftcdn.net/jpg/06/63/49/17/360_F_663491769_yxfkyVTMFd2p9DNsYP8aB7oDsslsDs4e.jpg"}
                alt="Manga Cover"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium text-zinc-300">
                  Title
                </Label>
                <div className="p-3  rounded-lg border border-zinc-700">
                  <p className="text-sm text-white font-medium">
                    {mangaData.title}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-zinc-300">
                    Total Chapters
                  </Label>
                  <div className="p-2  rounded-lg border border-zinc-700">
                    <p className="text-sm text-white font-medium">
                      {mangaData.chapters || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">
              Description
            </Label>
            <div className="p-4  rounded-lg border border-zinc-700 min-h-[100px]">
              <p className="text-sm leading-relaxed text-zinc-300">
                {mangaData.description}
              </p>
            </div>
          </div>

          {/* Genres Section */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-zinc-300">Genres</Label>
            <div className="p-3  rounded-lg border border-zinc-700">
              <div className="flex flex-wrap gap-2">
                {Array.isArray(mangaData?.genres)
                  ? mangaData.genres.map((genre, index) => {
                      const colors = [
                        "bg-blue-500 text-white",
                        "bg-pink-500 text-white",
                        "bg-purple-500 text-white",
                      ];
                      const colorClass = colors[index % 3];
                      return (
                        <span
                          key={index}
                          className={`inline-flex items-center p-2 rounded-full text-[13px] font-medium ${colorClass}`}
                        >
                          {genre.trim()}
                        </span>
                      );
                    })
                  : mangaData?.genres?.split(",").map((genre, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-4 rounded-full text-xs font-medium bg-gradient-to-r from-purple-600 to-pink-600 text-white border border-purple-500"
                      >
                        {genre.trim()}
                      </span>
                    ))}
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className=" pt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMagna;
