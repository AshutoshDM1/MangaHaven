import { FaDiscord } from "react-icons/fa";

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  return (
    <>
      <div className="h-24 w-full bg-purple-900 flex justify-center items-center">
        <div className="h-full w-11/12 md:w-3/5 flex justify-between items-center">
          <h1 className="text-white w-1/2 lg:w-fit text-base">Read Random</h1>
          <div className="w-full md:w-7/12 lg:w-1/2 h-full flex justify-between items-center">
            <h1 className="text-white text-base font-bold">Follow Us:</h1>
            <h1 className="text-white text-base">Reddit</h1>
            <h1 className="text-white text-base">Twitter</h1>
            <div className="flex " >
            <h1 className="text-white text-base">Discord</h1>
            <FaDiscord className="ml-2 text-white    text-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
