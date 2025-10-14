import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DropMenuProps {}

const DropMenuAtoZ: React.FC<DropMenuProps> = () => {

  const router = useRouter();
  const AllMangaByCharacter = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]    

  return (
    <>
      <div className="font-semibold text-base flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:none focus:outline-none select-none">
            A-Z
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-[3vw] grid grid-cols-3 gap-2">
            {AllMangaByCharacter.map((character) => (
              <DropdownMenuItem key={character} onClick={() => router.push(`/dashboard/search?character=${character}`)}>
                {character}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DropMenuAtoZ;
