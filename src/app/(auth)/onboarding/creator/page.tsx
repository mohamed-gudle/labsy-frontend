"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OnboardingWizard, CreatorOnboardingForm } from '@/components/onboarding';
import { CreatorOnboardingData } from '@/lib/types/onboarding';

export default function CreatorOnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState<Partial<CreatorOnboardingData>>({});

    const steps = [
        {
            id: 'personal-info',
            title: 'Personal Information',
            description: 'Tell us about yourself',
            completed: currentStep > 0,
            active: currentStep === 0,
        },
        {
            id: 'business-details',
            title: 'Business Details',
            description: 'Share your business information',
            completed: currentStep > 1,
            active: currentStep === 1,
        },
        {
            id: 'preferences',
            title: 'Preferences',
            description: 'Set up your preferences',
            completed: currentStep > 2,
            active: currentStep === 2,
        },
    ];

    const handleStepComplete = (stepData: Partial<CreatorOnboardingData>) => {
        setFormData(prev => ({ ...prev, ...stepData }));

        if (currentStep < steps.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Final step completed, handle onboarding completion
            handleOnboardingComplete({ ...formData, ...stepData });
        }
    };

    const handleOnboardingComplete = async (finalData: Partial<CreatorOnboardingData>) => {
        try {
            // TODO: Submit onboarding data to API
            console.log('Creator onboarding completed:', finalData);

            // Redirect to dashboard
            router.push('/dashboard');
        } catch (error) {
            console.error('Error completing onboarding:', error);
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
                <CreatorOnboardingForm
                    currentStep={currentStep}
                    data={formData}
                    onStepComplete={handleStepComplete}
                    onBack={handleStepBack}
                />
            </OnboardingWizard>
        </div>
    );
}
