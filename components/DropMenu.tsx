import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropMenuProps {}

const DropMenu: React.FC<DropMenuProps> = () => {
  return (
    <>
      <div className="ml-4 font-semibold text-base flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger>Type</DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Choose Manga</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Manga</DropdownMenuItem>
            <DropdownMenuItem>One-Short</DropdownMenuItem>
            <DropdownMenuItem>Manhwa</DropdownMenuItem>
            <DropdownMenuItem>Manhua</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DropMenu;
