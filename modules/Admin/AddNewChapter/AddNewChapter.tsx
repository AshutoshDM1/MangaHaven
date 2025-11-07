"use client";

import MangaChapterView from "./components/MangaChapterView";
import MangaView from "./components/MangaView";
import ChapterForm from "./components/ChapterForm";
import { useAddChapter } from "./hooks/useAddChapter";

const AddNewChapter = () => {
  const {
    selectedManga,
    chapterData,
    chapterImages,
    ableToSubmit,
    isSubmitting,
    selectedFiles,
    handleMangaSelect,
    handleInputChange,
    handleImagesChange,
    handleSubmit,
  } = useAddChapter();

  return (
    <>
      <div className="flex 2xl:flex-row flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center p-2 gap-2">
          <ChapterForm
            chapterData={chapterData}
            onInputChange={handleInputChange}
            onImagesChange={handleImagesChange}
            onSubmit={handleSubmit}
            selectedFiles={selectedFiles}
            ableToSubmit={ableToSubmit}
            isSubmitting={isSubmitting}
            onMangaSelect={handleMangaSelect}
          />
          <MangaView selectedManga={selectedManga ?? null} />
        </div>
        <div className="flex flex-col items-center justify-center gap-4">
          {selectedManga && (
            <MangaChapterView
              chapterData={chapterData}
              images={chapterImages}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default AddNewChapter;


