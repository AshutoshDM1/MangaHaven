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
import { Manga } from "@/app/admin/page";
import { toast } from "sonner";
import { updateManga } from "@/services/apiv2";

const EditManga = ({
  open,
  setOpen,
  mangaData,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  mangaData: Manga;
}) => {
  useEffect(() => {
    setManga(mangaData);
  }, [mangaData]);
  const [manga, setManga] = useState<Manga>(mangaData);

  const handleSubmit = async () => {
    const response = await updateManga(manga);
    if (response && response.status === 200) {
      toast.success("Manga updated successfully");
      setOpen(false);
    }
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
              className="col-span-3"
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
              <p className="text-xs text-zinc-400 text-right">only add 3 genres</p>
            </Label>
            <Input
              id="genres"
              className="col-span-3"
              placeholder="Action, Adventure, etc."
              value={manga.genres.join(", ")}
              onChange={(e) => setManga({ ...manga, genres: e.target.value.split(", ") as string[] })}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="chapters" className="text-right">
              Total Chapters
            </Label>
            <Input
              id="totalChapters"
              type="number"
              className="col-span-3"
              value={manga.totalChapter}
              onChange={(e) =>
                setManga({ ...manga, totalChapter: parseInt(e.target.value) })
              }
            />
            <Label htmlFor="chapters" className="text-right">
              Total Available Chapters 
            </Label>
            <Input
              id="availableChapters"
              type="number"
              className="col-span-3"
              value={manga.totalAvailableChapter}
              onChange={(e) =>
                setManga({ ...manga, totalAvailableChapter: parseInt(e.target.value) })
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
