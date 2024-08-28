import { FaReddit } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
      <div className="h-[5vh] w-full flex justify-center items-center px-0">
        <div className="w-full md:max-w-full flex justify-between items-center lg:px-7 ">
          <h1 className="cursor-pointer font-bold text-base">Read Random</h1>
          <div className="flex justify-between items-center gap-5">
            <h1 className="cursor-pointer text-base font-bold">Follow Us:</h1>
            <div className="flex">
              <h1 className="cursor-pointer text-base hidden md:block ">Twitter</h1>
              <FaSquareXTwitter className="ml-2 cursor-pointer text-2xl" />
            </div>
            <div className="flex ">
              <h1 className="cursor-pointer text-base hidden md:block">Reddit</h1>
              <FaReddit className="ml-2 cursor-pointer text-2xl" />
            </div>
            <div className="flex ">
              <h1 className="cursor-pointer text-base hidden md:block">Discord</h1>
              <FaDiscord className="ml-2 cursor-pointer text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
