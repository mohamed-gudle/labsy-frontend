"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
    const router = useRouter();
    const { user, loading, isAuthenticated } = useAuth();

    useEffect(() => {
        if (loading) return;
        if (!user && isAuthenticated) {
            router.replace("/onboarding");
            return;
        }
        if (!user) return;
        const role = (user as { role?: string })?.role;
        if (role === "admin") {
            router.replace("/dashboard/admin");
        } else if (role === "creator") {
            router.replace("/base-products");
        } else if (role === "factory") {
            router.replace("/dashboard/factory");
        }
    }, [user, loading, isAuthenticated, router]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="animate-spin w-8 h-8 text-primary">Loading...</span>
            </div>
        );
    }

    return null;
}