const BackGroundMain = () => {
  return (
    <>
      <div className="w-full min-h-[60vh]  flex justify-center items-center px-0 md:px-4 relative">
        <div className="h-full w-full p-0 pt-40 ease-in duration-700 md:p-5 flex flex-col justify-start items-start gap-5 relative z-10 ">
          <h1 className="text-xl font-bold text-[#A977E7] ">#1 Fav Anime</h1>
          <h1 className="text-6xl font-bold text-[#A977E7] md:w-[120%] w-full ">
            One Punch Man
          </h1>
          <h1 className=" md:w-[150%]w-full">
            Saitama started out being a hero just for fun. After three years of
            “special” training, he became so powerful that he can defeat
            opponents with a single punch. Now, alongside Genos, his faithful
            cyborg disciple, Saitama is ready to begin his official duties as a
            professional hero working with the Hero Association.
          </h1>
          <div className="flex gap-4">
            <button className="rounded-2xl py-2 px-4 bg-[#A977E7] hover:bg-[#995fff]">
              Watch Now
            </button>
            <button className="rounded-2xl py-2 px-4 bg-foreground/10 hover:bg-foreground/20">
              Detail
            </button>
          </div>
        </div>
        <div className="h-full w-full darkopacity-[50%] md:w-[180%] absolute  md:relative z-0  ">
          <img
            src="./one-punch-man-background.jpg"
            alt="One Punch Man"
            className="h-[60vh] w-[200%] object-cover  "
            style={{
              maskImage:
                "linear-gradient(from left, transparent, black, transparent)",
              WebkitMaskImage:
                "linear-gradient(to right, transparent, black, transparent)",
            }}
          />
        </div>
      </div>
    </>
  );
};

export default BackGroundMain;
