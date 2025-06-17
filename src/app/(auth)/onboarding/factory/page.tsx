"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingWizard, FactoryOnboardingForm } from '@/components/onboarding';
import { FactoryOnboardingData } from '@/lib/types/onboarding';
import { completeOnboarding } from '@/lib/api/onboarding';
import { useAuth } from '@/context/auth-context';

export default function FactoryOnboardingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<FactoryOnboardingData>>({});

    const steps = [
        {
            id: 'company-info',
            title: 'Company Information',
            description: 'Tell us about your factory',
            completed: currentStep > 0,
            active: currentStep === 0,
        },
        {
            id: 'capabilities',
            title: 'Capabilities',
            description: 'What can you produce?',
            completed: currentStep > 1,
            active: currentStep === 1,
        },
        {
            id: 'contact-verification',
            title: 'Contact & Verification',
            description: 'Verify your business details',
            completed: currentStep > 2,
            active: currentStep === 2,
        },
    ];

    const handleStepComplete = (stepData: Partial<FactoryOnboardingData>) => {
        setFormData(prev => ({ ...prev, ...stepData }));

        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Final step completed, handle onboarding completion
            handleOnboardingComplete({ ...formData, ...stepData });
        }
    };

    const handleOnboardingComplete = async (finalData: Partial<FactoryOnboardingData>) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        try {
            // Complete the onboarding data
            const completeOnboardingData: FactoryOnboardingData = {
                ...finalData,
                intentData: {
                    intent: 'factory',
                    completedAt: new Date(),
                },
                completedAt: new Date(),
            } as FactoryOnboardingData;

            // Submit onboarding data to backend
            const result = await completeOnboarding(completeOnboardingData, 'factory');

            if (result.success) {
                console.log('Factory onboarding completed successfully:', result);
                // Redirect to factory dashboard
                router.push('/dashboard/factory');
            } else {
                console.error('Failed to complete onboarding:', result.message);
                // Handle error - could show toast notification
            }
        } catch (error) {
            console.error('Error completing factory onboarding:', error);
        }
    };

    const handleStepBack = () => {
        if (currentStep > 0) {
            setCurrentStep(prev => prev - 1);
        } else {
            router.push('/onboarding');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <OnboardingWizard
                steps={steps}
                currentStep={currentStep}
                onStepBack={handleStepBack}
            >
                <FactoryOnboardingForm
                    currentStep={currentStep}
                    data={formData}
                    onStepComplete={handleStepComplete}
                    onBack={handleStepBack}
                />
            </OnboardingWizard>
        </div>
    );
}
