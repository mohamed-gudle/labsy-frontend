"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingWizard, FactoryOnboardingForm } from '@/components/onboarding';
import { FactoryOnboardingData } from '@/lib/types/onboarding';

export default function FactoryOnboardingPage() {
    const router = useRouter();
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
        try {
            // TODO: Submit onboarding data to API
            console.log('Factory onboarding completed:', finalData);

            // Redirect to factory dashboard
            router.push('/dashboard/factory');
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
