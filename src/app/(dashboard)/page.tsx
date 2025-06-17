"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";

export default function DashboardPage() {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    const role = (user as { role?: string })?.role;
    if (role === "admin") {
      router.replace("/dashboard/admin");
    } else if (role === "creator") {
      router.replace("/base-products");
    } else if (role === "factory") {
      router.replace("/dashboard/factory");
    } else {
      router.replace("/dashboard/user");
    }
  }, [user, router]);

  return null;
}