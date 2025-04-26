import Image from "next/image";

export default function Home_Main_Card() {
  return (
    <div className="md:w-min-fit md:h-1/2 md:rounded-2xl md:shadow-lg md:shadow-slate-800 md:hover:shadow-slate-600 md:hover:shadow-xl md:m-10 transition-all duration-500 ease-in-out">
      <div className="w-full h-full md:rounded-2xl relative flex flex-col md:flex-row overflow-hidden">
        <div className="w-full md:w-4/6 h-full md:rounded-2xl text-3xl md:text-5xl z-10 order-2 md:order-1 px-4 md:px-0">
          <div className="w-full mt-4 md:m-8">
            M<span className="text-pink-500">a</span>nga H
            <span className="text-pink-500">e</span>aven
          </div>
          <div className="w-full md:w-4/6 mt-4 md:mt-8 md:ml-8 flex">
            <input
              type="text"
              placeholder="Search manga..."
              className="w-5/6 px-4 py-2 text-base text-black bg-gray-100 border border-gray-700 rounded-full focus:outline-none focus:border-pink-500"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 rounded-full flex items-center ml-1 transition-all duration-500 ease-in-out">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
          <div className="w-full md:pl-8 md:w-4/6 h-2/6 leading-7 tracking-wider mt-4 text-sm overflow-hidden">
            <div className="truncate ...">
              Top search:One Piece ,My Hero Academia Season 7
            </div>
            <div className="flex flex-wrap">
              <div className="truncate ...">
                I Parry Everything ,Tower of God Season 2,Wistoria: Wand and
                Sword,
              </div>
              <div className="truncate ...">
                Jujutsu Kaisen 2nd Season,Makeine: Too Many Losing Heroines!,
              </div>
              <div className="truncate ...">
                Alya Sometimes Hides Her Feelings in Russian,
              </div>
              <div className="truncate ...">
                Failure Frame: I Became the Strongest and Annihilated Everything
                With Low-Level Spells
              </div>
            </div>
          </div>
          <button className=" text-white text-[1.5rem] font-semibold rounded-xl ml-10 flex items-center px-10 py-3 border-[1px] border-[#bcbcbc8d] transition-all duration-500 ease-in-out bg-[#c131ff8d] ">
            Lets Read
          </button>
        </div>
        <div
          className="
            w-full md:w-auto order-1 md:order-2
            md:flex md:justify-end md:absolute md:top-0 md:-right-14 
            md:opacity-50 
            transition-all duration-500 ease-in-out
            md:hover:opacity-100 md:hover:-translate-x-16 md:hover:scale-105
            md:transform
          "
        >
          <Image
            width={720}
            height={720}
            className="w-full h-64 md:h-auto object-cover md:object-none"
            src="/home_card_bg.png"
            alt="Home_Card_Background"
          />
        </div>
      </div>
    </div>
  );
}
