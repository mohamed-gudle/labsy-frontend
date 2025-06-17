/**
 * Onboarding-related TypeScript interfaces and types
 * Centralized type definitions for user onboarding flows
 */

/**
 * User intent enumeration
 * Different user types that can sign up
 */
export type UserIntent = 'creator' | 'one-off-purchaser' | 'factory';

/**
 * Intent survey data interface
 * Data collected from the initial intent survey
 */
export interface IntentSurveyData {
    /** User's selected intent/purpose */
    intent: UserIntent;
    /** Additional context about their goals (optional) */
    goals?: string[];
    /** How they heard about us (optional) */
    referralSource?: string;
    /** Timestamp when survey was completed */
    completedAt: Date;
}

/**
 * Onboarding step interface
 * Represents a single step in the onboarding wizard
 */
export interface OnboardingStep {
    /** Unique identifier for the step */
    id: string;
    /** Display title of the step */
    title: string;
    /** Description or subtitle */
    description: string;
    /** Whether this step is completed */
    completed: boolean;
    /** Whether this step is currently active */
    active: boolean;
    /** Optional icon for the step */
    icon?: string;
}

/**
 * Creator onboarding data interface
 * Data collected during creator onboarding flow
 */
export interface CreatorOnboardingData {
    /** Personal information */
    personalInfo: {
        /** Creator's full name */
        name: string;
        /** Creator's email */
        email: string;
        /** Creator's phone number */
        phone: string;
        /** Creator's location */
        location?: string;
    };

    /** Business information */
    businessInfo: {
        /** Business or brand name */
        businessName?: string;
        /** Business type */
        businessType?: 'individual' | 'llc' | 'corporation' | 'partnership' | 'other';
        /** Business description */
        description?: string;
        /** Website URL */
        website?: string;
        /** Social media handles */
        socialMedia?: {
            instagram?: string;
            twitter?: string;
            facebook?: string;
            tiktok?: string;
        };
    };

    /** Creator preferences */
    preferences: {
        /** Primary product interests */
        productInterests: string[];
        /** Design style preferences */
        designStyles?: string[];
        /** Target audience */
        targetAudience?: string;
        /** Monthly volume expectations */
        expectedVolume?: 'low' | 'medium' | 'high';
        /** Budget range */
        budgetRange?: string;
    };

    /** Intent survey data */
    intentData: IntentSurveyData;

    /** Onboarding completion timestamp */
    completedAt?: Date;
}

/**
 * Factory onboarding data interface
 * Data collected during factory onboarding flow
 */
export interface FactoryOnboardingData {
    /** Company information */
    companyInfo: {
        /** Company name */
        companyName: string;
        /** Company registration number */
        registrationNumber?: string;
        /** Tax ID */
        taxId?: string;
        /** Company address */
        address: {
            street: string;
            city: string;
            state: string;
            zipCode: string;
            country: string;
        };
        /** Company website */
        website?: string;
        /** Years in business */
        yearsInBusiness?: number;
    };

    /** Contact information */
    contactInfo: {
        /** Primary contact name */
        contactName: string;
        /** Contact email */
        email: string;
        /** Contact phone */
        phone: string;
        /** Contact position/title */
        position: string;
    };

    /** Production capabilities */
    capabilities: {
        /** Types of products they can manufacture */
        productTypes: string[];
        /** Manufacturing techniques */
        techniques: string[];
        /** Minimum order quantities */
        minimumOrders: {
            [productType: string]: number;
        };
        /** Maximum capacity per month */
        monthlyCapacity?: number;
        /** Quality certifications */
        certifications?: string[];
        /** Available materials */
        materials?: string[];
    };

    /** Business verification */
    verification: {
        /** Business license document */
        businessLicense?: File;
        /** Tax certificate */
        taxCertificate?: File;
        /** Insurance certificate */
        insurance?: File;
        /** Quality certifications */
        qualityCerts?: File[];
        /** Verification status */
        status: 'pending' | 'verified' | 'rejected';
    };

    /** Intent survey data */
    intentData: IntentSurveyData;

    /** Onboarding completion timestamp */
    completedAt?: Date;
}

/**
 * One-off purchaser onboarding data interface
 * Data collected during one-off purchaser onboarding flow (simplified)
 */
export interface OneOffPurchaserOnboardingData {
    /** Personal information */
    personalInfo: {
        /** Customer's full name */
        name: string;
        /** Customer's email */
        email: string;
        /** Customer's phone number (optional) */
        phone?: string;
        /** Customer's location/shipping address */
        location?: string;
    };

    /** Purchase preferences */
    preferences: {
        /** Primary product interests */
        productInterests: string[];
        /** Typical order occasions */
        occasions?: string[];
        /** Expected frequency */
        frequency?: 'one-time' | 'occasional' | 'regular';
        /** Budget range per order */
        budgetRange?: string;
        /** Preferred communication method */
        contactPreference?: 'email' | 'phone' | 'sms';
    };

    /** Intent survey data */
    intentData: IntentSurveyData;

    /** Onboarding completion timestamp */
    completedAt?: Date;
}

/**
 * Generic onboarding data union type
 * Can be creator, one-off purchaser, or factory onboarding data
 */
export type OnboardingData = CreatorOnboardingData | OneOffPurchaserOnboardingData | FactoryOnboardingData;

/**
 * Onboarding form validation errors
 * Structured error handling for form validation
 */
export interface OnboardingFormErrors {
    [fieldName: string]: string | string[] | OnboardingFormErrors;
}

/**
 * Onboarding wizard state interface
 * Manages the state of the multi-step onboarding wizard
 */
export interface OnboardingWizardState {
    /** Current step index */
    currentStep: number;
    /** Total number of steps */
    totalSteps: number;
    /** Steps configuration */
    steps: OnboardingStep[];
    /** Form data for current onboarding type */
    formData: Partial<OnboardingData>;
    /** Validation errors */
    errors: OnboardingFormErrors;
    /** Whether wizard is in loading state */
    loading: boolean;
    /** Whether wizard can proceed to next step */
    canProceed: boolean;
}
