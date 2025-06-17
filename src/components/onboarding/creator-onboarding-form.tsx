/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ArrowLeft, ArrowRight, Building, Settings, User } from 'lucide-react';
import { useState } from 'react';

interface CreatorOnboardingFormProps {
    /** Current step index */
    currentStep: number;
    /** Current form data */
    data: Partial<CreatorOnboardingData>;
    /** Callback when step is completed */
    onStepComplete: (stepData: Partial<CreatorOnboardingData>) => void;
    /** Callback to go back */
    onBack: () => void;
    /** Validation errors */
    errors?: OnboardingFormErrors;
    /** Additional CSS classes */
    className?: string;
}

interface StepFormProps {
    data: Partial<CreatorOnboardingData>;
    errors: OnboardingFormErrors;
    onSubmit: (stepData: Partial<CreatorOnboardingData>) => void;
    onBack: () => void;
}

// Step 1: Personal Information
function PersonalInfoStep({ data, onSubmit, onBack }: StepFormProps) {
    const [formData, setFormData] = useState({
        name: data.personalInfo?.name || '',
        email: data.personalInfo?.email || '',
        phone: data.personalInfo?.phone || '',
        location: data.personalInfo?.location || '',
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validation = await personalInfoSchema.safeParseAsync(formData);
            if (!validation.success) {
                const errorMap: Record<string, string> = {};
                validation.error.errors.forEach((error) => {
                    if (error.path[0]) {
                        errorMap[error.path[0] as string] = error.message;
                    }
                });
                setValidationErrors(errorMap);
                return;
            }

            setValidationErrors({});
            onSubmit({ personalInfo: formData });
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="John Doe"
                        className={cn(validationErrors.name && "border-red-500")}
                    />
                    {validationErrors.name && (
                        <p className="text-sm text-red-600">{validationErrors.name}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@example.com"
                        className={cn(validationErrors.email && "border-red-500")}
                    />
                    {validationErrors.email && (
                        <p className="text-sm text-red-600">{validationErrors.email}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+1 (555) 123-4567"
                        className={cn(validationErrors.phone && "border-red-500")}
                    />
                    {validationErrors.phone && (
                        <p className="text-sm text-red-600">{validationErrors.phone}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="location">Location (Optional)</Label>
                    <Input
                        id="location"
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="New York, NY"
                        className={cn(validationErrors.location && "border-red-500")}
                    />
                    {validationErrors.location && (
                        <p className="text-sm text-red-600">{validationErrors.location}</p>
                    )}
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
                <Button type="button" variant="outline" onClick={onBack} className="w-full md:w-auto order-2 md:order-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button type="submit" className="w-full md:w-auto order-1 md:order-2">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </form>
    );
}

// Step 2: Business Information
function BusinessInfoStep({ data, errors, onSubmit, onBack }: StepFormProps) {
    const [formData, setFormData] = useState({
        businessName: data.businessInfo?.businessName || '',
        businessType: data.businessInfo?.businessType || 'individual',
        description: data.businessInfo?.description || '',
        website: data.businessInfo?.website || '',
        socialMedia: {
            instagram: data.businessInfo?.socialMedia?.instagram || '',
            twitter: data.businessInfo?.socialMedia?.twitter || '',
            facebook: data.businessInfo?.socialMedia?.facebook || '',
            tiktok: data.businessInfo?.socialMedia?.tiktok || '',
        },
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validation = await businessInfoSchema.safeParseAsync(formData);
            if (!validation.success) {
                const errorMap: Record<string, string> = {};
                validation.error.errors.forEach((error) => {
                    if (error.path[0]) {
                        errorMap[error.path.join('.')] = error.message;
                    }
                });
                setValidationErrors(errorMap);
                return;
            }

            setValidationErrors({});
            onSubmit({ businessInfo: formData });
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="businessName">Business/Brand Name</Label>
                    <Input
                        id="businessName"
                        value={formData.businessName}
                        onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                        placeholder="Acme Designs"
                        className={cn(validationErrors.businessName && "border-red-500")}
                    />
                    {validationErrors.businessName && (
                        <p className="text-sm text-red-600">{validationErrors.businessName}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                        value={formData.businessType}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value as any }))}
                    >
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
                        value={formData.description}
                        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                        placeholder="Tell us about your business and what makes it unique..."
                        rows={3}
                        className={cn(validationErrors.description && "border-red-500")}
                    />
                    {validationErrors.description && (
                        <p className="text-sm text-red-600">{validationErrors.description}</p>
                    )}
                </div>

                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="website">Website URL</Label>
                    <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://yourwebsite.com"
                        className={cn(validationErrors.website && "border-red-500")}
                    />
                    {validationErrors.website && (
                        <p className="text-sm text-red-600">{validationErrors.website}</p>
                    )}
                </div>

                <div className="md:col-span-2">
                    <Label className="text-base font-medium">Social Media (Optional)</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                        <div className="space-y-2">
                            <Label htmlFor="instagram">Instagram</Label>
                            <Input
                                id="instagram"
                                value={formData.socialMedia.instagram}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socialMedia: { ...prev.socialMedia, instagram: e.target.value }
                                }))}
                                placeholder="@username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="twitter">Twitter</Label>
                            <Input
                                id="twitter"
                                value={formData.socialMedia.twitter}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socialMedia: { ...prev.socialMedia, twitter: e.target.value }
                                }))}
                                placeholder="@username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="facebook">Facebook</Label>
                            <Input
                                id="facebook"
                                value={formData.socialMedia.facebook}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socialMedia: { ...prev.socialMedia, facebook: e.target.value }
                                }))}
                                placeholder="Your Page Name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="tiktok">TikTok</Label>
                            <Input
                                id="tiktok"
                                value={formData.socialMedia.tiktok}
                                onChange={(e) => setFormData(prev => ({
                                    ...prev,
                                    socialMedia: { ...prev.socialMedia, tiktok: e.target.value }
                                }))}
                                placeholder="@username"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
                <Button type="button" variant="outline" onClick={onBack} className="w-full md:w-auto order-2 md:order-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button type="submit" className="w-full md:w-auto order-1 md:order-2">
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </form>
    );
}

// Step 3: Preferences
function PreferencesStep({ data, errors, onSubmit, onBack }: StepFormProps) {
    const [formData, setFormData] = useState({
        productInterests: data.preferences?.productInterests || [],
        designStyles: data.preferences?.designStyles || [],
        targetAudience: data.preferences?.targetAudience || '',
        expectedVolume: data.preferences?.expectedVolume || 'medium',
        budgetRange: data.preferences?.budgetRange || '',
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const productOptions = [
        'T-Shirts', 'Hoodies', 'Sweatshirts', 'Tank Tops', 'Long Sleeves',
        'Hats & Caps', 'Tote Bags', 'Mugs', 'Phone Cases', 'Stickers'
    ];

    const designStyleOptions = [
        'Minimalist', 'Vintage', 'Modern', 'Abstract', 'Typography',
        'Illustration', 'Photography', 'Grunge', 'Retro', 'Artistic'
    ];

    const handleProductInterestChange = (product: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                productInterests: [...prev.productInterests, product]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                productInterests: prev.productInterests.filter(p => p !== product)
            }));
        }
    };

    const handleDesignStyleChange = (style: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                designStyles: [...prev.designStyles, style]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                designStyles: prev.designStyles.filter(s => s !== style)
            }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validation = await creatorPreferencesSchema.safeParseAsync(formData);
            if (!validation.success) {
                const errorMap: Record<string, string> = {};
                validation.error.errors.forEach((error) => {
                    if (error.path[0]) {
                        errorMap[error.path[0] as string] = error.message;
                    }
                });
                setValidationErrors(errorMap);
                return;
            }

            setValidationErrors({});
            onSubmit({ preferences: formData });
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
                <div className="space-y-4">
                    <Label className="text-base font-medium">Product Interests *</Label>
                    <p className="text-sm text-gray-600">Select the products you&apos;re interested in creating designs for</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {productOptions.map((product) => (
                            <div key={product} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`product-${product}`}
                                    checked={formData.productInterests.includes(product)}
                                    onCheckedChange={(checked) => handleProductInterestChange(product, checked as boolean)}
                                />
                                <Label htmlFor={`product-${product}`} className="text-sm font-normal">
                                    {product}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {validationErrors.productInterests && (
                        <p className="text-sm text-red-600">{validationErrors.productInterests}</p>
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
                                    checked={formData.designStyles.includes(style)}
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
                        <Select
                            value={formData.expectedVolume}
                            onValueChange={(value) => setFormData(prev => ({ ...prev, expectedVolume: value as any }))}
                        >
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
                            value={formData.budgetRange}
                            onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                            placeholder="e.g., $500-$2000/month"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="targetAudience">Target Audience (Optional)</Label>
                    <Textarea
                        id="targetAudience"
                        value={formData.targetAudience}
                        onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                        placeholder="Describe your target customers..."
                        rows={3}
                    />
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
                <Button type="button" variant="outline" onClick={onBack} className="w-full md:w-auto order-2 md:order-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button type="submit" className="w-full md:w-auto order-1 md:order-2">
                    Complete Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
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
                        errors={errors}
                        onSubmit={onStepComplete}
                        onBack={onBack}
                    />
                </CardContent>
            </Card>
        </div>
    );
}
