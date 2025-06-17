"use client";

import {
  OnboardingWizard,
  OneOffPurchaserOnboardingForm,
} from "@/components/onboarding";
import { useAuth } from "@/context/auth-context";
import { registerUser } from "@/lib/api/onboarding";
import { OneOffPurchaserOnboardingData } from "@/lib/types/onboarding";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWRMutation from "swr/mutation";

export default function OneOffPurchaserOnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<
    Partial<OneOffPurchaserOnboardingData>
  >({});

  // SWR mutation for creator registration
  const { trigger: registerMutation, isMutating } = useSWRMutation(
    "/auth/register/user",
    registerUser
  );

  const steps = [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Tell us about yourself",
      completed: currentStep > 0,
      active: currentStep === 0,
    },
  ];

  const handleOnboardingComplete = async (
    finalData: Partial<OneOffPurchaserOnboardingData>
  ) => {
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    try {
      // Prepare complete onboarding data for single submission
      const completeOnboardingData = {
        ...finalData,
      };

      // Single submission using SWR mutation - no intermediate calls
      const result = await registerMutation(completeOnboardingData);

      if (result?.success) {
        console.log("onboarding completed successfully:", result.user);
        // Redirect to dashboard after successful submission
        router.push("/");
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
      <OnboardingWizard steps={steps} currentStep={currentStep}>
        <OneOffPurchaserOnboardingForm
          initialData={formData}
          onSubmit={handleOnboardingComplete}
          onBack={handleStepBack}
          loading={isMutating}
        />
      </OnboardingWizard>
    </div>
  );
}
