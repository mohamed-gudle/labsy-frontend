/**
 * Authentication utility functions
 * Helper functions for auth validation, token handling, and user management
 */

/**
 * Validates email format
 * @param email - Email address to validate
 * @returns True if email is valid
 */
export const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validates password strength
 * @param password - Password to validate
 * @returns Object with validation result and messages
 */
export const validatePassword = (password: string): {
    isValid: boolean;
    messages: string[];
} => {
    const messages: string[] = [];

    if (password.length < 8) {
        messages.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        messages.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        messages.push('Password must contain at least one lowercase letter');
    }

    if (!/\d/.test(password)) {
        messages.push('Password must contain at least one number');
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        messages.push('Password must contain at least one special character');
    }

    return {
        isValid: messages.length === 0,
        messages
    };
};

/**
 * Checks if user has required role
 * @param userRoles - Array of user roles
 * @param requiredRole - Required role to check
 * @returns True if user has the required role
 */
export const hasRole = (userRoles: string[], requiredRole: string): boolean => {
    return userRoles.includes(requiredRole);
};

/**
 * Formats user display name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @param email - User's email (fallback)
 * @returns Formatted display name
 */
export const formatDisplayName = (
    firstName?: string,
    lastName?: string,
    email?: string
): string => {
    if (firstName && lastName) {
        return `${firstName} ${lastName}`;
    }
    if (firstName) {
        return firstName;
    }
    if (email) {
        return email.split('@')[0];
    }
    return 'User';
};
