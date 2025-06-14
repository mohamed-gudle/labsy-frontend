/**
 * API functions for authentication
 * This file consolidates all authentication-related API calls
 */

/**
 * Interface for authentication responses
 */
export interface AuthApiResponse {
    success: boolean;
    user?: any;
    token?: string;
    message?: string;
    errors?: Record<string, string>;
}

/**
 * Sign in with email and password
 * @param email - User email
 * @param password - User password
 * @returns Promise that resolves to AuthApiResponse
 */
export const signInWithEmail = async (email: string, password: string): Promise<AuthApiResponse> => {
    try {
        const response = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to sign in',
        };
    }
};

/**
 * Sign up with email and password
 * @param email - User email
 * @param password - User password
 * @param name - User name
 * @returns Promise that resolves to AuthApiResponse
 */
export const signUpWithEmail = async (email: string, password: string, name: string): Promise<AuthApiResponse> => {
    try {
        const response = await fetch('/api/auth/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, name }),
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to sign up',
        };
    }
};

/**
 * Reset password
 * @param email - User email
 * @returns Promise that resolves to AuthApiResponse
 */
export const resetPassword = async (email: string): Promise<AuthApiResponse> => {
    try {
        const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to reset password',
        };
    }
};

/**
 * Sign out user
 * @returns Promise that resolves to AuthApiResponse
 */
export const signOut = async (): Promise<AuthApiResponse> => {
    try {
        const response = await fetch('/api/auth/sign-out', {
            method: 'POST',
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to sign out',
        };
    }
};
