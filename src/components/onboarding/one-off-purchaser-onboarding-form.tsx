"use client";

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
    User,
    ShoppingCart,
    CheckCircle,
    ArrowLeft,
    ArrowRight,
    Mail,
    Phone,
    MapPin,
    DollarSign,
    Calendar,
    MessageSquare
} from 'lucide-react';
import {
    oneOffPurchaserPersonalInfoSchema,
    oneOffPurchaserPreferencesSchema
} from '@/lib/schemas/onboarding';
import { OneOffPurchaserOnboardingData } from '@/lib/types/onboarding';
import { cn } from '@/lib/utils';

type PreferencesFormData = {
    productInterests: string[];
    occasions?: string[];
    frequency?: 'one-time' | 'occasional' | 'regular';
    budgetRange?: string;
    contactPreference?: 'email' | 'phone' | 'sms';
};

interface OneOffPurchaserOnboardingFormProps {
    /** Initial form data */
    initialData?: Partial<OneOffPurchaserOnboardingData>;
    /** Callback when form is submitted */
    onSubmit: (data: OneOffPurchaserOnboardingData) => void;
    /** Callback for going back */
    onBack?: () => void;
    /** Whether form is in loading state */
    loading?: boolean;
    /** Additional CSS classes */
    className?: string;
}

// Product interest options
const PRODUCT_INTERESTS = [
    'T-Shirts',
    'Hoodies',
    'Tank Tops',
    'Long Sleeves',
    'Polo Shirts',
    'Sweatshirts',
    'Hats & Caps',
    'Tote Bags',
    'Phone Cases',
    'Mugs',
    'Stickers',
    'Posters'
];

// Occasion options
const OCCASIONS = [
    'Personal Use',
    'Gifts for Friends/Family',
    'Business/Corporate Events',
    'Weddings',
    'Birthdays',
    'Holidays',
    'Sports Teams',
    'School Events',
    'Fundraising',
    'Special Occasions'
];

// Budget range options
const BUDGET_RANGES = [
    'Under $25',
    '$25 - $50',
    '$50 - $100',
    '$100 - $250',
    '$250 - $500',
    'Over $500'
];

export function OneOffPurchaserOnboardingForm({
    initialData,
    onSubmit,
    onBack,
    loading = false,
    className
}: OneOffPurchaserOnboardingFormProps) {
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [currentStep, setCurrentStep] = useState(0);

    // Step 1: Personal Information Form
    const personalInfoForm = useForm({
        resolver: zodResolver(oneOffPurchaserPersonalInfoSchema),
        defaultValues: {
            name: initialData?.personalInfo?.name || '',
            email: initialData?.personalInfo?.email || '',
            phone: initialData?.personalInfo?.phone || '',
            location: initialData?.personalInfo?.location || '',
        }
    });

    // Step 2: Preferences Form
    const preferencesForm = useForm({
        resolver: zodResolver(oneOffPurchaserPreferencesSchema),
        defaultValues: {
            productInterests: initialData?.preferences?.productInterests || [],
            occasions: initialData?.preferences?.occasions || [],
            frequency: initialData?.preferences?.frequency || undefined,
            budgetRange: initialData?.preferences?.budgetRange || '',
            contactPreference: initialData?.preferences?.contactPreference || 'email',
        }
    });

    const handlePersonalInfoSubmit = async () => {
        setSubmitError(null);
        try {
            // Store personal info and move to next step
            setCurrentStep(1);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const handlePreferencesSubmit = async (data: PreferencesFormData) => {
        setSubmitError(null);
        try {
            const personalInfoData = personalInfoForm.getValues();
            const preferencesData = data;

            const completeData: OneOffPurchaserOnboardingData = {
                personalInfo: personalInfoData,
                preferences: preferencesData,
                intentData: {
                    intent: 'one-off-purchaser',
                    completedAt: new Date()
                },
                completedAt: new Date()
            };

            onSubmit(completeData);
        } catch (error) {
            setSubmitError(error instanceof Error ? error.message : 'An error occurred');
        }
    };

    const isCurrentStep = (step: number) => currentStep === step - 1;

    return (
        <div className={cn("max-w-2xl mx-auto space-y-6", className)}>
            {/* Progress Header */}
            <div className="text-center space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">
                    Welcome to Labsy
                </h1>
                <p className="text-gray-600">
                    Let&apos;s set up your account to help you find the perfect custom products
                </p>
                <div className="flex items-center justify-center space-x-2 mt-4">
                    <Badge variant={isCurrentStep(1) ? "default" : "secondary"}>
                        1. Personal Info
                    </Badge>
                    <Badge variant={isCurrentStep(2) ? "default" : "secondary"}>
                        2. Preferences
                    </Badge>
                </div>
            </div>

            {/* Step 1: Personal Information */}
            {isCurrentStep(1) && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <User className="w-5 h-5 text-orange-600" />
                            <span>Personal Information</span>
                        </CardTitle>
                        <CardDescription>
                            Tell us a bit about yourself so we can create your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <form onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)} className="space-y-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="name" className="flex items-center space-x-2">
                                    <User className="w-4 h-4" />
                                    <span>Full Name *</span>
                                </Label>
                                <Controller
                                    name="name"
                                    control={personalInfoForm.control}
                                    render={({ field, fieldState }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                id="name"
                                                placeholder="Enter your full name"
                                                className={fieldState.error ? "border-red-500" : ""}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="email" className="flex items-center space-x-2">
                                    <Mail className="w-4 h-4" />
                                    <span>Email Address *</span>
                                </Label>
                                <Controller
                                    name="email"
                                    control={personalInfoForm.control}
                                    render={({ field, fieldState }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                id="email"
                                                type="email"
                                                placeholder="Enter your email address"
                                                className={fieldState.error ? "border-red-500" : ""}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Phone (Optional) */}
                            <div className="space-y-2">
                                <Label htmlFor="phone" className="flex items-center space-x-2">
                                    <Phone className="w-4 h-4" />
                                    <span>Phone Number (Optional)</span>
                                </Label>
                                <Controller
                                    name="phone"
                                    control={personalInfoForm.control}
                                    render={({ field, fieldState }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                id="phone"
                                                placeholder="Enter your phone number"
                                                className={fieldState.error ? "border-red-500" : ""}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Location (Optional) */}
                            <div className="space-y-2">
                                <Label htmlFor="location" className="flex items-center space-x-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>Location (Optional)</span>
                                </Label>
                                <Controller
                                    name="location"
                                    control={personalInfoForm.control}
                                    render={({ field, fieldState }) => (
                                        <div>
                                            <Input
                                                {...field}
                                                id="location"
                                                placeholder="City, State/Country"
                                                className={fieldState.error ? "border-red-500" : ""}
                                            />
                                            {fieldState.error && (
                                                <p className="text-sm text-red-600 mt-1">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Error Display */}
                            {submitError && (
                                <Alert variant="destructive">
                                    <AlertDescription>{submitError}</AlertDescription>
                                </Alert>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between pt-6">
                                {onBack ? (
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={onBack}
                                        disabled={loading}
                                    >
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Back
                                    </Button>
                                ) : <div />}

                                <Button type="submit" disabled={loading}>
                                    Continue
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Step 2: Preferences */}
            {isCurrentStep(2) && (
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                            <ShoppingCart className="w-5 h-5 text-orange-600" />
                            <span>Your Preferences</span>
                        </CardTitle>
                        <CardDescription>
                            Help us understand what kind of products you&apos;re interested in
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={preferencesForm.handleSubmit(handlePreferencesSubmit)} className="space-y-6">
                            {/* Product Interests */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium">
                                    Help us understand what kind of products you&apos;re interested in *
                                </Label>
                                <Controller
                                    name="productInterests"
                                    control={preferencesForm.control}
                                    render={({ field, fieldState }) => (
                                        <div>
                                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                                {PRODUCT_INTERESTS.map((product) => (
                                                    <div key={product} className="flex items-center space-x-2">
                                                        <input
                                                            type="checkbox"
                                                            id={`product-${product}`}
                                                            checked={field.value?.includes(product) || false}
                                                            onChange={(e) => {
                                                                const current = field.value || [];
                                                                if (e.target.checked) {
                                                                    field.onChange([...current, product]);
                                                                } else {
                                                                    field.onChange(current.filter(p => p !== product));
                                                                }
                                                            }}
                                                            className="rounded border-gray-300"
                                                        />
                                                        <Label
                                                            htmlFor={`product-${product}`}
                                                            className="text-sm font-normal cursor-pointer"
                                                        >
                                                            {product}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                            {fieldState.error && (
                                                <p className="text-sm text-red-600 mt-2">
                                                    {fieldState.error.message}
                                                </p>
                                            )}
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Occasions */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium">
                                    What occasions do you typically order for? (Optional)
                                </Label>
                                <Controller
                                    name="occasions"
                                    control={preferencesForm.control}
                                    render={({ field }) => (
                                        <div className="grid grid-cols-2 gap-3">
                                            {OCCASIONS.map((occasion) => (
                                                <div key={occasion} className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        id={`occasion-${occasion}`}
                                                        checked={field.value?.includes(occasion) || false}
                                                        onChange={(e) => {
                                                            const current = field.value || [];
                                                            if (e.target.checked) {
                                                                field.onChange([...current, occasion]);
                                                            } else {
                                                                field.onChange(current.filter(o => o !== occasion));
                                                            }
                                                        }}
                                                        className="rounded border-gray-300"
                                                    />
                                                    <Label
                                                        htmlFor={`occasion-${occasion}`}
                                                        className="text-sm font-normal cursor-pointer"
                                                    >
                                                        {occasion}
                                                    </Label>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                />
                            </div>

                            {/* Frequency */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium flex items-center space-x-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>How often do you expect to order?</span>
                                </Label>
                                <Controller
                                    name="frequency"
                                    control={preferencesForm.control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            value={field.value || ''}
                                            onValueChange={field.onChange}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="one-time" id="frequency-one-time" />
                                                <Label htmlFor="frequency-one-time" className="cursor-pointer">
                                                    One-time order
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="occasional" id="frequency-occasional" />
                                                <Label htmlFor="frequency-occasional" className="cursor-pointer">
                                                    Occasional orders (few times a year)
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="regular" id="frequency-regular" />
                                                <Label htmlFor="frequency-regular" className="cursor-pointer">
                                                    Regular orders (monthly/quarterly)
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />
                            </div>

                            {/* Budget Range */}
                            <div className="space-y-3">
                                <Label htmlFor="budgetRange" className="text-base font-medium flex items-center space-x-2">
                                    <DollarSign className="w-4 h-4" />
                                    <span>Typical budget per order (Optional)</span>
                                </Label>
                                <Controller
                                    name="budgetRange"
                                    control={preferencesForm.control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            value={field.value || ''}
                                            onValueChange={field.onChange}
                                            className="space-y-2"
                                        >
                                            {BUDGET_RANGES.map((range) => (
                                                <div key={range} className="flex items-center space-x-2">
                                                    <RadioGroupItem value={range} id={`budget-${range}`} />
                                                    <Label htmlFor={`budget-${range}`} className="cursor-pointer">
                                                        {range}
                                                    </Label>
                                                </div>
                                            ))}
                                        </RadioGroup>
                                    )}
                                />
                            </div>

                            {/* Contact Preference */}
                            <div className="space-y-3">
                                <Label className="text-base font-medium flex items-center space-x-2">
                                    <MessageSquare className="w-4 h-4" />
                                    <span>Preferred way to contact you (Optional)</span>
                                </Label>
                                <Controller
                                    name="contactPreference"
                                    control={preferencesForm.control}
                                    render={({ field }) => (
                                        <RadioGroup
                                            value={field.value || 'email'}
                                            onValueChange={field.onChange}
                                            className="space-y-2"
                                        >
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="email" id="contact-email" />
                                                <Label htmlFor="contact-email" className="cursor-pointer">
                                                    Email
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="phone" id="contact-phone" />
                                                <Label htmlFor="contact-phone" className="cursor-pointer">
                                                    Phone call
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="sms" id="contact-sms" />
                                                <Label htmlFor="contact-sms" className="cursor-pointer">
                                                    Text message
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    )}
                                />
                            </div>

                            {/* Error Display */}
                            {submitError && (
                                <Alert variant="destructive">
                                    <AlertDescription>{submitError}</AlertDescription>
                                </Alert>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setCurrentStep(0)}
                                    disabled={loading}
                                >
                                    <ArrowLeft className="w-4 h-4 mr-2" />
                                    Back
                                </Button>

                                <Button type="submit" disabled={loading} className="bg-orange-600 hover:bg-orange-700">
                                    {loading ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2 animate-spin" />
                                            Setting up...
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Complete Setup
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
