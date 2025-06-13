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
        <h1 className="text-xl font-bold text-gray-900 mb-2">Add New Product</h1>
        <p className="text-gray-600">Create a new base product with print areas for customization</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = state.currentStep === step.key;
            const isCompleted = index < currentStepIndex;
            let circleClass = '';
            if (isActive) {
              circleClass = 'bg-blue-600 border-blue-600 text-white';
            } else if (isCompleted) {
              circleClass = 'bg-green-600 border-green-600 text-white';
            } else {
              circleClass = 'bg-gray-100 border-gray-300 text-gray-400';
            }
            let textClass = '';
            if (isActive) {
              textClass = 'text-blue-600';
            } else if (isCompleted) {
              textClass = 'text-green-600';
            } else {
              textClass = 'text-gray-400';
            }
            const isStepEnabled = index <= currentStepIndex;
            return [
              <button
                key={step.key}
                type="button"
                onClick={() => isStepEnabled && goToStep(step.key)}
                disabled={!isStepEnabled}
                className={`flex flex-col items-center bg-transparent border-none outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed`}
                style={{ cursor: isStepEnabled ? 'pointer' : 'not-allowed' }}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${circleClass}`}>
                  <Icon size={20} />
                </div>
                <span className={`ml-2 text-sm font-medium ${textClass}`}>
                  {step.label}
                </span>
              </button>,
              index < STEPS.length - 1 && (
                <div
                  key={`connector-${index}`}
                  className={`flex-1 h-px mx-4 ${index < currentStepIndex ? 'bg-green-600' : 'bg-gray-300'}`}
                />
              )
            ];
          })}
        </div>
      </div>

      {/* Main Content - make form full width, remove sidebar */}
      <div className="w-full">
        <Card className="p-6 w-full">
          {state.currentStep === 'basic' && (
            <BasicProductForm
              data={state.productData}
              errors={state.validationErrors}
              onChange={updateProductData}
              onValidationError={setValidationErrors}
            />
          )}

          {state.currentStep === 'print-areas' && (
            // Use PrintAreaManager for the entire step (it already handles sidebar + canvas responsively)
            <PrintAreaManager
              productData={state.productData}
              currentEditingIndex={state.currentEditingAreaIndex}
              onChange={updateProductData}
              onEditingIndexChange={(index) => setState(prev => ({ ...prev, currentEditingAreaIndex: index }))}
              errors={state.validationErrors}
              onValidationError={setValidationErrors}
            />
          )}
          {state.currentStep === 'review' && state.productData && (
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
                const validation = await completeProductSchema.safeParseAsync(schemaData);
                if (!validation.success) {
                  console.error('Validation failed:', validation.error);
                  setState(prev => ({ ...prev, isSubmitting: false }));
                  return;
                }
                // Add actual upload logic here
                await new Promise(resolve => setTimeout(resolve, 2000));
                setState(prev => ({ ...prev, isSubmitting: false }));
                console.log(schemaData);
                console.log('Product submitted successfully!');
              }}
              onBack={goToPreviousStep}
            />
          )}

          {/* Navigation Buttons (moved below form for full width) */}
          <div className="flex flex-col md:flex-row gap-2 mt-8">
            {state.currentStep !== 'basic' && (
              <Button
                variant="outline"
                onClick={goToPreviousStep}
                className="w-full md:w-auto"
              >
                <ChevronLeft size={16} className="mr-2" />
                Previous
              </Button>
            )}
            {state.currentStep !== 'review' && (
              <Button
                onClick={goToNextStep}
                disabled={!canGoNext()}
                className="w-full md:w-auto"
              >
                Next
                <ChevronRight size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
