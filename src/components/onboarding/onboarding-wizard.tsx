"use client";

import { ReactNode } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { ProgressIndicator } from './progress-indicator';
import { OnboardingStep } from '@/lib/types/onboarding';
import { cn } from '@/lib/utils';

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
    backButtonText = 'Back',
    nextButtonText = 'Next',
    submitButtonText = 'Complete',
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
                        {title || 'Complete Your Profile'}
                    </h1>
                    <p className="text-base md:text-lg text-gray-600">
                        {subtitle || 'Help us personalize your experience'}
                    </p>
                </div>

                {/* Progress Indicator */}
                {showProgress && (
                    <div className="mb-6 md:mb-8">
                        <ProgressIndicator
                            steps={steps}
                            currentStep={currentStep}
                            onStepClick={interactiveProgress ? onStepClick : undefined}
                            interactive={interactiveProgress}
                            size="sm"
                            className="md:hidden" // Mobile version
                        />
                        <ProgressIndicator
                            steps={steps}
                            currentStep={currentStep}
                            onStepClick={interactiveProgress ? onStepClick : undefined}
                            interactive={interactiveProgress}
                            size="md"
                            className="hidden md:block" // Desktop version
                        />
                    </div>
                )}

                {/* Current Step Info */}
                {currentStepData && (
                    <div className="text-center mb-4 md:mb-6">
                        <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-1">
                            {currentStepData.title}
                        </h2>
                        <p className="text-sm md:text-base text-gray-600">
                            {currentStepData.description}
                        </p>
                    </div>
                )}

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

                        {/* Navigation inside card */}
                        {navigationInCard && (
                            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
                                {/* Back Button */}
                                {!isFirstStep ? (
                                    <Button
                                        variant="outline"
                                        onClick={onStepBack}
                                        disabled={isNavigating}
                                        className="flex items-center justify-center space-x-2 w-full md:w-auto order-2 md:order-1"
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                        <span>{backButtonText}</span>
                                    </Button>
                                ) : (
                                    <div className="hidden md:block" /> /* Desktop spacer */
                                )}

                                {/* Forward/Submit Button */}
                                <Button
                                    onClick={onStepForward}
                                    disabled={!canProceed || isNavigating}
                                    className="flex items-center justify-center space-x-2 min-w-[120px] w-full md:w-auto order-1 md:order-2"
                                >
                                    {isNavigating ? (
                                        <span>Loading...</span>
                                    ) : (
                                        <>
                                            <span>{isLastStep ? submitButtonText : nextButtonText}</span>
                                            {!isLastStep && <ArrowRight className="w-4 h-4" />}
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Navigation outside card */}
                {!navigationInCard && showNavigation && (
                    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0 px-2 md:px-0">
                        {/* Back Button */}
                        {!isFirstStep ? (
                            <Button
                                variant="outline"
                                onClick={onStepBack}
                                disabled={isNavigating}
                                className="flex items-center justify-center space-x-2 w-full md:w-auto order-2 md:order-1"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>{backButtonText}</span>
                            </Button>
                        ) : (
                            <div className="hidden md:block" /> /* Desktop spacer */
                        )}

                        {/* Forward/Submit Button */}
                        <Button
                            onClick={onStepForward}
                            disabled={!canProceed || isNavigating}
                            className="flex items-center justify-center space-x-2 min-w-[120px] w-full md:w-auto order-1 md:order-2"
                        >
                            {isNavigating ? (
                                <span>Loading...</span>
                            ) : (
                                <>
                                    <span>{isLastStep ? submitButtonText : nextButtonText}</span>
                                    {!isLastStep && <ArrowRight className="w-4 h-4" />}
                                </>
                            )}
                        </Button>
                    </div>
                )}

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
