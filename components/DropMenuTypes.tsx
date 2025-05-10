import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropMenuProps {}

const DropMenuTypes: React.FC<DropMenuProps> = () => {
  return (
    <>
      <div className="ml-4 font-semibold text-base flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:none select-none focus:outline-none">
            Types
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-[5vw]">
            <DropdownMenuItem>Manga</DropdownMenuItem>
            <DropdownMenuItem>oneShot</DropdownMenuItem>
            <DropdownMenuItem>Novel</DropdownMenuItem>
            <DropdownMenuItem>One-Short</DropdownMenuItem>
            <DropdownMenuItem>Manhwa</DropdownMenuItem>
            <DropdownMenuItem>Manhua</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DropMenuTypes;
