import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

const DropMenuTypes: React.FC = () => {
  const router = useRouter();
  const AllTypes = ["Manga", "oneShot", "Novel", "One-Short", "Manhwa", "Manhua"]  
  return (
    <>
      <div className="ml-4 text-sm flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:none select-none focus:outline-none cursor-pointer">
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
