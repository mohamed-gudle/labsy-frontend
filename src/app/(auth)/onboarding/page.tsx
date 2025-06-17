"use client";

import { useRouter } from 'next/navigation';
import { IntentSurvey } from '@/components/onboarding';
import { UserIntent } from '@/lib/types/onboarding';
import { getOnboardingRoute } from '@/lib/utils/onboarding';

export default function OnboardingPage() {
    const router = useRouter();

    const handleIntentSelection = (intent: UserIntent) => {
        const route = getOnboardingRoute(intent);
        router.push(route);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Welcome to Labsy
                    </h1>          <p className="text-lg text-gray-600">
                        Let&apos;s get you set up with the perfect experience
                    </p>
                </div>

                <IntentSurvey onIntentSelect={handleIntentSelection} />
            </div>
        </div>
    );
}
