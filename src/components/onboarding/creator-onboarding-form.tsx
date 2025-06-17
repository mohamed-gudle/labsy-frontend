"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    businessInfoSchema,
    personalInfoSchema
} from '@/lib/schemas/onboarding';
import { CreatorOnboardingData, OnboardingFormErrors } from '@/lib/types/onboarding';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Building, User } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface CreatorOnboardingFormProps {
    /** Current step index */
    readonly currentStep: number;
    /** Current form data */
    readonly data: Partial<CreatorOnboardingData>;
    /** Callback when step is completed */
    readonly onStepComplete: (stepData: Partial<CreatorOnboardingData>) => void;
    /** Callback to go back */
    readonly onBack: () => void;
    /** Whether form is in submitting state */
    readonly isSubmitting?: boolean;
    /** Validation errors */
    readonly errors?: OnboardingFormErrors;
    /** Additional CSS classes */
    readonly className?: string;
}

// Personal Information Step
function PersonalInfoStep({
    data,
    onSubmit,
    onBack,
    isSubmitting = false
}: {
    data: Partial<CreatorOnboardingData>;
    onSubmit: (stepData: Partial<CreatorOnboardingData>) => void;
    onBack: () => void;
    isSubmitting?: boolean;
}) {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors }
    } = useForm<z.infer<typeof personalInfoSchema>>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            name: data.personalInfo?.name ?? '',
            phone: data.personalInfo?.phone ?? '',
            preferredLanguage: data.personalInfo?.preferredLanguage ?? 'ar',
        }
    });

    const preferredLanguage = watch('preferredLanguage');

    const onFormSubmit = (formData: z.infer<typeof personalInfoSchema>) => {
        onSubmit({ personalInfo: formData });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        placeholder="Fatima Al-Zahra"
                        className={cn(errors.name && "border-red-500")}
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number (Optional)</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+1234567890"
                        className={cn(errors.phone && "border-red-500")}
                        {...register('phone')}
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-2 w-full">
                    <Label htmlFor="preferredLanguage">Preferred Language</Label>
                    <Select
                        value={preferredLanguage}
                        onValueChange={(value) => setValue('preferredLanguage', value as 'ar' | 'en')}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select preferred language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="ar">العربية (Arabic)</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="w-full md:w-auto order-2 md:order-1"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto order-1 md:order-2"
                >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </form>
    );
}

// Business Information Step
function BusinessInfoStep({
    data,
    onSubmit,
    onBack,
    isSubmitting = false
}: {
    data: Partial<CreatorOnboardingData>;
    onSubmit: (stepData: Partial<CreatorOnboardingData>) => void;
    onBack: () => void;
    isSubmitting?: boolean;
}) {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof businessInfoSchema>>({
        resolver: zodResolver(businessInfoSchema),
        defaultValues: {
            businessName: data.businessInfo?.businessName ?? '',
            businessDescription: data.businessInfo?.businessDescription ?? '',
            socialMediaLinks: {
                instagram: data.businessInfo?.socialMediaLinks?.instagram ?? '',
                twitter: data.businessInfo?.socialMediaLinks?.twitter ?? '',
                tiktok: data.businessInfo?.socialMediaLinks?.tiktok ?? '',
                youtube: data.businessInfo?.socialMediaLinks?.youtube ?? '',
                website: data.businessInfo?.socialMediaLinks?.website ?? '',
            },
        }
    });

    const onFormSubmit = (formData: z.infer<typeof businessInfoSchema>) => {
        // Filter out empty strings from social media links
        const filteredSocialMediaLinks = Object.fromEntries(
            Object.entries(formData.socialMediaLinks || {}).filter(([, value]) => value && value.trim() !== '')
        );

        const processedData = {
            ...formData,
            socialMediaLinks: Object.keys(filteredSocialMediaLinks).length > 0 ? filteredSocialMediaLinks : undefined,
        };

        onSubmit({ businessInfo: processedData });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="businessName">Business/Brand Name *</Label>
                    <Input
                        id="businessName"
                        placeholder="Al-Zahra Designs"
                        className={cn(errors.businessName && "border-red-500")}
                        {...register('businessName')}
                    />
                    {errors.businessName && (
                        <p className="text-sm text-red-600">{errors.businessName.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="businessDescription">Business Description (Optional)</Label>
                    <Textarea
                        id="businessDescription"
                        placeholder="Creating unique Arabic calligraphy designs for custom merchandise and home decor"
                        rows={3}
                        className={cn(errors.businessDescription && "border-red-500")}
                        {...register('businessDescription')}
                    />
                    {errors.businessDescription && (
                        <p className="text-sm text-red-600">{errors.businessDescription.message}</p>
                    )}
                </div>

                <div>
                    <Label className="text-base font-medium">Social Media Links & Online Presence (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram Profile URL</Label>
                            <Input
                                id="instagram"
                                placeholder="https://instagram.com/labsy_creator"
                                {...register('socialMediaLinks.instagram')}
                                className={cn(errors.socialMediaLinks?.instagram && "border-red-500")}
                            />
                            {errors.socialMediaLinks?.instagram && (
                                <p className="text-sm text-red-600">{errors.socialMediaLinks.instagram.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter/X Profile URL</Label>
                            <Input
                                id="twitter"
                                placeholder="https://twitter.com/labsy_creator"
                                {...register('socialMediaLinks.twitter')}
                                className={cn(errors.socialMediaLinks?.twitter && "border-red-500")}
                            />
                            {errors.socialMediaLinks?.twitter && (
                                <p className="text-sm text-red-600">{errors.socialMediaLinks.twitter.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktok">TikTok Profile URL</Label>
                            <Input
                                id="tiktok"
                                placeholder="https://tiktok.com/@labsy_creator"
                                {...register('socialMediaLinks.tiktok')}
                                className={cn(errors.socialMediaLinks?.tiktok && "border-red-500")}
                            />
                            {errors.socialMediaLinks?.tiktok && (
                                <p className="text-sm text-red-600">{errors.socialMediaLinks.tiktok.message}</p>
                            )}
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="youtube">YouTube Channel URL</Label>
                            <Input
                                id="youtube"
                                placeholder="https://youtube.com/c/labsy_creator"
                                {...register('socialMediaLinks.youtube')}
                                className={cn(errors.socialMediaLinks?.youtube && "border-red-500")}
                            />
                            {errors.socialMediaLinks?.youtube && (
                                <p className="text-sm text-red-600">{errors.socialMediaLinks.youtube.message}</p>
                            )}
                        </div>
                        <div className="md:col-span-2 space-y-2">
                            <Label htmlFor="website">Website URL</Label>
                            <Input
                                id="website"
                                placeholder="https://labsycreator.com"
                                {...register('socialMediaLinks.website')}
                                className={cn(errors.socialMediaLinks?.website && "border-red-500")}
                            />
                            {errors.socialMediaLinks?.website && (
                                <p className="text-sm text-red-600">{errors.socialMediaLinks.website.message}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onBack}
                    disabled={isSubmitting}
                    className="w-full md:w-auto order-2 md:order-1"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full md:w-auto order-1 md:order-2"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-b-transparent border-white" />
                            Completing Setup...
                        </>
                    ) : (
                        <>
                            Complete Setup
                            <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                    )}
                </Button>
            </div>
        </form>
    );
}

export function CreatorOnboardingForm({
    currentStep,
    data,
    onStepComplete,
    onBack,
    isSubmitting = false,
    errors = {},
    className,
}: CreatorOnboardingFormProps) {
    const stepComponents = [
        PersonalInfoStep,
        BusinessInfoStep,
    ];

    const stepIcons = [User, Building];
    const stepTitles = ['Personal Information', 'Business Details'];

    const StepComponent = stepComponents[currentStep];
    const StepIcon = stepIcons[currentStep];

    if (!StepComponent) {
        return <div>Invalid step</div>;
    }

    return (
        <div className={cn("w-full", className)}>
            <Card className="border-0 shadow-none">
                <CardHeader className="text-center pb-6">
                    <div className="flex items-center justify-center mb-4">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <StepIcon className="w-6 h-6 text-blue-600" />
                        </div>
                    </div>
                    <CardTitle className="text-xl font-semibold">
                        {stepTitles[currentStep]}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <StepComponent
                        data={data}
                        onSubmit={onStepComplete}
                        onBack={onBack}
                        isSubmitting={isSubmitting}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
