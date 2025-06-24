import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import Image from "next/image";

type MangaChapterViewProps = {
  chapterData: {
    mangaId: number | null;
    mangaTitle: string;
    chapterNumber: number;
    chapterTitle: string;
  };
  images?: File[];
};

const MangaChapterView = ({ chapterData, images }: MangaChapterViewProps) => {
  console.log(images);
  return (
    <div className="w-full  max-w-4xl mx-auto p-6 space-y-6 flex flex-col items-center justify-center">
      <Card className="w-full h-full p-5 mb-5">
        <CardHeader>
          <CardTitle
            className={`text-xl font-bold ${chapterData.chapterTitle ? "text-primary" : "text-muted-foreground"}`}
          >
            Chapter {chapterData.chapterNumber}:{" "}
            {chapterData.chapterTitle || "Please Enter Chapter Title"}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            From: {chapterData.mangaTitle}
          </CardDescription>
        </CardHeader>

        <CardContent>
          {images && images.length > 0 ? (
            <div className="space-y-4">
              <h4 className="text-lg font-semibold mb-4">
                Chapter Images ({images.length} pages)
              </h4>

              <div className="h-[800px] overflow-y-auto pr-2">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="mx-auto max-w-[50rem] px-5 mb-5 h-fit flex justify-center items-start "
                  >
                    <Image
                      className="object-cover select-none "
                      src={URL.createObjectURL(image)}
                      alt={`Chapter ${chapterData.chapterNumber} - Page ${index + 1}`}
                      width={550}
                      height={550}
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <div className="text-4xl mb-4">📖</div>
              <p className="text-lg">No images uploaded for this chapter yet</p>
              <p className="text-sm">
                Upload images to see them displayed here
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MangaChapterView;
