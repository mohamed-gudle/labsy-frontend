"use client";

import { useAuth } from "@/context/auth-context";
import { Loader2 } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";
import React, { useEffect } from "react";

interface AuthGuardProps {
  readonly children: React.ReactNode;
  readonly mode: "protected" | "public";
}

export function AuthGuard({ children, mode }: AuthGuardProps) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Check if current path is onboarding-related
  const isOnboardingRoute = pathname.startsWith('/onboarding');

  useEffect(() => {
    if (!loading) {
      if (mode === "protected" && !user) {
        router.replace("/sign-in");
      } else if (mode === "public" && user && !isOnboardingRoute) {
        // Allow authenticated users on onboarding routes
        router.replace("/");
      }
    }
  }, [user, loading, mode, router, isOnboardingRoute]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (mode === "protected" && !user) return null;
  if (mode === "public" && user && !isOnboardingRoute) return null;

  return <>{children}</>;
}
