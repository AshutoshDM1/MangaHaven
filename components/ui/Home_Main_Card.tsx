import Image from "next/image";

export default function Home_Main_Card() {
  return (
    <div className="w-min-fit h-1/2 rounded-2xl shadow-lg shadow-slate-800 m-10">
      <div className="w-full h-full rounded-2xl relative flex overflow-hidden">
        <div
          className=" w-4/6 h-full rounded-2xl text-3xl md:text-5xl z-10 bg-slate-900"
          style={{
            background:
              "linear-gradient(90deg, rgba(23, 22, 20, 1) 10%, rgba(43, 42, 60, 0) 100%)",
          }}
        >
          <div className="w-full m-8 ">
            M<span className="text-pink-500 ">a</span>nga H
            <span className="text-pink-500 ">e</span>aven
          </div>
          <div className=" w-4/6 mt-8 ml-8 flex">
            <input
              type="text"
              placeholder="Search manga..."
              className="w-5/6 px-4 py-2 text-base text-gray-200 bg-gray-100 border border-gray-700 rounded-full focus:outline-none focus:border-pink-500"
            />
            <button className="bg-pink-500 hover:bg-pink-600 text-white px-3 rounded-2xl flex items-center ml-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3"
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
          <div className="pl-8 w-4/6 h-2/6 leading-7 tracking-wider mt-4 text-sm overflow-hidden">
            <div className="truncate ...">
              Top search:One PieceMy Hero Academia Season 7
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
          <button className="bg-pink-400 hover:bg-pink-500 hover:text-gray-800 text-slate-900 font-semibold px-3 rounded-2xl flex items-center text-3xl mt-auto ml-8 p-4">
            Let&apos;s Start &rarr;	
            </button>
        </div>
        <div className="flex justify-end absolute top-0 -right-14 opacity-50">
          <Image
            width={720}
            height={720}
            className="text-end"
            src="/home_card_bg.png"
            alt="Home_Card_Background"
          />
        </div>
      </div>
    </div>
  );
}
