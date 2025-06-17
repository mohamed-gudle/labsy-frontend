/**
 * Onboarding Components
 * Centralized exports for onboarding-related components
 */

export { IntentSurvey } from "./intent-survey";
export { OnboardingWizard } from "./onboarding-wizard";
export { CreatorOnboardingForm } from "./creator-onboarding-form";
export { OneOffPurchaserOnboardingForm } from "./one-off-purchaser-onboarding-form";
export { FactoryOnboardingForm } from "./factory-onboarding-form";
export { ProgressIndicator } from "./progress-indicator";

// Re-export onboarding types for convenience
export type {
    IntentSurveyData,
    CreatorOnboardingData,
    FactoryOnboardingData,
    OneOffPurchaserOnboardingData,
    OnboardingStep,
} from "@/lib/types/onboarding";
