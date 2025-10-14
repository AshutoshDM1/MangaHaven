import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DropMenuProps {}

const DropMenuGenres: React.FC<DropMenuProps> = () => {
  const router = useRouter();
  const AllGenres = ["Action", "Adventure", "Comedy", "Fantasy", "Demons", "Harem", "Horror", "Isekai", "Magic", "Romance", "Ecchi", "Mecha", "Space", "Slice of Life", "Shounen", "Mystery", "School", "Sports", "Supernatural", "Thriller", "Seinen", "Suspense"]    
  return (
    <>
      <div className="font-semibold text-base flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:none select-none  focus:outline-none">
            Genres
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-[15vw] grid grid-cols-2 gap-2">
            {AllGenres.map((genre) => (
              <DropdownMenuItem key={genre} onClick={() => router.push(`/dashboard/search?genre=${genre}`)}>
                {genre}
              </DropdownMenuItem>
            ))}
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
