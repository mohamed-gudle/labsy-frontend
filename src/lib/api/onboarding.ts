/**
 * API functions for onboarding flows
 * This file consolidates all onboarding-related API calls
 */

import { OnboardingData, UserIntent } from '@/lib/types/onboarding';

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
        const response = await fetch('/api/onboarding/complete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                onboardingData,
                intent,
                completedAt: new Date(),
            }),
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to complete onboarding',
        };
    }
};

/**
 * Save onboarding progress
 * @param stepData - Current step data
 * @param intent - User intent type
 * @param currentStep - Current step number
 * @returns Promise that resolves to OnboardingApiResponse
 */
export const saveOnboardingProgress = async (
    stepData: Partial<OnboardingData>,
    intent: UserIntent,
    currentStep: number
): Promise<OnboardingApiResponse> => {
    try {
        const response = await fetch('/api/onboarding/progress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                stepData,
                intent,
                currentStep,
                updatedAt: new Date(),
            }),
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to save onboarding progress',
        };
    }
};

/**
 * Get user's onboarding status
 * @returns Promise that resolves to OnboardingApiResponse
 */
export const getOnboardingStatus = async (): Promise<OnboardingApiResponse> => {
    try {
        const response = await fetch('/api/onboarding/status');
        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to get onboarding status',
        };
    }
};

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
        const response = await fetch('/api/users/profile', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                onboardingData,
                intent,
                createdAt: new Date(),
            }),
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to create user profile',
        };
    }
};
