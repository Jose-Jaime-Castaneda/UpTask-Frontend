import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { UpdateCurrentPasswordForm, UserProfileForm } from "../types";

export async function updateProfile(formData: UserProfileForm) {
  try {
    const { data } = await api.put<string>("/auth/profile", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data.error;
      if (
        Array.isArray(errorData) &&
        errorData.length > 0 &&
        errorData[0].msg
      ) {
        throw new Error(errorData[0].msg);
      } else {
        throw new Error(errorData);
      }
    }
  }
}

export async function updatePassword(formData: UpdateCurrentPasswordForm) {
  try {
    const { data } = await api.post<string>("/auth/update-password", formData);

    return data;
  } catch (error) {
    if (isAxiosError(error) && error.response) {
      const errorData = error.response.data.error;
      if (
        Array.isArray(errorData) &&
        errorData.length > 0 &&
        errorData[0].msg
      ) {
        throw new Error(errorData[0].msg);
      } else {
        throw new Error(errorData);
      }
    }
  }
}
