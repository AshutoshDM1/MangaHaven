import { Manga } from "@/app/admin/page";
import { atom } from "recoil";

export const mangaBackgroundData = atom({
  key: "mangaBackgroundData",
  default: [
    {
      imageUrl: "",
      title: "",
      description: "",
      chapter: "",
      volume: "",
      status: "",
    },
  ],
});
export const mangaCarouselData = atom({
  key: "mangaCarouselData",
  default: [
    {
      id: 0,
      title: "",
      description: "",
      chapter: "",
      volume: "",
      status: "",
      genres: [],
      imageUrl: "",
    },
  ],
});


export const mangaData = atom<Manga[]>({
  key: "mangaData",
  default: [
    {
      id: 0,
      title: "",
      description: "",
      totalChapter: 0,
      totalAvailableChapter: 0,
      genres: [],
      coverImageUrl: "",
    },
  ],
});

export const showLoadingAtom = atom<boolean>({
  key: "showLoading",
  default: true,
});
