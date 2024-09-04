import axios from "axios";

// const baseUrl = "http://localhost:3000";
const baseUrl = "https://manga-haven-beta.vercel.app";

export const getMangaDashboard = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/mangadeshboard`);
  const data = response.data;
  return data;
};

export const getMangaCarousel = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/mangaCraousal`);
  console.log(`${baseUrl}/api/v1/mangaCraousal`);
  const data = response.data;
  return data;
};

export const getManga = async () => {
  const response = await axios.get(`${baseUrl}/api/v1/manga`);
  const data = response.data;
  return data;
};
