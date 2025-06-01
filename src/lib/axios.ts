import axios, { AxiosInstance } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Add any request interceptors here, e.g., adding auth tokens
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.localStorage.removeItem("token");
      window.location.href = "/sign-in";
    }
  }
);

import { AxiosRequestConfig, AxiosResponse } from "axios";

const fetcher = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.get<T>(url, config);
  return response.data;
};

const axiosInstance: AxiosInstance = api;
export { axiosInstance, fetcher };
