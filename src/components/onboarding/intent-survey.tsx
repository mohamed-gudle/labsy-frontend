"use client";

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Users, ShoppingCart, Factory } from 'lucide-react';
import { UserIntent } from '@/lib/types/onboarding';
import { intentSurveySchema } from '@/lib/schemas/onboarding';
import { cn } from '@/lib/utils';

interface IntentSurveyProps {
    /** Callback when user selects an intent */
    onIntentSelect: (intent: UserIntent) => void;
    /** Whether to show a back button */
    showBackButton?: boolean;
    /** Callback for back button */
    onBack?: () => void;
    /** Additional CSS classes */
    className?: string;
}

interface IntentOption {
    value: UserIntent;
    title: string;
    description: string;
    icon: React.ReactNode;
    features: string[];
}

const intentOptions: IntentOption[] = [
    {
        value: 'creator',
        title: 'I want to create and sell designs',
        description: 'Build your brand and sell custom products to customers',
        icon: <Users className="w-8 h-8 text-blue-600" />,
        features: [
            'Upload and sell your original designs',
            'Create your own branded store',
            'Manage orders and customer relationships',
            'Track earnings, analytics, and growth'
        ]
    },
    {
        value: 'one-off-purchaser',
        title: 'I want to order custom products',
        description: 'Get personalized items made for yourself or special occasions',
        icon: <ShoppingCart className="w-8 h-8 text-green-600" />,
        features: [
            'Order personalized products for personal use',
            'Upload your own designs or photos',
            'Perfect for gifts, events, or special occasions',
            'One-time purchases or small batch orders'
        ]
    },
    {
        value: 'factory',
        title: 'I want to offer manufacturing services',
        description: 'Join our network as a production partner',
        icon: <Factory className="w-8 h-8 text-purple-600" />,
        features: [
            'Partner with creators and customers',
            'Fulfill orders with your production capabilities',
            'Set your own pricing and minimum orders',
            'Manage production pipeline and quality'
        ]
    }
];

export function IntentSurvey({
    onIntentSelect,
    showBackButton = false,
    onBack,
    className
}: IntentSurveyProps) {
    const [selectedIntent, setSelectedIntent] = useState<UserIntent | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleIntentChange = (value: string) => {
        setSelectedIntent(value as UserIntent);
        setError(null);
    };

    const handleSubmit = async () => {
        if (!selectedIntent) {
            setError('Please select an option to continue');
            return;
        }

        setIsSubmitting(true);
        setError(null);

        try {
            // Validate the selection
            const validation = intentSurveySchema.safeParse({
                intent: selectedIntent,
                completedAt: new Date()
            });

            if (!validation.success) {
                setError('Invalid selection. Please try again.');
                return;
            }

            // Simulate a brief delay for better UX
            await new Promise(resolve => setTimeout(resolve, 300));

            onIntentSelect(selectedIntent);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error('Intent survey error:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={cn("w-full max-w-4xl mx-auto", className)}>
            <Card className="border-0 shadow-lg">
                <CardContent className="p-8">
                    <div className="space-y-8">
                        {/* Header */}
                        <div className="text-center">
                            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                                What brings you to Labsy?
                            </h2>
                            <p className="text-gray-600">
                                Choose the option that best describes your goals
                            </p>
                        </div>

                        {/* Intent Options */}
                        <RadioGroup
                            value={selectedIntent || ''}
                            onValueChange={handleIntentChange}
                            className="space-y-4"
                        >
                            {intentOptions.map((option) => (
                                <div key={option.value} className="space-y-2">
                                    <Label
                                        htmlFor={option.value}
                                        className="cursor-pointer"
                                    >
                                        <Card className={cn(
                                            "border-2 transition-all duration-200 hover:border-blue-200 hover:shadow-md",
                                            selectedIntent === option.value
                                                ? "border-blue-500 bg-blue-50 shadow-md"
                                                : "border-gray-200"
                                        )}>
                                            <CardContent className="p-6">
                                                <div className="flex items-start space-x-4">
                                                    <RadioGroupItem
                                                        value={option.value}
                                                        id={option.value}
                                                        className="mt-1"
                                                    />

                                                    <div className="flex-1 space-y-3">
                                                        {/* Header with icon */}
                                                        <div className="flex items-center space-x-3">
                                                            {option.icon}
                                                            <div>
                                                                <h3 className="text-lg font-semibold text-gray-900">
                                                                    {option.title}
                                                                </h3>
                                                                <p className="text-gray-600">
                                                                    {option.description}
                                                                </p>
                                                            </div>
                                                        </div>

                                                        {/* Features list */}
                                                        <div className="pl-11">
                                                            <ul className="space-y-1">
                                                                {option.features.map((feature, index) => (
                                                                    <li
                                                                        key={index}
                                                                        className="text-sm text-gray-600 flex items-center"
                                                                    >
                                                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2" />
                                                                        {feature}
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>

                        {/* Error message */}
                        {error && (
                            <div className="text-center">
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4">
                            {showBackButton ? (
                                <Button
                                    variant="outline"
                                    onClick={onBack}
                                    disabled={isSubmitting}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>
                            ) : (
                                <div />
                            )}

                            <Button
                                onClick={handleSubmit}
                                disabled={!selectedIntent || isSubmitting}
                                className="min-w-[120px]"
                            >
                                {isSubmitting ? (
                                    <span>Loading...</span>
                                ) : (
                                    <>
                                        Continue
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
