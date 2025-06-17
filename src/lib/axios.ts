import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { auth } from '@/lib/firebase/config';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // Add Firebase auth token if user is logged in
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        config.headers["Authorization"] = `Bearer ${token}`;
      } catch (error) {
        console.error('Error getting Firebase token:', error);
      }
    }

    // Fallback to localStorage token (if any)
    const fallbackToken = localStorage.getItem("token");
    if (fallbackToken && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${fallbackToken}`;
    }

    return config;
  },
  (error) => {
    // Handle request errors
    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      window.localStorage.removeItem("token");
      // Only redirect if not already on auth pages
      if (!window.location.pathname.includes('/sign-in') && !window.location.pathname.includes('/sign-up')) {
        window.location.href = "/sign-in";
      }
    }

    // Check for "User not found in database" error from backend
    if (error.response?.data?.message === "User not found in database" ||
      error.response?.data?.error?.includes?.("User not found in database")) {
      // Only redirect to onboarding if not already on onboarding pages
      if (!window.location.pathname.includes('/onboarding')) {
        window.location.href = "/onboarding";
      }
      return Promise.reject(error instanceof Error ? error : new Error(String(error)));
    }

    return Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
);

const fetcher = async <T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  const response: AxiosResponse<T> = await api.get<T>(url, config);
  return response.data;
};

const axiosInstance: AxiosInstance = api;
export { axiosInstance, fetcher };
