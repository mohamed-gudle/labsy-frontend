"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import useSWRMutation from "swr/mutation";
import {
  OnboardingWizard,
  CreatorOnboardingForm,
} from "@/components/onboarding";
import { CreatorOnboardingData } from "@/lib/types/onboarding";
import { registerCreator } from "@/lib/api/onboarding";
import { useAuth } from "@/context/auth-context";

export default function CreatorOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<CreatorOnboardingData>>({});

  // SWR mutation for creator registration
  const { trigger: registerCreatorMutation, isMutating } = useSWRMutation(
    "/auth/register/creator",
    registerCreator
  );

  const steps = [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Tell us about yourself",
      completed: currentStep > 0,
      active: currentStep === 0,
    },
    {
      id: "business-details",
      title: "Business Details",
      description: "Share your business information",
      completed: currentStep > 1,
      active: currentStep === 1,
    },
  ];

  const handleStepComplete = (stepData: Partial<CreatorOnboardingData>) => {
    setFormData((prev) => ({ ...prev, ...stepData }));

    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleOnboardingComplete({ ...formData });
    }
  };

  const handleOnboardingComplete = async (
    finalData: Partial<CreatorOnboardingData>
  ) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Prepare complete onboarding data for single submission
      const completeOnboardingData = {
        ...finalData.personalInfo,
        ...finalData.businessInfo,
      };

      // Single submission using SWR mutation - no intermediate calls
      const result = await registerCreatorMutation(completeOnboardingData);

      if (result?.success) {
        console.log("Creator onboarding completed successfully:", result.data);
        // Redirect to dashboard after successful submission
        router.push("/dashboard");
      } else {
        console.error(
          "Failed to complete onboarding:",
          result?.message ?? "Unknown error"
        );
        // Handle error - could show toast notification
      }
    } catch (error) {
      console.error("Error completing onboarding:", error);
      // Handle error state - could show error message to user
    }
  };

  const handleStepBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      router.push("/onboarding");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <OnboardingWizard
        steps={steps}
        currentStep={currentStep}
        onStepBack={handleStepBack}
      >
        <CreatorOnboardingForm
          currentStep={currentStep}
          data={formData}
          onStepComplete={handleStepComplete}
          onBack={handleStepBack}
          isSubmitting={isMutating}
        />
      </OnboardingWizard>
    </div>
  );
}
