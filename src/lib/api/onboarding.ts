/**
 * API functions for onboarding flows
 * This file consolidates all onboarding-related API calls
 */

import { OnboardingData, UserIntent } from "@/lib/types/onboarding";
import { axiosInstance } from "../axios";

/**
 * Interface for onboarding API responses
 */
export interface OnboardingApiResponse {
  success: boolean;
  user?: any;
  message?: string;
  errors?: Record<string, string>;
}

/**
 * Complete user onboarding and save data to backend
 * @param onboardingData - The onboarding data to save
 * @param intent - User intent type
 * @returns Promise that resolves to OnboardingApiResponse
 */
export const completeOnboarding = async (
  onboardingData: OnboardingData,
  intent: UserIntent
): Promise<OnboardingApiResponse> => {
  try {
    const response = await fetch("/api/onboarding/complete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        onboardingData,
        intent,
        completedAt: new Date(),
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to complete onboarding:", error);
    return {
      success: false,
      message: "Failed to complete onboarding",
    };
  }
};

/**
 * Register creator using SWR mutation
 * @param url - API endpoint URL
 * @param arg - Object containing the creator onboarding data
 * @returns Promise that resolves to API response
 */
export async function registerCreator(url: string, { arg }: { arg: any }) {
  try {
    const response = await axiosInstance.post(url, {
      ...arg,
    });

    return {
      success: true,
      data: response.data,
    };
  } catch (error: any) {
    console.error("Creator registration failed:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ??
        error.message ??
        "Failed to register creator",
      errors: error.response?.data?.errors,
    };
  }
}

export async function registerUser(
  url: string,
  { arg }: { arg: any }
): Promise<OnboardingApiResponse> {
  try {
    const response = await axiosInstance.post(url, {
      ...arg,
    });

    return {
      success: true,
      user: response.data.user,
    };
  } catch (error: any) {
    console.error("User registration failed:", error);

    return {
      success: false,
      message:
        error.response?.data?.message ??
        error.message ??
        "Failed to register user",
      errors: error.response?.data?.errors,
    };
  }
}

/**
 * Create user profile based on onboarding data
 * @param onboardingData - The onboarding data
 * @param intent - User intent type
 * @returns Promise that resolves to OnboardingApiResponse
 */
export const createUserProfile = async (
  onboardingData: OnboardingData,
  intent: UserIntent
): Promise<OnboardingApiResponse> => {
  try {
    const response = await fetch("/users/profile", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        onboardingData,
        intent,
        createdAt: new Date(),
      }),
    });

    return await response.json();
  } catch (error) {
    console.error("Failed to create user profile:", error);
    return {
      success: false,
      message: "Failed to create user profile",
    };
  }
};
