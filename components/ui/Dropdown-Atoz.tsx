import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropMenuProps {}

const DropMenuAtoZ: React.FC<DropMenuProps> = () => {
  return (
    <>
      <div className="font-semibold text-base flex justify-center items-center ">
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:none focus:outline-none select-none">
            A-Z
          </DropdownMenuTrigger>
          <DropdownMenuContent className="ml-4 w-[3vw] grid grid-cols-3 gap-2">
            <DropdownMenuItem>A</DropdownMenuItem>
            <DropdownMenuItem>B</DropdownMenuItem>
            <DropdownMenuItem>C</DropdownMenuItem>
            <DropdownMenuItem>D</DropdownMenuItem>
            <DropdownMenuItem>E</DropdownMenuItem>
            <DropdownMenuItem>F</DropdownMenuItem>
            <DropdownMenuItem>G</DropdownMenuItem>
            <DropdownMenuItem>H</DropdownMenuItem>
            <DropdownMenuItem>I</DropdownMenuItem>
            <DropdownMenuItem>J</DropdownMenuItem>
            <DropdownMenuItem>K</DropdownMenuItem>
            <DropdownMenuItem>L</DropdownMenuItem>
            <DropdownMenuItem>M</DropdownMenuItem>
            <DropdownMenuItem>N</DropdownMenuItem>
            <DropdownMenuItem>O</DropdownMenuItem>
            <DropdownMenuItem>P</DropdownMenuItem>
            <DropdownMenuItem>Q</DropdownMenuItem>
            <DropdownMenuItem>R</DropdownMenuItem>
            <DropdownMenuItem>S</DropdownMenuItem>
            <DropdownMenuItem>T</DropdownMenuItem>
            <DropdownMenuItem>U</DropdownMenuItem>
            <DropdownMenuItem>V</DropdownMenuItem>
            <DropdownMenuItem>W</DropdownMenuItem>
            <DropdownMenuItem>X</DropdownMenuItem>
            <DropdownMenuItem>Y</DropdownMenuItem>
            <DropdownMenuItem>Z</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
};

export default DropMenuAtoZ;
