"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OneOffPurchaserOnboardingForm } from '@/components/onboarding';
import { OneOffPurchaserOnboardingData } from '@/lib/types/onboarding';
import { getPostOnboardingRoute } from '@/lib/utils/onboarding';

export default function OneOffPurchaserOnboardingPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: OneOffPurchaserOnboardingData) => {
        setLoading(true);

        try {
            // TODO: Save onboarding data to backend
            console.log('One-off purchaser onboarding data:', data);

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Redirect to appropriate dashboard
            const redirectUrl = getPostOnboardingRoute('one-off-purchaser');
            router.push(redirectUrl);
        } catch (error) {
            console.error('Error submitting onboarding data:', error);
            setLoading(false);
        }
    };

    const handleBack = () => {
        router.push('/onboarding');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <OneOffPurchaserOnboardingForm
                onSubmit={handleSubmit}
                onBack={handleBack}
                loading={loading}
            />
        </div>
    );
}
