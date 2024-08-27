import { FaReddit } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";


interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {

  return (
    <>
      <div 
      className="h-[5vh] w-full px-4 bg-purple-900 flex justify-center items-center">
        <div className="w-full md:w-[70%] flex justify-between items-center">
          <h1 className="text-white font-bold text-base">Read Random</h1>
          <div className="flex justify-between items-center gap-5">
            <h1 className="text-white text-base font-bold">Follow Us:</h1>
            <div className="flex">
              <h1 className="text-white text-base hidden md:block ">Twitter</h1>
              <FaSquareXTwitter className="ml-2 text-white text-2xl" />
            </div>
            <div className="flex ">
              <h1 className="text-white text-base hidden md:block">Reddit</h1>
              <FaReddit className="ml-2 text-white text-2xl" />
            </div>
            <div className="flex ">
              <h1 className="text-white text-base hidden md:block">Discord</h1>
              <FaDiscord className="ml-2 text-white text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
