import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface DropMenuProps {}

const DropMenuTypes: React.FC<DropMenuProps> = () => {
  const router = useRouter();
  const AllTypes = ["Manga", "oneShot", "Novel", "One-Short", "Manhwa", "Manhua"]  
  return (
    <>
      <div className="ml-4 font-semibold text-base flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:none select-none focus:outline-none">
            Types
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-[5vw]">
            {AllTypes.map((type) => (
              <DropdownMenuItem key={type} onClick={() => router.push(`/dashboard/search?type=${type}`)}>
                {type}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DropMenuTypes;
