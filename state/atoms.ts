import { atom, selector } from "recoil";
import axios from "axios";

export const mangaData = selector({
  key: "mangaDataSelector",
  get: async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/mangadeshboard"
    );
    const data = response.data;
    return data;
  },
});
export const mangaBackgroundData = atom({
  key: "mangaBackgroundData",
  default: mangaData,
});
export const mangaCarouselSelector = selector({
  key: "mangaCarouselSelector",
  get: async () => {
    const response = await axios.get(
      "http://localhost:3000/api/v1/mangaCraousal"
    );
    const data = response.data;
    return data;
  },
});
export const mangaCarouselData = atom({
  key: "mangaCarouselData",
  default: mangaCarouselSelector,
});
export const mangaSelector = selector({
  key: "mangaSelector",
  get: async () => {
    const response = await axios.get("http://localhost:3000/api/v1/manga");
    const data = response.data;
    return data;
  },
});
export const manga = atom({
  key: "manga",
  default: mangaSelector,
});
