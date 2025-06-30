import axios, { AxiosResponse } from "axios";
import { toast } from "sonner";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const handleError = (error: any) => {
  console.error(error);
  toast.error(error.response.data.error);
};

export const apiV2User = () => {
  return axios.create({
    baseURL: `${baseUrl}/api/v2`,
  });
};


export const editProfile = async (data: any) => {
  try {
    const response = await apiV2User().post("/editProfile", data);
    toast.success("Profile updated successfully");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const UploadImage = async (data: any) => {
  try {
    const response = await apiV2User().post("/profileUpload", data);
    toast.success("Profile updated successfully");
    return response.data;
  } catch (error) {
    handleError(error);
  }
};


export const getProfile = async (email: string) => {
  try {
    const response = await apiV2User().get("/user?email=" + email);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};