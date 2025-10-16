/** @format */

import axios, { InternalAxiosRequestConfig, AxiosResponse } from "axios";
import { getSession } from "next-auth/react";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});


axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const session = await getSession();

    if (session?.user?.auth) {
      config.headers.Authorization = `Bearer ${session.user.auth}`;
    } else {
      delete config.headers["Authorization"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export const get = async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.get(url, { params });
    return response.data;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const post = async <T>(url: string, data?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.post(url, data);
    return response.data;
  } catch (e) {
    console.log(e);
    handleError(e);
    throw e;
  }
};

export const patch = async <T>(url: string, data: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.patch(url, data);
    return response.data;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const put = async <T>(url: string, data: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.put(url, data);
    return response.data;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

export const del = async <T>(url: string, data?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axiosInstance.delete(url, data);
    return response.data;
  } catch (e) {
    handleError(e);
    throw e;
  }
};

const handleError = (error: any) => {
  if (error.response) {
    // console.log(error);

    throw new Error(
      error.response.data.response_message || "An error occurred"
    );
  } else if (error.request) {
    throw new Error("Network Error: No response received.");
  } else {
    throw new Error(error.message || "An unexpected error occurred");
  }
};

export default axiosInstance;
