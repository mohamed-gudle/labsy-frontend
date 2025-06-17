"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import {
    businessInfoSchema,
    creatorPreferencesSchema,
    personalInfoSchema
} from '@/lib/schemas/onboarding';
import { CreatorOnboardingData, OnboardingFormErrors } from '@/lib/types/onboarding';
import { cn } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowLeft, ArrowRight, Building, Settings, User } from 'lucide-react';
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
        formState: { errors }
    } = useForm<z.infer<typeof personalInfoSchema>>({
        resolver: zodResolver(personalInfoSchema),
        defaultValues: {
            name: data.personalInfo?.name ?? '',
            email: data.personalInfo?.email ?? '',
            phone: data.personalInfo?.phone ?? '',
            location: data.personalInfo?.location ?? '',
        }
    });

    const onFormSubmit = (formData: z.infer<typeof personalInfoSchema>) => {
        onSubmit({ personalInfo: formData });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        placeholder="John Doe"
                        className={cn(errors.name && "border-red-500")}
                        {...register('name')}
                    />
                    {errors.name && (
                        <p className="text-sm text-red-600">{errors.name.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className={cn(errors.email && "border-red-500")}
                        {...register('email')}
                    />
                    {errors.email && (
                        <p className="text-sm text-red-600">{errors.email.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className={cn(errors.phone && "border-red-500")}
                        {...register('phone')}
                    />
                    {errors.phone && (
                        <p className="text-sm text-red-600">{errors.phone.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                        id="location"
                        placeholder="New York, NY"
                        className={cn(errors.location && "border-red-500")}
                        {...register('location')}
                    />
                    {errors.location && (
                        <p className="text-sm text-red-600">{errors.location.message}</p>
                    )}
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
        setValue,
        watch,
        formState: { errors }
    } = useForm<z.infer<typeof businessInfoSchema>>({
        resolver: zodResolver(businessInfoSchema),
        defaultValues: {
            businessName: data.businessInfo?.businessName ?? '',
            businessType: data.businessInfo?.businessType ?? 'individual',
            description: data.businessInfo?.description ?? '',
            website: data.businessInfo?.website ?? '',
            socialMedia: {
                instagram: data.businessInfo?.socialMedia?.instagram ?? '',
                twitter: data.businessInfo?.socialMedia?.twitter ?? '',
                facebook: data.businessInfo?.socialMedia?.facebook ?? '',
                tiktok: data.businessInfo?.socialMedia?.tiktok ?? '',
            },
        }
    });

    const businessType = watch('businessType');

    const onFormSubmit = (formData: z.infer<typeof businessInfoSchema>) => {
        onSubmit({ businessInfo: formData });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="businessName">Business/Brand Name</Label>
                    <Input
                        id="businessName"
                        placeholder="Acme Designs"
                        className={cn(errors.businessName && "border-red-500")}
                        {...register('businessName')}
                    />
                    {errors.businessName && (
                        <p className="text-sm text-red-600">{errors.businessName.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select value={businessType} onValueChange={(value) => setValue('businessType', value as 'individual' | 'llc' | 'corporation' | 'partnership' | 'other')}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select business type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="individual">Individual/Freelancer</SelectItem>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="corporation">Corporation</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                        id="description"
                        placeholder="Tell us about your business and what makes it unique..."
                        rows={3}
                        className={cn(errors.description && "border-red-500")}
                        {...register('description')}
                    />
                    {errors.description && (
                        <p className="text-sm text-red-600">{errors.description.message}</p>
                    )}
                </div>

                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                        id="website"
                        type="url"
                        placeholder="https://yourwebsite.com"
                        className={cn(errors.website && "border-red-500")}
                        {...register('website')}
                    />
                    {errors.website && (
                        <p className="text-sm text-red-600">{errors.website.message}</p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <Label className="text-base font-medium">Social Media (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                                id="instagram"
                                placeholder="@username"
                                {...register('socialMedia.instagram')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                                id="twitter"
                                placeholder="@username"
                                {...register('socialMedia.twitter')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                                id="facebook"
                                placeholder="Your Page Name"
                                {...register('socialMedia.facebook')}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktok">TikTok</Label>
                            <Input
                                id="tiktok"
                                placeholder="@username"
                                {...register('socialMedia.tiktok')}
                            />
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
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </form>
    );
}

// Preferences Step
function PreferencesStep({
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
    } = useForm<z.infer<typeof creatorPreferencesSchema>>({
        resolver: zodResolver(creatorPreferencesSchema),
        defaultValues: {
            productInterests: data.preferences?.productInterests ?? [],
            designStyles: data.preferences?.designStyles ?? [],
            targetAudience: data.preferences?.targetAudience ?? '',
            expectedVolume: data.preferences?.expectedVolume ?? 'medium',
            budgetRange: data.preferences?.budgetRange ?? '',
        }
    });

    const productInterests = watch('productInterests');
    const designStyles = watch('designStyles');
    const expectedVolume = watch('expectedVolume');

    const productOptions = [
        'T-Shirts', 'Hoodies', 'Sweatshirts', 'Tank Tops', 'Long Sleeves',
        'Hats & Caps', 'Tote Bags', 'Mugs', 'Phone Cases', 'Stickers'
    ];

    const designStyleOptions = [
        'Minimalist', 'Vintage', 'Modern', 'Abstract', 'Typography',
        'Illustration', 'Photography', 'Grunge', 'Retro', 'Artistic'
    ];

    const handleProductInterestChange = (product: string, checked: boolean) => {
        const currentInterests = productInterests ?? [];
        if (checked) {
            setValue('productInterests', [...currentInterests, product]);
        } else {
            setValue('productInterests', currentInterests.filter(p => p !== product));
        }
    };

    const handleDesignStyleChange = (style: string, checked: boolean) => {
        const currentStyles = designStyles ?? [];
        if (checked) {
            setValue('designStyles', [...currentStyles, style]);
        } else {
            setValue('designStyles', currentStyles.filter(s => s !== style));
        }
    };

    const onFormSubmit = (formData: z.infer<typeof creatorPreferencesSchema>) => {
        onSubmit({ preferences: formData });
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            <div className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-base font-medium">Product Interests *</Label>
                    <p className="text-sm text-gray-600">Select the products you&apos;re interested in creating designs for</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {productOptions.map((product) => (
                            <div key={product} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`product-${product}`}
                                    checked={productInterests?.includes(product) ?? false}
                                    onCheckedChange={(checked) => handleProductInterestChange(product, checked as boolean)}
                                />
                                <Label htmlFor={`product-${product}`} className="text-sm font-normal">
                                    {product}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {errors.productInterests && (
                        <p className="text-sm text-red-600">{errors.productInterests.message}</p>
                    )}
                </div>

                <div className="space-y-4">
                    <Label className="text-base font-medium">Design Styles (Optional)</Label>
                    <p className="text-sm text-gray-600">What design styles best represent your work?</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {designStyleOptions.map((style) => (
                            <div key={style} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`style-${style}`}
                                    checked={designStyles?.includes(style) ?? false}
                                    onCheckedChange={(checked) => handleDesignStyleChange(style, checked as boolean)}
                                />
                                <Label htmlFor={`style-${style}`} className="text-sm font-normal">
                                    {style}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="expectedVolume">Expected Monthly Volume</Label>
                        <Select value={expectedVolume} onValueChange={(value) => setValue('expectedVolume', value as 'low' | 'medium' | 'high')}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select expected volume" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="low">Low (1-50 orders)</SelectItem>
                                <SelectItem value="medium">Medium (51-200 orders)</SelectItem>
                                <SelectItem value="high">High (200+ orders)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="budgetRange">Budget Range (Optional)</Label>
                        <Input
                            id="budgetRange"
                            placeholder="e.g., $500-$2000/month"
                            {...register('budgetRange')}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
                    <Textarea
                        id="targetAudience"
                        placeholder="Describe your target customers..."
                        rows={3}
                        {...register('targetAudience')}
                    />
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
        PreferencesStep,
    ];

    const stepIcons = [User, Building, Settings];
    const stepTitles = ['Personal Information', 'Business Details', 'Preferences'];

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
