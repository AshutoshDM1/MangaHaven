import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DownloadMangaPage = () => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="max-w-2xl mx-auto w-full flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Download Manga</h1>
        <Input placeholder="Search manga" />
        <Button>Download</Button>
      </div>
    </div>
  );
};

export default DownloadMangaPage;
