import { Button } from "./ui/button";

const MangaSection = () => {
  return (
    <>
      <div className="min-h-[60vh] w-full flex justify-center items-center " >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-8">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="bg-card rounded-lg shadow-md overflow-hidden cursor-pointer transition-transform hover:scale-105 w-fit "
            >
              <img
                src={`https://img.mreadercdn.com/_m/300x400/100/3e/c1/3ec1028a31fa8dc8d67c4cd511b14b55/3ec1028a31fa8dc8d67c4cd511b14b55.jpg`}
                alt={`Manga ${item}`}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">
                  Manga Title {item}
                </h3>
                <p className="text-sm text-muted-foreground">Chapter 1</p>
                <Button className="w-full mt-4">Read Now</Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MangaSection;
