import { atom, selector } from "recoil";
import axios from "axios";
import { getManga, getMangaCarousel, getMangaDashboard } from "@/services/api";

export const mangaData = selector({
  key: "mangaDataSelector",
  get: getMangaDashboard,
});
export const mangaBackgroundData = atom({
  key: "mangaBackgroundData",
  default: [{
    imageUrl: "",
    title: "",
    description: "",
    chapter: "",
    volume: "",
    status: "",
  }],
});
export const mangaCarouselSelector = selector({
  key: "mangaCarouselSelector",
  get: getMangaCarousel,
});

export const mangaCarouselData = atom({
  key: "mangaCarouselData",
  default: mangaCarouselSelector,
});