'use client';

import React, { useState } from 'react';
import { ProductUploadState, ProductFormData } from './_types/admin-new';
import { BasicProductForm } from './_components/upload-form';
import { PrintAreaManager } from './_components/print-area-manager';
import { ReviewAndSubmit } from './_components/review-submit';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Package, Layers, CheckCircle } from 'lucide-react';
import { completeProductSchema, CompleteProductFormData } from './_form-schemas';

const STEPS = [
  { key: 'basic', label: 'Basic Info', icon: Package },
  { key: 'print-areas', label: 'Print Areas', icon: Layers },
  { key: 'review', label: 'Review', icon: CheckCircle },
] as const;

export default function NewProductPage() {
  const [state, setState] = useState<ProductUploadState>({
    productData: {
      colors: [],
      available_sizes: {},
      print_areas: [],
      base_cost: 0,
      print_cost_per_cm2: 0.05,
    },
    currentStep: 'basic',
    currentEditingAreaIndex: -1,
    uploadProgress: 0,
    validationErrors: {},
    isSubmitting: false,
  });

  const updateProductData = (data: Partial<ProductFormData>) => {
    setState(prev => ({
      ...prev,
      productData: { ...prev.productData, ...data },
      validationErrors: {}, // Clear errors when data changes
    }));
  };

  const setValidationErrors = (errors: Record<string, string>) => {
    setState(prev => ({ ...prev, validationErrors: errors }));
  };

  const goToStep = (step: typeof state.currentStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const goToNextStep = () => {
    const currentIndex = STEPS.findIndex(step => step.key === state.currentStep);
    if (currentIndex < STEPS.length - 1) {
      goToStep(STEPS[currentIndex + 1].key);
    }
  };

  const goToPreviousStep = () => {
    const currentIndex = STEPS.findIndex(step => step.key === state.currentStep);
    if (currentIndex > 0) {
      goToStep(STEPS[currentIndex - 1].key);
    }
  };

  const canGoNext = () => {
    switch (state.currentStep) {
      case 'basic':
        return state.productData.title && 
               state.productData.description && 
               state.productData.brand &&
               state.productData.main_image;
      case 'print-areas':
        return state.productData.print_areas && state.productData.print_areas.length > 0;
      default:
        return false;
    }
  };

  const currentStepIndex = STEPS.findIndex(step => step.key === state.currentStep);

  return (
    <div className="container mx-auto py-8 px-4 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Create a new base product with print areas for customization</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = state.currentStep === step.key;
            const isCompleted = index < currentStepIndex;
            
            return (
              <div key={step.key} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${isActive 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : isCompleted 
                      ? 'bg-green-600 border-green-600 text-white'
                      : 'bg-gray-100 border-gray-300 text-gray-400'
                  }
                `}>
                  <Icon size={20} />
                </div>
                <span className={`ml-2 text-sm font-medium ${
                  isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
                {index < STEPS.length - 1 && (
                  <div className={`w-12 h-px mx-4 ${
                    index < currentStepIndex ? 'bg-green-600' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            {state.currentStep === 'basic' && (
              <BasicProductForm
                data={state.productData}
                errors={state.validationErrors}
                onChange={updateProductData}
                onValidationError={setValidationErrors}
              />
            )}

            {state.currentStep === 'print-areas' && (
              <PrintAreaManager
                productData={state.productData}
                currentEditingIndex={state.currentEditingAreaIndex}
                onChange={updateProductData}
                onEditingIndexChange={(index) => 
                  setState(prev => ({ ...prev, currentEditingAreaIndex: index }))
                }
                errors={state.validationErrors}
                onValidationError={setValidationErrors}
              />
            )}            {state.currentStep === 'review' && state.productData && (
              <ReviewAndSubmit
                data={state.productData as CompleteProductFormData}
                onSubmit={async () => {
                  setState(prev => ({ ...prev, isSubmitting: true }));
                  
                  // Convert UI data to schema format
                  const schemaData: CompleteProductFormData = {
                    ...state.productData,
                    print_areas: state.productData.print_areas?.map(area => ({
                      name: area.name,
                      mockup_file: area.mockup_file,
                      x: area.x,
                      y: area.y,
                      width: area.width,
                      height: area.height,
                      dpi: area.dpi,
                      printable: area.printable,
                      description: area.description
                    })) || []
                  } as CompleteProductFormData;
                  
                  // Validate complete product data
                  const validation = completeProductSchema.safeParse(schemaData);
                  if (!validation.success) {
                    console.error('Validation failed:', validation.error);
                    setState(prev => ({ ...prev, isSubmitting: false }));
                    return;
                  }
                  
                  // Add actual upload logic here
                  await new Promise(resolve => setTimeout(resolve, 2000));
                  
                  setState(prev => ({ ...prev, isSubmitting: false }));
                  console.log('Product submitted successfully!');
                }}
                onBack={goToPreviousStep}
              />
            )}
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h3 className="text-lg font-semibold mb-4">Progress</h3>
            
            {/* Step Navigation */}
            <div className="space-y-3 mb-6">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isActive = state.currentStep === step.key;
                const isCompleted = index < currentStepIndex;
                
                return (
                  <button
                    key={step.key}
                    onClick={() => goToStep(step.key)}
                    disabled={index > currentStepIndex + 1}
                    className={`
                      w-full flex items-center p-3 rounded-lg text-left transition-colors
                      ${isActive 
                        ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                        : isCompleted
                          ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                          : 'bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100'
                      }
                      ${index > currentStepIndex + 1 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}
                  >
                    <Icon size={16} className="mr-3" />
                    <span className="text-sm font-medium">{step.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Buttons */}
            <div className="space-y-3">
              {state.currentStep !== 'basic' && (
                <Button
                  variant="outline"
                  onClick={goToPreviousStep}
                  className="w-full"
                >
                  <ChevronLeft size={16} className="mr-2" />
                  Previous
                </Button>
              )}

              {state.currentStep !== 'review' && (
                <Button
                  onClick={goToNextStep}
                  disabled={!canGoNext()}
                  className="w-full"
                >
                  Next
                  <ChevronRight size={16} className="ml-2" />
                </Button>
              )}
            </div>

            {/* Product Summary */}
            {state.productData.title && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-3">Product Summary</h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Title:</span> {state.productData.title}
                  </div>
                  {state.productData.brand && (
                    <div>
                      <span className="font-medium">Brand:</span> {state.productData.brand}
                    </div>
                  )}
                  {state.productData.print_areas && (
                    <div>
                      <span className="font-medium">Print Areas:</span> {state.productData.print_areas.length}
                    </div>
                  )}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
