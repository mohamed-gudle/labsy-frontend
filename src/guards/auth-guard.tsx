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
  const { user, loading, isAuthenticated } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isOnboardingPage = pathname.startsWith("/onboarding");

  useEffect(() => {
    if (loading) return;

    if (mode === "protected" && !isAuthenticated) {
      router.replace("/sign-in");
    } else if (
      mode === "public" &&
      isAuthenticated &&
      user
    ) {
      router.replace("/");
    } else if (
      mode === "public" &&
      !isAuthenticated 
    ) {
      console.warn("fasdf");
      router.replace("/sign-in");
    }
   
  }, [user, loading, mode, router, isAuthenticated, pathname, isOnboardingPage]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="animate-spin w-8 h-8 text-primary" />
      </div>
    );
  }

  if (mode === "protected" && !user) return null;
  if (mode === "public" && user && !isOnboardingPage) return null;

  return <>{children}</>;
}
