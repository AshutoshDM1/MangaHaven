import axios from "axios";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
    console.log(`${baseUrl}/api/v1/mangaCraousal`);
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
