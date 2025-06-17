"use client";

import { useRouter } from 'next/navigation';
import { IntentSurvey } from '@/components/onboarding';

export default function OnboardingSurveyPage() {
    const router = useRouter();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleIntentSelection = (intent: any) => {
        if (intent === 'creator') {
            router.push('/onboarding/creator');
        } else if (intent === 'one-off-purchaser') {
            router.push('/onboarding/creator'); // For now, redirect to creator flow
        } else if (intent === 'factory') {
            // Handle 'factory' intent if needed, or redirect as appropriate
            router.push('/onboarding/creator'); // Adjust as needed
        } else {
            // Fallback for unknown intents
            router.push('/onboarding');
        }
    };

    const handleBack = () => {
        router.push('/onboarding');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        What brings you to Labsy?
                    </h1>
                    <p className="text-lg text-gray-600">
                        Help us personalize your experience
                    </p>
                </div>

                <IntentSurvey
                    onIntentSelect={handleIntentSelection}
                    showBackButton={true}
                    onBack={handleBack}
                />
            </div>
        </div>
    );
}
