"use client";

import { useState, useCallback, useEffect } from 'react';
import { OnboardingStep, OnboardingData, OnboardingFormErrors, UserIntent } from '@/lib/types/onboarding';
import { getOnboardingSteps } from '@/lib/utils/onboarding';

interface UseOnboardingWizardOptions {
    /** User intent type */
    intent: UserIntent;
    /** Initial form data */
    initialData?: Partial<OnboardingData>;
    /** Whether to persist data to localStorage */
    persistData?: boolean;
    /** Storage key for persistence */
    storageKey?: string;
    /** Validation function for each step */
    validateStep?: (stepIndex: number, data: Partial<OnboardingData>) => Promise<OnboardingFormErrors | null>;
    /** Callback when wizard is completed */
    onComplete?: (data: OnboardingData) => Promise<void>;
}

interface UseOnboardingWizardReturn {
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

export function useOnboardingWizard({
    intent,
    initialData = {},
    persistData = true,
    storageKey,
    validateStep,
    onComplete,
}: UseOnboardingWizardOptions): UseOnboardingWizardReturn {
    const defaultStorageKey = storageKey || `onboarding_${intent}`;

    // Initialize steps based on intent
    const [steps, setSteps] = useState<OnboardingStep[]>(() =>
        getOnboardingSteps(intent)
    );

    const [currentStep, setCurrentStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<OnboardingFormErrors>({});

    // Initialize form data with persistence
    const [formData, setFormData] = useState<Partial<OnboardingData>>(() => {
        if (persistData && typeof window !== 'undefined') {
            try {
                const saved = localStorage.getItem(defaultStorageKey);
                if (saved) {
                    const parsedData = JSON.parse(saved);
                    return { ...initialData, ...parsedData };
                }
            } catch (error) {
                console.warn('Failed to load persisted onboarding data:', error);
            }
        }
        return initialData;
    });

    // Persist data to localStorage whenever it changes
    useEffect(() => {
        if (persistData && typeof window !== 'undefined') {
            try {
                localStorage.setItem(defaultStorageKey, JSON.stringify(formData));
            } catch (error) {
                console.warn('Failed to persist onboarding data:', error);
            }
        }
    }, [formData, persistData, defaultStorageKey]);

    // Update steps when form data changes to reflect completion status
    useEffect(() => {
        setSteps(prevSteps =>
            prevSteps.map((step, index) => ({
                ...step,
                completed: index < currentStep,
                active: index === currentStep,
            }))
        );
    }, [currentStep]);

    const updateFormData = useCallback((data: Partial<OnboardingData>) => {
        setFormData(prev => ({ ...prev, ...data }));
        // Clear errors when data is updated
        setErrors({});
    }, []);

    const validateCurrentStep = useCallback(async (): Promise<boolean> => {
        if (!validateStep) return true;

        setIsLoading(true);
        try {
            const stepErrors = await validateStep(currentStep, formData);
            if (stepErrors) {
                setErrors(stepErrors);
                return false;
            }
            setErrors({});
            return true;
        } catch (error) {
            console.error('Step validation error:', error);
            setErrors({ general: 'Validation failed. Please try again.' });
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [currentStep, formData, validateStep]);

    const goToNextStep = useCallback(async (): Promise<boolean> => {
        const isValid = await validateCurrentStep();
        if (!isValid) return false;

        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
            return true;
        } else {
            // Last step - complete the wizard
            return await complete();
        }
    }, [currentStep, steps.length, validateCurrentStep]);

    const goToPreviousStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
            setErrors({});
        }
    }, [currentStep]);

    const goToStep = useCallback(async (stepIndex: number): Promise<boolean> => {
        if (stepIndex < 0 || stepIndex >= steps.length) return false;

        // If going forward, validate current step first
        if (stepIndex > currentStep) {
            const isValid = await validateCurrentStep();
            if (!isValid) return false;
        }

        setCurrentStep(stepIndex);
        setErrors({});
        return true;
    }, [currentStep, steps.length, validateCurrentStep]);

    const complete = useCallback(async (): Promise<boolean> => {
        if (!onComplete) return true;

        setIsLoading(true);
        try {
            await onComplete(formData as OnboardingData);

            // Clear persisted data on successful completion
            if (persistData && typeof window !== 'undefined') {
                localStorage.removeItem(defaultStorageKey);
            }

            return true;
        } catch (error) {
            console.error('Wizard completion error:', error);
            setErrors({
                general: error instanceof Error ? error.message : 'Failed to complete onboarding'
            });
            return false;
        } finally {
            setIsLoading(false);
        }
    }, [formData, onComplete, persistData, defaultStorageKey]);

    const reset = useCallback(() => {
        setCurrentStep(0);
        setFormData(initialData);
        setErrors({});
        setIsLoading(false);

        // Clear persisted data
        if (persistData && typeof window !== 'undefined') {
            localStorage.removeItem(defaultStorageKey);
        }
    }, [initialData, persistData, defaultStorageKey]);

    const clearErrors = useCallback(() => {
        setErrors({});
    }, []);

    // Determine if current step can proceed
    const canProceed = !isLoading && Object.keys(errors).length === 0;

    return {
        currentStep,
        steps,
        formData,
        errors,
        isLoading,
        canProceed,
        updateFormData,
        goToNextStep,
        goToPreviousStep,
        goToStep,
        validateCurrentStep,
        complete,
        reset,
        setErrors,
        clearErrors,
    };
}
