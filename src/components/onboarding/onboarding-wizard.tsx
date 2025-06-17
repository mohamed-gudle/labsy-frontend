"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { OnboardingStep } from "@/lib/types/onboarding";
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ReactNode } from "react";

interface OnboardingWizardProps {
  /** Array of steps in the wizard */
  steps: OnboardingStep[];
  /** Current active step index */
  currentStep: number;
  /** Children to render (usually the form for current step) */
  children: ReactNode;
  /** Callback when user wants to go back */
  onStepBack?: () => void;
  /** Callback when user wants to go forward */
  onStepForward?: () => void;
  /** Callback when user clicks on a specific step */
  onStepClick?: (stepIndex: number) => void;
  /** Whether the current step can proceed */
  canProceed?: boolean;
  /** Whether navigation is in progress */
  isNavigating?: boolean;
  /** Custom back button text */
  backButtonText?: string;
  /** Custom next button text */
  nextButtonText?: string;
  /** Custom submit button text for last step */
  submitButtonText?: string;
  /** Whether to show navigation buttons */
  showNavigation?: boolean;
  /** Whether navigation buttons should be inside the card */
  navigationInCard?: boolean;
  /** Optional title override */
  title?: string;
  /** Optional subtitle override */
  subtitle?: string;
  /** Additional CSS classes */
  className?: string;
  /** Whether to show the progress indicator */
  showProgress?: boolean;
  /** Whether progress steps are interactive */
  interactiveProgress?: boolean;
}

export function OnboardingWizard({
  steps,
  currentStep,
  children,
  onStepBack,
  onStepForward,
  onStepClick,
  canProceed = true,
  isNavigating = false,
  backButtonText = "Back",
  nextButtonText = "Next",
  submitButtonText = "Complete",
  showNavigation = true,
  navigationInCard = false,
  title,
  subtitle,
  className,
  showProgress = true,
  interactiveProgress = false,
}: OnboardingWizardProps) {
  const currentStepData = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;
  return (
    <div className={cn("min-h-screen bg-gray-50 py-4 md:py-8", className)}>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            {title || "Complete Your Profile"}
          </h1>
          <p className="text-base md:text-lg text-gray-600">
            {subtitle || "Help us personalize your experience"}
          </p>
        </div>

        {/* Main Content Card */}
        <Card className="shadow-lg border-0 mx-2 md:mx-0">
          <CardHeader className="pb-4 md:pb-6 px-4 md:px-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs md:text-sm text-gray-500">
                  Step {currentStep + 1} of {steps.length}
                </span>
              </div>
              {currentStepData?.icon && (
                <div className="text-blue-600 hidden md:block">
                  {currentStepData.icon}
                </div>
              )}
            </div>
          </CardHeader>

          <CardContent className="pt-0 px-4 md:px-6 pb-4 md:pb-6">
            {children}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 md:mt-8 text-center px-2 md:px-0">
          <p className="text-xs md:text-sm text-gray-500">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
}
