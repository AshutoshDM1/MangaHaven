export default function Home_NavBar() {
  return (
    <div className="h-fit">
      <div className="flex h-full justify-center py-4 sm:py-10  ">
        <div className="flex gap-8 h-full md:text-base">
          <NavItem text="Home" className="hover:cursor-pointer"/>
          <NavItem text="Manga" className="hover:cursor-pointer" />
          <NavItem text="Manhwa" className="hidden sm:flex hover:cursor-pointer" />
          <NavItem text="Most Popular" className="hover:cursor-pointer" />
          <NavItem text="Top Airing" className="hidden sm:flex hover:cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

interface NavItemProps {
  text: string;
  className?: string;
}

function NavItem({ text, className = "" }: NavItemProps) {
  return (
    <div className={`text-white flex flex-col justify-center group ${className}`}>
      <span className="relative font-medium text-md">
        {text}
        <span className="absolute bottom-0 left-1/2 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
      </span>
    </div>
  );
}
