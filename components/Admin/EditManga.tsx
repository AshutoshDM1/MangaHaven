import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@radix-ui/react-label";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { mangaData } from "@/state/atoms";
import { ColumnDef } from "@tanstack/react-table";

export type MangaData = {
  title: string;
  description: string;
  genres: string;
  chapters: number;
};

const EditManga = ({
  open,
  setOpen,
  mangaData,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  mangaData: MangaData;
}) => {
  console.log(mangaData);
  useEffect(() => {
    setManga(mangaData);
  }, [mangaData]);
  const [manga, setManga] = useState<MangaData>(mangaData);

  const handleSubmit = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] select-none">
        <DialogHeader>
          <DialogTitle>Edit Manga</DialogTitle>
          <DialogDescription>
            Make changes to the manga details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              className="col-span-3 select-none selection:bg-black selection:text-white"
              value={manga.title}
              onChange={(e) => setManga({ ...manga, title: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              rows={3}
              value={manga.description}
              onChange={(e) =>
                setManga({ ...manga, description: e.target.value })
              }
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genres" className="text-right">
              Genres
            </Label>
            <Input
              id="genres"
              className="col-span-3"
              placeholder="Action, Adventure, etc."
              value={manga.genres}
              onChange={(e) => setManga({ ...manga, genres: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chapters" className="text-right">
              Total Chapters
            </Label>
            <Input
              id="chapters"
              type="number"
              className="col-span-3"
              value={manga.chapters}
              onChange={(e) =>
                setManga({ ...manga, chapters: parseInt(e.target.value) })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={handleSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditManga;
