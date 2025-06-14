/**
 * User utility functions
 * Helper functions for user profile management and preferences
 */

/**
 * Formats user profile data for display
 * @param user - User object
 * @returns Formatted user profile
 */
export const formatUserProfile = (user: any): {
    displayName: string;
    initials: string;
    avatar?: string;
} => {
    const displayName = user.displayName ||
        `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
        user.email?.split('@')[0] ||
        'User';

    const initials = user.firstName && user.lastName
        ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
        : displayName.slice(0, 2).toUpperCase();

    return {
        displayName,
        initials,
        avatar: user.photoURL || user.avatar
    };
};

/**
 * Validates user preferences
 * @param preferences - User preferences object
 * @returns Validation result
 */
export const validateUserPreferences = (preferences: any): {
    isValid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (preferences.theme && !['light', 'dark', 'system'].includes(preferences.theme)) {
        errors.push('Invalid theme preference');
    }

    if (preferences.language && typeof preferences.language !== 'string') {
        errors.push('Invalid language preference');
    }

    if (preferences.notifications && typeof preferences.notifications !== 'object') {
        errors.push('Invalid notifications preference');
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

/**
 * Gets user's preferred timezone
 * @param user - User object
 * @returns Timezone string
 */
export const getUserTimezone = (user: any): string => {
    return user.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone;
};

/**
 * Checks if user profile is complete
 * @param user - User object
 * @returns True if profile is complete
 */
export const isProfileComplete = (user: any): boolean => {
    const requiredFields = ['firstName', 'lastName', 'email'];
    return requiredFields.every(field => user[field] && user[field].trim() !== '');
};
