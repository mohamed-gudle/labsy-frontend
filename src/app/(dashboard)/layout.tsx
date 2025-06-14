// src/app/dashboard/layout.tsx

import { AuthGuard } from "@/guards/auth-guard";
import { AuthProvider } from "@/context/auth-context";
import { SidebarProvider } from "@/lib/contexts/layout";
import { DashboardContent } from "@/components/layout/dashboard-content";
import { Settings, User } from "lucide-react";
import type { ReactNode } from "react";
import React, { Suspense } from "react";

interface DashboardLayoutProps {
    children: ReactNode;
}

const menuItems: Array<{
    label: string;
    href?: string;
    icon?: ReactNode;
    children?: Array<{ label: string; href: string; icon?: ReactNode }>;
}> = [
        { label: "Base Products", href: "/base-products", icon: <User /> },
        {
            label: "Admin",
            icon: <Settings />,
            children: [
                { label: "Add Product", href: "/admin/products/new", icon: <User /> },
                { label: "Manage Products", href: "/admin/products", icon: <Settings /> },
            ],
        },
    ];

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <AuthProvider>
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen"><span>Loading...</span></div>}>
                <AuthGuard mode="protected">
                    <SidebarProvider>
                        <DashboardContent menuItems={menuItems}>
                            {children}
                        </DashboardContent>
                    </SidebarProvider>
                </AuthGuard>
            </Suspense>
        </AuthProvider>
    );
};

export default DashboardLayout;
