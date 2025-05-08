"use client";

const Home = () => {
  return (
    <div>
      <div className="min-h-screen w-full bg-[#0D0D0D] flex flex-col items-center justify-center ">
        <img
          src="https://res.cloudinary.com/dnvl8mqba/image/upload/v1746372213/MangaHaven/MangaLandingPage/solo-leveling_quzeqr.jpg"
          alt="images"
          className="w-[40vh] object-cover rounded-lg bg-white p-1"
        />
        <h1 className="text-white text-4xl font-bold mt-10">
          Your Favorite Manga and Anime
        </h1>
        <h1 className="text-white text-4xl font-bold">All at one place</h1>
      </div>
    </div>
  );
};

export default Home;
