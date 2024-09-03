export default function Home_NavBar() {
  return (
    <div className="h-28">
      <div className="flex h-full justify-center py-auto">
        <div className="flex gap-12 my-auto h-full font-medium text-sm md:text-base">
          <div className="text-white flex flex-col justify-center">Home</div>
          <div className="text-white flex flex-col justify-center">Movies</div>
          <div className="hidden text-white sm:flex flex-col justify-center">
            TV Series
          </div>
          <div className="text-white flex flex-col justify-center">
            Most Popular
          </div>
          <div className="hidden sm:flex text-white flex-col justify-center">
            Top Airing
          </div>
        </div>
      </div>
    </div>
  );
}
