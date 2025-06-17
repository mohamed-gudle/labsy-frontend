"use client";

import { OnboardingStep } from '@/lib/types/onboarding';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface ProgressIndicatorProps {
    /** Array of steps */
    steps: OnboardingStep[];
    /** Current active step index */
    currentStep: number;
    /** Callback when a step is clicked (optional) */
    onStepClick?: (stepIndex: number) => void;
    /** Whether steps are clickable */
    interactive?: boolean;
    /** Orientation of the progress indicator */
    orientation?: 'horizontal' | 'vertical';
    /** Size variant */
    size?: 'sm' | 'md' | 'lg';
    /** Additional CSS classes */
    className?: string;
}

export function ProgressIndicator({
    steps,
    currentStep,
    onStepClick,
    interactive = false,
    orientation = 'horizontal',
    size = 'md',
    className,
}: ProgressIndicatorProps) {
    const sizeClasses = {
        sm: {
            circle: 'w-6 h-6',
            text: 'text-xs',
            connector: 'h-px',
        },
        md: {
            circle: 'w-8 h-8',
            text: 'text-sm',
            connector: 'h-px',
        },
        lg: {
            circle: 'w-10 h-10',
            text: 'text-base',
            connector: 'h-0.5',
        },
    };

    const getStepStatus = (stepIndex: number) => {
        if (stepIndex < currentStep) return 'completed';
        if (stepIndex === currentStep) return 'active';
        return 'pending';
    };

    const getStepStyles = (stepIndex: number) => {
        const status = getStepStatus(stepIndex);

        switch (status) {
            case 'completed':
                return {
                    circle: 'bg-green-600 border-green-600 text-white',
                    text: 'text-green-600 font-medium',
                    connector: 'bg-green-600',
                };
            case 'active':
                return {
                    circle: 'bg-blue-600 border-blue-600 text-white',
                    text: 'text-blue-600 font-medium',
                    connector: 'bg-gray-200',
                };
            case 'pending':
                return {
                    circle: 'bg-white border-gray-300 text-gray-400',
                    text: 'text-gray-400',
                    connector: 'bg-gray-200',
                };
            default:
                return {
                    circle: 'bg-white border-gray-300 text-gray-400',
                    text: 'text-gray-400',
                    connector: 'bg-gray-200',
                };
        }
    };

    const handleStepClick = (stepIndex: number) => {
        if (interactive && onStepClick) {
            onStepClick(stepIndex);
        }
    };

    if (orientation === 'vertical') {
        return (
            <div className={cn("flex flex-col space-y-4", className)}>
                {steps.map((step, index) => {
                    const status = getStepStatus(index);
                    const styles = getStepStyles(index);
                    const isClickable = interactive && (status === 'completed' || status === 'active');

                    return (
                        <div key={step.id} className="flex items-start space-x-3">
                            {/* Step Circle */}
                            <button
                                type="button"
                                onClick={() => handleStepClick(index)}
                                disabled={!isClickable}
                                className={cn(
                                    "flex items-center justify-center rounded-full border-2 transition-all duration-200",
                                    sizeClasses[size].circle,
                                    styles.circle,
                                    isClickable && "hover:scale-105 cursor-pointer",
                                    !isClickable && "cursor-default"
                                )}
                            >
                                {status === 'completed' ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span className={sizeClasses[size].text}>
                                        {index + 1}
                                    </span>
                                )}
                            </button>

                            {/* Step Content */}
                            <div className="flex-1 min-w-0">
                                <p className={cn("font-medium", styles.text)}>
                                    {step.title}
                                </p>
                                <p className="text-sm text-gray-500 mt-1">
                                    {step.description}
                                </p>
                            </div>

                            {/* Connector Line (except for last step) */}
                            {index < steps.length - 1 && (
                                <div className="absolute left-4 mt-8 w-px h-12 bg-gray-200" />
                            )}
                        </div>
                    );
                })}
            </div>
        );
    }

    // Horizontal orientation
    return (
        <div className={cn("flex items-center justify-between w-full", className)}>
            {steps.map((step, index) => {
                const status = getStepStatus(index);
                const styles = getStepStyles(index);
                const isClickable = interactive && (status === 'completed' || status === 'active');

                return (
                    <div key={step.id} className="flex items-center flex-1">
                        {/* Step */}
                        <div className="flex flex-col items-center flex-shrink-0">
                            {/* Step Circle */}
                            <button
                                type="button"
                                onClick={() => handleStepClick(index)}
                                disabled={!isClickable}
                                className={cn(
                                    "flex items-center justify-center rounded-full border-2 transition-all duration-200",
                                    sizeClasses[size].circle,
                                    styles.circle,
                                    isClickable && "hover:scale-105 cursor-pointer",
                                    !isClickable && "cursor-default"
                                )}
                            >
                                {status === 'completed' ? (
                                    <Check className="w-4 h-4" />
                                ) : (
                                    <span className={sizeClasses[size].text}>
                                        {index + 1}
                                    </span>
                                )}
                            </button>              {/* Step Label */}
                            <div className="mt-2 text-center max-w-20 sm:max-w-24">
                                <p className={cn("font-medium truncate", sizeClasses[size].text, styles.text)}>
                                    {step.title}
                                </p>
                                {size === 'lg' && (
                                    <p className="text-xs text-gray-500 mt-1 hidden sm:block">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>            {/* Connector Line (except for last step) */}
                        {index < steps.length - 1 && (
                            <div className={cn(
                                "flex-1 mx-2 sm:mx-4",
                                sizeClasses[size].connector,
                                styles.connector
                            )} />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
