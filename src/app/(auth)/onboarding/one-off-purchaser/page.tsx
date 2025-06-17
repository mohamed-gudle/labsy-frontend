"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { OneOffPurchaserOnboardingForm } from '@/components/onboarding';
import { OneOffPurchaserOnboardingData } from '@/lib/types/onboarding';
import { getPostOnboardingRoute } from '@/lib/utils/onboarding';
import { completeOnboarding } from '@/lib/api/onboarding';
import { useAuth } from '@/context/auth-context';

export default function OneOffPurchaserOnboardingPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (data: OneOffPurchaserOnboardingData) => {
        if (!user) {
            console.error('User not authenticated');
            return;
        }

        setLoading(true);

        try {
            // Complete the onboarding data
            const completeOnboardingData: OneOffPurchaserOnboardingData = {
                ...data,
                intentData: {
                    intent: 'one-off-purchaser',
                    completedAt: new Date(),
                },
                completedAt: new Date(),
            };

            // Submit onboarding data to backend
            const result = await completeOnboarding(completeOnboardingData, 'one-off-purchaser');

            if (result.success) {
                console.log('One-off purchaser onboarding completed successfully:', result);
                // Redirect to appropriate dashboard
                const redirectUrl = getPostOnboardingRoute('one-off-purchaser');
                router.push(redirectUrl);
            } else {
                console.error('Failed to complete onboarding:', result.message);
                // Handle error - could show toast notification
                setLoading(false);
            }
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
