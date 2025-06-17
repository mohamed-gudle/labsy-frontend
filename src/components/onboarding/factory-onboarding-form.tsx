"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    companyInfoSchema,
    factoryCapabilitiesSchema,
    factoryContactInfoSchema,
    factoryVerificationSchema
} from '@/lib/schemas/onboarding';
import { FactoryOnboardingData, OnboardingFormErrors } from '@/lib/types/onboarding';
import { cn } from '@/lib/utils';
import { ArrowLeft, ArrowRight, Building, Shield, Upload, User, Wrench, X } from 'lucide-react';
import { useState } from 'react';

interface FactoryOnboardingFormProps {
    /** Current step index */
    currentStep: number;
    /** Current form data */
    data: Partial<FactoryOnboardingData>;
    /** Callback when step is completed */
    onStepComplete: (stepData: Partial<FactoryOnboardingData>) => void;
    /** Callback to go back */
    onBack: () => void;
    /** Validation errors */
    errors?: OnboardingFormErrors;
    /** Additional CSS classes */
    className?: string;
}

interface StepFormProps {
    data: Partial<FactoryOnboardingData>;
    errors: OnboardingFormErrors;
    onSubmit: (stepData: Partial<FactoryOnboardingData>) => void;
    onBack: () => void;
}

// Step 1: Company Information
function CompanyInfoStep({ data, onSubmit, onBack }: StepFormProps) {
    const [formData, setFormData] = useState({
        companyName: data.companyInfo?.companyName || '',
        registrationNumber: data.companyInfo?.registrationNumber || '',
        taxId: data.companyInfo?.taxId || '',
        address: {
            street: data.companyInfo?.address?.street || '',
            city: data.companyInfo?.address?.city || '',
            state: data.companyInfo?.address?.state || '',
            zipCode: data.companyInfo?.address?.zipCode || '',
            country: data.companyInfo?.address?.country || '',
        },
        website: data.companyInfo?.website || '',
        yearsInBusiness: data.companyInfo?.yearsInBusiness || '',
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const cleanData = {
                ...formData,
                yearsInBusiness: formData.yearsInBusiness ? parseInt(formData.yearsInBusiness as string) : undefined,
            };

            const validation = await companyInfoSchema.safeParseAsync(cleanData);
            if (!validation.success) {
                const errorMap: Record<string, string> = {};
                validation.error.errors.forEach((error) => {
                    if (error.path.length > 0) {
                        errorMap[error.path.join('.')] = error.message;
                    }
                });
                setValidationErrors(errorMap);
                return;
            }

            setValidationErrors({});
            onSubmit({ companyInfo: cleanData });
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                        placeholder="Acme Manufacturing Ltd."
                        className={cn(validationErrors.companyName && "border-red-500")}
                    />
                    {validationErrors.companyName && (
                        <p className="text-sm text-red-600">{validationErrors.companyName}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="registrationNumber">Registration Number (Optional)</Label>
                    <Input
                        id="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, registrationNumber: e.target.value }))}
                        placeholder="REG-123456789"
                        className={cn(validationErrors.registrationNumber && "border-red-500")}
                    />
                    {validationErrors.registrationNumber && (
                        <p className="text-sm text-red-600">{validationErrors.registrationNumber}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID (Optional)</Label>
                    <Input
                        id="taxId"
                        value={formData.taxId}
                        onChange={(e) => setFormData(prev => ({ ...prev, taxId: e.target.value }))}
                        placeholder="TAX-123456789"
                        className={cn(validationErrors.taxId && "border-red-500")}
                    />
                    {validationErrors.taxId && (
                        <p className="text-sm text-red-600">{validationErrors.taxId}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="yearsInBusiness">Years in Business (Optional)</Label>
                    <Input
                        id="yearsInBusiness"
                        type="number"
                        min="0"
                        value={formData.yearsInBusiness}
                        onChange={(e) => setFormData(prev => ({ ...prev, yearsInBusiness: e.target.value }))}
                        placeholder="5"
                        className={cn(validationErrors.yearsInBusiness && "border-red-500")}
                    />
                    {validationErrors.yearsInBusiness && (
                        <p className="text-sm text-red-600">{validationErrors.yearsInBusiness}</p>
                    )}
                </div>

                <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="website">Website URL (Optional)</Label>
                    <Input
                        id="website"
                        type="url"
                        value={formData.website}
                        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                        placeholder="https://yourcompany.com"
                        className={cn(validationErrors.website && "border-red-500")}
                    />
                    {validationErrors.website && (
                        <p className="text-sm text-red-600">{validationErrors.website}</p>
                    )}
                </div>
            </div>

            {/* Company Address Section */}
            <div className="space-y-4">
                <h3 className="text-lg font-medium">Company Address</h3>

                <div className="space-y-2">
                    <Label htmlFor="street">Street Address *</Label>
                    <Input
                        id="street"
                        value={formData.address.street}
                        onChange={(e) => setFormData(prev => ({
                            ...prev,
                            address: { ...prev.address, street: e.target.value }
                        }))}
                        placeholder="123 Manufacturing Blvd"
                        className={cn(validationErrors['address.street'] && "border-red-500")}
                    />
                    {validationErrors['address.street'] && (
                        <p className="text-sm text-red-600">{validationErrors['address.street']}</p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="city">City *</Label>
                        <Input
                            id="city"
                            value={formData.address.city}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                address: { ...prev.address, city: e.target.value }
                            }))}
                            placeholder="Los Angeles"
                            className={cn(validationErrors['address.city'] && "border-red-500")}
                        />
                        {validationErrors['address.city'] && (
                            <p className="text-sm text-red-600">{validationErrors['address.city']}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="state">State/Province *</Label>
                        <Input
                            id="state"
                            value={formData.address.state}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                address: { ...prev.address, state: e.target.value }
                            }))}
                            placeholder="California"
                            className={cn(validationErrors['address.state'] && "border-red-500")}
                        />
                        {validationErrors['address.state'] && (
                            <p className="text-sm text-red-600">{validationErrors['address.state']}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="zipCode">Zip/Postal Code *</Label>
                        <Input
                            id="zipCode"
                            value={formData.address.zipCode}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                address: { ...prev.address, zipCode: e.target.value }
                            }))}
                            placeholder="90210"
                            className={cn(validationErrors['address.zipCode'] && "border-red-500")}
                        />
                        {validationErrors['address.zipCode'] && (
                            <p className="text-sm text-red-600">{validationErrors['address.zipCode']}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">Country *</Label>
                        <Input
                            id="country"
                            value={formData.address.country}
                            onChange={(e) => setFormData(prev => ({
                                ...prev,
                                address: { ...prev.address, country: e.target.value }
                            }))}
                            placeholder="United States"
                            className={cn(validationErrors['address.country'] && "border-red-500")}
                        />
                        {validationErrors['address.country'] && (
                            <p className="text-sm text-red-600">{validationErrors['address.country']}</p>
                        )}
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

// Step 2: Contact Information
function ContactInfoStep({ data,  onSubmit, onBack }: StepFormProps) {
    const [formData, setFormData] = useState({
        contactName: data.contactInfo?.contactName || '',
        email: data.contactInfo?.email || '',
        phone: data.contactInfo?.phone || '',
        position: data.contactInfo?.position || '',
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validation = await factoryContactInfoSchema.safeParseAsync(formData);
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
            onSubmit({ contactInfo: formData });
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name *</Label>
                    <Input
                        id="contactName"
                        value={formData.contactName}
                        onChange={(e) => setFormData(prev => ({ ...prev, contactName: e.target.value }))}
                        placeholder="John Smith"
                        className={cn(validationErrors.contactName && "border-red-500")}
                    />
                    {validationErrors.contactName && (
                        <p className="text-sm text-red-600">{validationErrors.contactName}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="position">Position/Title *</Label>
                    <Input
                        id="position"
                        value={formData.position}
                        onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                        placeholder="Production Manager"
                        className={cn(validationErrors.position && "border-red-500")}
                    />
                    {validationErrors.position && (
                        <p className="text-sm text-red-600">{validationErrors.position}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="john@acmemanufacturing.com"
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

// Step 3: Manufacturing Capabilities
function CapabilitiesStep({ data, onSubmit, onBack }: StepFormProps) {
    const [formData, setFormData] = useState({
        productTypes: data.capabilities?.productTypes || [],
        techniques: data.capabilities?.techniques || [],
        minimumOrders: data.capabilities?.minimumOrders || {},
        monthlyCapacity: data.capabilities?.monthlyCapacity || '',
        certifications: data.capabilities?.certifications || [],
        materials: data.capabilities?.materials || [],
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    // Options for the form
    const productTypeOptions = [
        'T-Shirts', 'Hoodies', 'Sweatshirts', 'Tank Tops', 'Long Sleeves',
        'Hats & Caps', 'Tote Bags', 'Mugs', 'Phone Cases', 'Stickers',
        'Posters', 'Canvas Prints', 'Banners', 'Custom Textiles'
    ];

    const techniqueOptions = [
        'Screen Printing', 'Digital Printing', 'Embroidery', 'Heat Transfer',
        'Sublimation', 'DTG (Direct to Garment)', 'Vinyl Cutting', 'Laser Engraving',
        'Pad Printing', 'Offset Printing', 'Foil Stamping', 'Debossing/Embossing'
    ];

    const certificationOptions = [
        'ISO 9001', 'ISO 14001', 'OEKO-TEX', 'GOTS', 'CPSIA',
        'FDA Approved', 'CE Marking', 'RoHS Compliant', 'Fair Trade',
        'WRAP Certified', 'BSCI Audit', 'Sedex Audit'
    ];

    const materialOptions = [
        'Cotton', 'Polyester', 'Blend (Cotton/Poly)', 'Bamboo', 'Hemp',
        'Linen', 'Silk', 'Wool', 'Recycled Materials', 'Organic Cotton',
        'Plastic', 'Metal', 'Glass', 'Ceramic', 'Paper', 'Vinyl'
    ];

    const handleProductTypeChange = (productType: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                productTypes: [...prev.productTypes, productType]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                productTypes: prev.productTypes.filter(p => p !== productType)
            }));
        }
    };

    const handleTechniqueChange = (technique: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                techniques: [...prev.techniques, technique]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                techniques: prev.techniques.filter(t => t !== technique)
            }));
        }
    };

    const handleCertificationChange = (certification: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                certifications: [...prev.certifications, certification]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                certifications: prev.certifications.filter(c => c !== certification)
            }));
        }
    };

    const handleMaterialChange = (material: string, checked: boolean) => {
        if (checked) {
            setFormData(prev => ({
                ...prev,
                materials: [...prev.materials, material]
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                materials: prev.materials.filter(m => m !== material)
            }));
        }
    };

    const handleMinimumOrderChange = (productType: string, value: string) => {
        const numValue = parseInt(value) || 0;
        setFormData(prev => ({
            ...prev,
            minimumOrders: {
                ...prev.minimumOrders,
                [productType]: numValue
            }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const cleanData = {
                ...formData,
                monthlyCapacity: formData.monthlyCapacity ? parseInt(formData.monthlyCapacity as string) : undefined,
            };

            const validation = await factoryCapabilitiesSchema.safeParseAsync(cleanData);
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
            onSubmit({ capabilities: cleanData });
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
                {/* Product Types */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Product Types *</Label>
                    <p className="text-sm text-gray-600">Select the products you can manufacture</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {productTypeOptions.map((productType) => (
                            <div key={productType} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`product-${productType}`}
                                    checked={formData.productTypes.includes(productType)}
                                    onCheckedChange={(checked) => handleProductTypeChange(productType, checked as boolean)}
                                />
                                <Label htmlFor={`product-${productType}`} className="text-sm font-normal">
                                    {productType}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {validationErrors.productTypes && (
                        <p className="text-sm text-red-600">{validationErrors.productTypes}</p>
                    )}
                </div>

                {/* Manufacturing Techniques */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Manufacturing Techniques *</Label>
                    <p className="text-sm text-gray-600">Select your available manufacturing methods</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {techniqueOptions.map((technique) => (
                            <div key={technique} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`technique-${technique}`}
                                    checked={formData.techniques.includes(technique)}
                                    onCheckedChange={(checked) => handleTechniqueChange(technique, checked as boolean)}
                                />
                                <Label htmlFor={`technique-${technique}`} className="text-sm font-normal">
                                    {technique}
                                </Label>
                            </div>
                        ))}
                    </div>
                    {validationErrors.techniques && (
                        <p className="text-sm text-red-600">{validationErrors.techniques}</p>
                    )}
                </div>

                {/* Minimum Orders */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Minimum Order Quantities *</Label>
                    <p className="text-sm text-gray-600">Specify minimum orders for your selected product types</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {formData.productTypes.map((productType) => (
                            <div key={productType} className="space-y-2">
                                <Label htmlFor={`min-order-${productType}`}>{productType} (units)</Label>
                                <Input
                                    id={`min-order-${productType}`}
                                    type="number"
                                    min="1"
                                    value={formData.minimumOrders[productType] || ''}
                                    onChange={(e) => handleMinimumOrderChange(productType, e.target.value)}
                                    placeholder="100"
                                />
                            </div>
                        ))}
                    </div>
                    {validationErrors.minimumOrders && (
                        <p className="text-sm text-red-600">{validationErrors.minimumOrders}</p>
                    )}
                </div>

                {/* Monthly Capacity */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="monthlyCapacity">Monthly Capacity (Optional)</Label>
                        <Input
                            id="monthlyCapacity"
                            type="number"
                            min="1"
                            value={formData.monthlyCapacity}
                            onChange={(e) => setFormData(prev => ({ ...prev, monthlyCapacity: e.target.value }))}
                            placeholder="10000"
                            className={cn(validationErrors.monthlyCapacity && "border-red-500")}
                        />
                        <p className="text-xs text-gray-500">Total units per month across all products</p>
                        {validationErrors.monthlyCapacity && (
                            <p className="text-sm text-red-600">{validationErrors.monthlyCapacity}</p>
                        )}
                    </div>
                </div>

                {/* Certifications (Optional) */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Quality Certifications (Optional)</Label>
                    <p className="text-sm text-gray-600">Select your quality and compliance certifications</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {certificationOptions.map((certification) => (
                            <div key={certification} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`cert-${certification}`}
                                    checked={formData.certifications.includes(certification)}
                                    onCheckedChange={(checked) => handleCertificationChange(certification, checked as boolean)}
                                />
                                <Label htmlFor={`cert-${certification}`} className="text-sm font-normal">
                                    {certification}
                                </Label>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Materials (Optional) */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Available Materials (Optional)</Label>
                    <p className="text-sm text-gray-600">Select the materials you work with</p>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {materialOptions.map((material) => (
                            <div key={material} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`material-${material}`}
                                    checked={formData.materials.includes(material)}
                                    onCheckedChange={(checked) => handleMaterialChange(material, checked as boolean)}
                                />
                                <Label htmlFor={`material-${material}`} className="text-sm font-normal">
                                    {material}
                                </Label>
                            </div>
                        ))}
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

// Step 4: Verification Documents
function VerificationStep({ data, onSubmit, onBack }: StepFormProps) {
    const [formData, setFormData] = useState({
        businessLicense: data.verification?.businessLicense || null,
        taxCertificate: data.verification?.taxCertificate || null,
        insurance: data.verification?.insurance || null,
        qualityCerts: data.verification?.qualityCerts || [],
        status: data.verification?.status || 'pending',
    });
    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const handleFileChange = (fieldName: string, file: File | null) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: file
        }));
    };

    const handleQualityCertAdd = (file: File) => {
        setFormData(prev => ({
            ...prev,
            qualityCerts: [...prev.qualityCerts, file]
        }));
    };

    const handleQualityCertRemove = (index: number) => {
        setFormData(prev => ({
            ...prev,
            qualityCerts: prev.qualityCerts.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const validation = await factoryVerificationSchema.safeParseAsync(formData);
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
            // Convert nulls to undefined for optional File fields
            const cleanedFormData = {
                ...formData,
                businessLicense: formData.businessLicense ?? undefined,
                taxCertificate: formData.taxCertificate ?? undefined,
                insurance: formData.insurance ?? undefined,
            };
            onSubmit({ verification: cleanedFormData });
        } catch (error) {
            console.error('Validation error:', error);
        }
    };

    const FileUploadField = ({
        label,
        fieldName,
        required = false,
        accept = ".pdf,.jpg,.jpeg,.png",
        description
    }: {
        label: string;
        fieldName: string;
        required?: boolean;
        accept?: string;
        description?: string;
    }) => (
        <div className="space-y-2">
            <Label htmlFor={fieldName}>
                {label} {required && '*'}
            </Label>
            {description && (
                <p className="text-sm text-gray-600">{description}</p>
            )}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                    type="file"
                    id={fieldName}
                    accept={accept}
                    onChange={(e) => handleFileChange(fieldName, e.target.files?.[0] || null)}
                    className="hidden"
                />
                <label htmlFor={fieldName} className="cursor-pointer">
                    <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 text-gray-400" />
                        <p className="mt-2 text-sm text-gray-600">
                            {formData[fieldName as keyof typeof formData]
                                ? (formData[fieldName as keyof typeof formData] as File)?.name
                                : `Click to upload ${label.toLowerCase()}`}
                        </p>
                        <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB</p>
                    </div>
                </label>
                {formData[fieldName as keyof typeof formData] && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleFileChange(fieldName, null)}
                        className="mt-2"
                    >
                        <X className="w-4 h-4 mr-1" />
                        Remove
                    </Button>
                )}
            </div>
            {validationErrors[fieldName] && (
                <p className="text-sm text-red-600">{validationErrors[fieldName]}</p>
            )}
        </div>
    );

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-6">
                <div className="text-center mb-6">
                    <p className="text-gray-600">
                        Upload verification documents to complete your factory registration.
                        These documents help us verify your business and ensure quality standards.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FileUploadField
                        label="Business License"
                        fieldName="businessLicense"
                        description="Official business registration document"
                    />

                    <FileUploadField
                        label="Tax Certificate"
                        fieldName="taxCertificate"
                        description="Tax registration or exemption certificate"
                    />

                    <FileUploadField
                        label="Insurance Certificate"
                        fieldName="insurance"
                        description="General liability or business insurance"
                    />
                </div>

                {/* Quality Certifications */}
                <div className="space-y-4">
                    <Label className="text-base font-medium">Quality Certification Documents (Optional)</Label>
                    <p className="text-sm text-gray-600">Upload certificates for ISO, OEKO-TEX, GOTS, etc.</p>

                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                            type="file"
                            id="qualityCerts"
                            accept=".pdf,.jpg,.jpeg,.png"
                            multiple
                            onChange={(e) => {
                                const files = Array.from(e.target.files || []);
                                files.forEach(file => handleQualityCertAdd(file));
                                e.target.value = ''; // Reset input
                            }}
                            className="hidden"
                        />
                        <label htmlFor="qualityCerts" className="cursor-pointer">
                            <div className="text-center">
                                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                                <p className="mt-2 text-sm text-gray-600">
                                    Click to upload quality certificates
                                </p>
                                <p className="text-xs text-gray-500">PDF, JPG, PNG up to 10MB each</p>
                            </div>
                        </label>
                    </div>

                    {formData.qualityCerts.length > 0 && (
                        <div className="space-y-2">
                            <Label>Uploaded Certificates:</Label>
                            {formData.qualityCerts.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 border rounded">
                                    <span className="text-sm">{file.name}</span>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleQualityCertRemove(index)}
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">What happens next?</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                        <li>• Our team will review your documents within 3-5 business days</li>
                        <li>• You&apos;ll receive an email notification once verification is complete</li>
                        <li>• Upon approval, you can start receiving manufacturing requests</li>
                        <li>• If additional information is needed, we&apos;ll contact you directly</li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
                <Button type="button" variant="outline" onClick={onBack} className="w-full md:w-auto order-2 md:order-1">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                </Button>
                <Button type="submit" className="w-full md:w-auto order-1 md:order-2">
                    Complete Registration
                    <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
            </div>
        </form>
    );
}

export function FactoryOnboardingForm({
    currentStep,
    data,
    onStepComplete,
    onBack,
    errors = {},
    className,
}: FactoryOnboardingFormProps) {
    const stepComponents = [
        CompanyInfoStep,
        ContactInfoStep,
        CapabilitiesStep,
        VerificationStep,
    ];

    const stepIcons = [Building, User, Wrench, Shield];
    const stepTitles = [
        'Company Information',
        'Contact Details',
        'Manufacturing Capabilities',
        'Verification Documents'
    ];

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
                        <div className="p-3 bg-green-100 rounded-full">
                            <StepIcon className="w-6 h-6 text-green-600" />
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
