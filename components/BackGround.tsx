const BackGround = () => {
  return (
    <>
      <div className="w-full h-[50vh]  flex flex-col justify-center items-center px-4 gap-5">
        <div className="h-full w-full  md:w-[70%] flex justify-center items-center  overflow-hidden relative backdrop-filter backdrop-blur">
          <img
            className="rotate-[25deg] right-10 absolute z-[1] w-[400px] "
            src="./bg-pic1.jpg"
          />
          <img className="w-full blur z-0 " src="./bg-pic1.jpg" />
        </div>
          <div className="w-full md:w-[70%]" >
            MangaReader is a Free website to download and read manga online. We
            have a big library of over 600,000 manga chapters in all genres that
            are available to read or download for FREE without registration. The
            manga is updated daily to make sure no one will ever miss the latest
            chapter on their favorite manga. If you like the website, please
            bookmark it and help us to spread the words. Thank you!
          </div>
      </div>
    </>
  );
};
export default BackGround;
