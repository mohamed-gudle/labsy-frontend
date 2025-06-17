import { UserIntent } from '@/lib/types/onboarding';

/**
 * Onboarding routing utilities
 * Handles navigation logic for different user intent types
 */

/**
 * Route configuration for different user intents
 */
export const ONBOARDING_ROUTES = {
    creator: '/onboarding/creator',
    'one-off-purchaser': '/onboarding/one-off-purchaser',
    factory: '/onboarding/factory',
    survey: '/onboarding/survey',
    main: '/onboarding',
} as const;

/**
 * Post-onboarding routes after completion
 */
export const POST_ONBOARDING_ROUTES = {
    creator: '/dashboard',
    'one-off-purchaser': '/dashboard/products', // Direct to product browsing
    factory: '/dashboard/factory',
} as const;

/**
 * Get the appropriate onboarding route based on user intent
 */
export function getOnboardingRoute(intent: UserIntent): string {
    return ONBOARDING_ROUTES[intent];
}

/**
 * Get the appropriate post-onboarding route based on user intent
 */
export function getPostOnboardingRoute(intent: UserIntent): string {
    return POST_ONBOARDING_ROUTES[intent];
}

/**
 * Determine if an intent requires full onboarding or simplified flow
 */
export function requiresFullOnboarding(intent: UserIntent): boolean {
    return intent === 'creator' || intent === 'factory';
}

/**
 * Determine if an intent uses a simplified onboarding flow
 */
export function usesSimplifiedOnboarding(intent: UserIntent): boolean {
    return intent === 'one-off-purchaser';
}

/**
 * Get onboarding step configuration based on intent
 */
export function getOnboardingSteps(intent: UserIntent) {
    switch (intent) {
        case 'creator':
            return [
                {
                    id: 'personal',
                    title: 'Personal Information',
                    description: 'Tell us about yourself',
                    completed: false,
                    active: true,
                },
                {
                    id: 'business',
                    title: 'Business Details',
                    description: 'Share your business information',
                    completed: false,
                    active: false,
                },
                {
                    id: 'preferences',
                    title: 'Preferences',
                    description: 'Set up your preferences',
                    completed: false,
                    active: false,
                },
            ];

        case 'factory':
            return [
                {
                    id: 'company',
                    title: 'Company Information',
                    description: 'Tell us about your factory',
                    completed: false,
                    active: true,
                },
                {
                    id: 'capabilities',
                    title: 'Manufacturing Capabilities',
                    description: 'What can you produce?',
                    completed: false,
                    active: false,
                },
                {
                    id: 'verification',
                    title: 'Verification',
                    description: 'Verify your business details',
                    completed: false,
                    active: false,
                },
            ];

        case 'one-off-purchaser':
            return [
                {
                    id: 'personal',
                    title: 'Personal Information',
                    description: 'Tell us about yourself',
                    completed: false,
                    active: true,
                },
                {
                    id: 'preferences',
                    title: 'Preferences',
                    description: 'What are you looking for?',
                    completed: false,
                    active: false,
                },
            ];

        default:
            return [];
    }
}

/**
 * Intent display helpers
 */
export function getIntentDisplayName(intent: UserIntent): string {
    switch (intent) {
        case 'creator':
            return 'Creator';
        case 'one-off-purchaser':
            return 'Customer';
        case 'factory':
            return 'Factory Partner';
        default:
            return 'User';
    }
}

/**
 * Intent description helpers
 */
export function getIntentDescription(intent: UserIntent): string {
    switch (intent) {
        case 'creator':
            return 'Building a brand and selling custom products';
        case 'one-off-purchaser':
            return 'Looking to order custom products';
        case 'factory':
            return 'Offering manufacturing services';
        default:
            return '';
    }
}
