import axios from "axios";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

export const getMangaDashboard = async () => {
  console.log(`${baseUrl}/api/v1/mangadeshboard`)
  const response = await axios.get(`${baseUrl}/api/v1/mangadashboard`);
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
