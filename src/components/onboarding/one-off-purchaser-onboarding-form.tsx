"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { oneOffPurchaserPersonalInfoSchema } from "@/lib/schemas/onboarding";
import { OneOffPurchaserOnboardingData } from "@/lib/types/onboarding";
import { cn } from "@/lib/utils";

interface OneOffPurchaserOnboardingFormProps {

  initialData?: Partial<OneOffPurchaserOnboardingData>;

  onSubmit: (data: any) => void;

  onBack?: () => void;

  loading?: boolean;

  className?: string;
}

export function OneOffPurchaserOnboardingForm({
  initialData,
  onSubmit,
  onBack,
  loading = false,
  className,
}: Readonly<OneOffPurchaserOnboardingFormProps>) {
  const [submitError, setSubmitError] = useState<string | null>(null);

  const personalInfoForm = useForm({
    resolver: zodResolver(oneOffPurchaserPersonalInfoSchema),
    defaultValues: {
      name: initialData?.name ?? "",
      phone: initialData?.phone ?? "",
      location: initialData?.location ?? "",
    },
  });

  const handlePersonalInfoSubmit = async () => {
    setSubmitError(null);
    try {
      const personalInfoData = personalInfoForm.getValues();
      console.log("Personal Info Data:", personalInfoData);
      onSubmit(personalInfoData);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Card className="border-0 shadow-none">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-xl font-semibold">
            Personal Information
          </CardTitle>
          <CardDescription>
            Tell us a bit about yourself so we can create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={personalInfoForm.handleSubmit(handlePersonalInfoSubmit)}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="name">Full Name *</Label>
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
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number (Optional)</Label>
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
              <div className="space-y-2 w-full">
                <Label htmlFor="location">Location (Optional)</Label>
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
            </div>
            {submitError && <div className="text-sm  mt-2">{submitError}</div>}
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between pt-6 space-y-3 md:space-y-0">
              <Button
                type="button"
                variant="outline"
                onClick={onBack}
                disabled={loading}
                className="w-full md:w-auto order-2 md:order-1"
              >
                Back
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full md:w-auto order-1 md:order-2 "
              >
                Complete Setup
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
