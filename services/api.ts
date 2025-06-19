import axios from "axios";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const HandleError = (error: any): void => {
  if (error.response) {
    console.error("Server error:", error.response.data);
    toast.error(`Server error: ${error.response.data.message}`);
    return error.response.data;
  } else if (error.request) {
    console.error("No response from server:", error.request);
    toast.error("No response from server");
  } else {
    console.error("Request error:", error.message);
    toast.error(`Request error: ${error.message}`);
  }
};

export const getMangaDashboard = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/mangadashboard`);
    const data = response.data;
    return data;
  } catch (error) {
    HandleError(error);
  }
};

export const getMangaCarousel = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/mangaCraousal`);
    const data = response.data;
    return data;
  } catch (error) {
    HandleError(error);
  }
};

export const getManga = async () => {
  try {
    const response = await axios.get(`${baseUrl}/api/v1/manga`);
    const data = response.data;
    return data;
  } catch (error) {
    HandleError(error);
  }
};
export const editProfile = async (
  email: string,
  name: string,
  image: string
) => {
  try {
    const data = {
      email,
      name,
      image,
    };
    const response = await axios.post(`${baseUrl}/api/v1/editProfile`, data);
    toast.success("Profile updated successfully Please Login Again");
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};
export const UploadImage = async (formData: FormData) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/profileUpload`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    toast.success("File uploaded successfully");
    return response.data.url;
  } catch (error) {
    HandleError(error);
  }
};

type MangaChapterData = { mangaName: string; chapter: string };
export const getMangaChapterRead = async (mangaData: MangaChapterData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/mangaread`, mangaData);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};

type MangaImage = { title: string };
export const getMangaImage = async (mangaimage: MangaImage) => {
  try {
    const response = await axios.post(
      `${baseUrl}/api/v1/mangaCover`,
      mangaimage
    );
    return response.data.imageUrl;
  } catch (error) {
    HandleError(error);
  }
};

type MangaData = {
  title: string;
  cover: File;
  images: File[];
};

export const addManga = async (mangaData: MangaData) => {
  try {
    const response = await axios.post(`${baseUrl}/api/v1/manga`, mangaData);
    return response.data;
  } catch (error) {
    HandleError(error);
  }
};
