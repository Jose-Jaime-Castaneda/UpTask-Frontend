import api from "@/lib/axios";
import { isAxiosError } from "axios";
import {
  CheckedPassword,
  ForgotPasswordForm,
  NewPasswordForm,
  RequestConfirmationCodeForm,
  User,
  UserLoginForm,
  UserRegistrationForm,
} from "../types";

export async function createAccount(formData: UserRegistrationForm) {
  try {
    const url = `/auth/create-account`;
    const { data } = await api.post<string>(url, formData);

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

export async function confirmAccount(formData: {}) {
  try {
    const url = `/auth/confirm-account`;
    const { data } = await api.post<string>(url, formData);

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

export async function requestConfirmationCode(
  formData: RequestConfirmationCodeForm
) {
  try {
    const url = `/auth/request-code`;
    const { data } = await api.post<string>(url, formData);

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

export async function login(formData: UserLoginForm) {
  try {
    const url = "/auth/login";
    const { data } = await api.post<string>(url, formData);
    localStorage.setItem("USER_TOKEN", data);
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

export async function forgotPasswordToken(formData: ForgotPasswordForm) {
  try {
    const url = `/auth/forgot-password`;
    const { data } = await api.post<string>(url, formData);

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

export async function validateToken(token: string) {
  try {
    const url = `/auth/validate-token`;
    const { data } = await api.post<string>(url, { token });

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

export async function setNewPassword({
  formData,
  token,
}: {
  formData: NewPasswordForm;
  token: string;
}) {
  try {
    const url = `/auth/new-password/${token}`;
    const { data } = await api.post<string>(url, formData);

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

export async function getUser() {
  try {
    const { data } = await api<User>("/auth/user");
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

export async function checkedPassword(password: CheckedPassword) {
  try {
    const url = "/auth/check-password";
    const { data } = await api.post<string>(url, password);
    return data
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
