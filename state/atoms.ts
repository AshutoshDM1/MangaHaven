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

interface Manga {
  id: number;
  title: string;
  genres: string[];
  imageUrl: string;
}

export const mangaData = atom<Manga[]>({
  key: "mangaData",
  default: [
    {
      id: 0,
      title: "",
      genres: [],
      imageUrl: "",
    },
  ],
});

export const showLoadingAtom = atom<boolean>({
  key: "showLoading",
  default: true,
});
