"use client";

import { Toaster } from "sonner";
import ViewManga from "./ViewManga";
import MangaForm from "./components/MangaForm";
import { useAddManga } from "./hooks/useAddManga";

const AddManga = () => {
  const {
    mangaData,
    mangaCover,
    ableToSubmit,
    isSubmitting,
    handleInputChange,
    handleCoverChange,
    handleCoverUpload,
    handleSubmit,
  } = useAddManga();

  return (
    <>
      <div className="w-full p-4 flex items-center justify-center gap-4">
        <Toaster />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-6">
          <MangaForm
            mangaData={mangaData}
            onInputChange={handleInputChange}
            onCoverChange={handleCoverChange}
            onCoverUpload={handleCoverUpload}
            onSubmit={handleSubmit}
            mangaCover={mangaCover}
            ableToSubmit={ableToSubmit}
            isSubmitting={isSubmitting}
          />
          <div className="w-full h-full flex items-center justify-center">
            <ViewManga mangaData={mangaData} />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddManga;
