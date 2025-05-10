import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropMenuProps {}

const DropMenuGenres: React.FC<DropMenuProps> = () => {
  return (
    <>
      <div className="font-semibold text-base flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:none select-none  focus:outline-none">
            Genres
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-[15vw] grid grid-cols-2 gap-2">
            <DropdownMenuItem>Action</DropdownMenuItem>
            <DropdownMenuItem>Adventure</DropdownMenuItem>
            <DropdownMenuItem>Comedy</DropdownMenuItem>
            <DropdownMenuItem>Fantasy</DropdownMenuItem>
            <DropdownMenuItem>Demons</DropdownMenuItem>
            <DropdownMenuItem>Harem</DropdownMenuItem>
            <DropdownMenuItem>Horror</DropdownMenuItem>
            <DropdownMenuItem>Isekai</DropdownMenuItem>
            <DropdownMenuItem>Magic</DropdownMenuItem>
            <DropdownMenuItem>Romance</DropdownMenuItem>
            <DropdownMenuItem>Ecchi</DropdownMenuItem>
            <DropdownMenuItem>Mecha</DropdownMenuItem>
            <DropdownMenuItem>Space</DropdownMenuItem>
            <DropdownMenuItem>Slice of Life</DropdownMenuItem>
            <DropdownMenuItem>Shounen</DropdownMenuItem>
            <DropdownMenuItem>Mystery</DropdownMenuItem>
            <DropdownMenuItem>School</DropdownMenuItem>
            <DropdownMenuItem>Sports</DropdownMenuItem>
            <DropdownMenuItem>Supernatural</DropdownMenuItem>
            <DropdownMenuItem>Thriller</DropdownMenuItem>
            <DropdownMenuItem>Seinen</DropdownMenuItem>
            <DropdownMenuItem>Suspense</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DropMenuGenres;

// Action
// Adventure
// Avant Garde
// Boys Love
// Comedy
// Demons
// Drama
// Ecchi
// Fantasy
// Girls Love
// Gourmet
// Harem
// Horror
// Isekai
// Iyashikei
// Josei
// Kids
// Magic
// Mahou Shoujo
// Martial Arts
// Mecha
// Military
// Music
// Mystery
// Parody
// Psychological
// Reverse Harem
// Romance
// School
// Sci-Fi
// Seinen
// Shoujo
// Shounen
// Slice of Life
// Space
// Sports
// Super Power
// Supernatural
// Suspense
// Thriller
// Vampire
