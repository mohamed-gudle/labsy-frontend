"use client";

import { createContext, useContext, ReactNode } from 'react';
import { OnboardingStep, OnboardingData, OnboardingFormErrors, UserIntent } from '@/lib/types/onboarding';

interface OnboardingWizardContextValue {
    /** User intent type */
    intent: UserIntent;
    /** Current step index */
    currentStep: number;
    /** Steps configuration */
    steps: OnboardingStep[];
    /** Current form data */
    formData: Partial<OnboardingData>;
    /** Current validation errors */
    errors: OnboardingFormErrors;
    /** Whether wizard is in loading state */
    isLoading: boolean;
    /** Whether current step can proceed */
    canProceed: boolean;
    /** Update form data */
    updateFormData: (data: Partial<OnboardingData>) => void;
    /** Go to next step */
    goToNextStep: () => Promise<boolean>;
    /** Go to previous step */
    goToPreviousStep: () => void;
    /** Go to specific step */
    goToStep: (stepIndex: number) => Promise<boolean>;
    /** Validate current step */
    validateCurrentStep: () => Promise<boolean>;
    /** Complete the wizard */
    complete: () => Promise<boolean>;
    /** Reset wizard to initial state */
    reset: () => void;
    /** Set validation errors */
    setErrors: (errors: OnboardingFormErrors) => void;
    /** Clear validation errors */
    clearErrors: () => void;
}

const OnboardingWizardContext = createContext<OnboardingWizardContextValue | null>(null);

interface OnboardingWizardProviderProps {
    children: ReactNode;
    value: OnboardingWizardContextValue;
}

export function OnboardingWizardProvider({ children, value }: OnboardingWizardProviderProps) {
    return (
        <OnboardingWizardContext.Provider value={value}>
            {children}
        </OnboardingWizardContext.Provider>
    );
}

export function useOnboardingWizardContext(): OnboardingWizardContextValue {
    const context = useContext(OnboardingWizardContext);

    if (!context) {
        throw new Error(
            'useOnboardingWizardContext must be used within an OnboardingWizardProvider'
        );
    }

    return context;
}

// Export the context for testing purposes
export { OnboardingWizardContext };
