/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * API functions for user management
 * This file consolidates all user-related API calls
 */

import { User } from "firebase/auth";
import { axiosInstance } from "../axios";


/**
 * Interface for user API responses
 */
export interface UserApiResponse {
  success: boolean;
  user?: any;
  message?: string;
  errors?: Record<string, string>;
}

/**
 * Get current user profile
 * @returns Promise that resolves to UserApiResponse
 */
export const getCurrentUser = async (): Promise<User> => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

/**
 * Update user profile
 * @param userData - The user data to update
 * @returns Promise that resolves to UserApiResponse
 */
export const updateUserProfile = async (
  userData: Record<string, any>
): Promise<UserApiResponse> => {
  try {
    const response = await axiosInstance.put("/users/profile", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    return response.data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to update user profile",
    };
  }
};

/**
 * Delete user account
 * @returns Promise that resolves to UserApiResponse
 */
export const deleteUserAccount = async (): Promise<UserApiResponse> => {
  try {
    const response = await fetch("/api/users/me", {
      method: "DELETE",
    });

    return await response.json();
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete account",
    };
  }
};
