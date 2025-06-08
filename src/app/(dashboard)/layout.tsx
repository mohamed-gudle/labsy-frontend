// src/app/dashboard/layout.tsx

import { AuthGuard } from "@/guards/auth-guard";
import { AuthProvider } from "@/context/auth-context";
import { SidebarProvider } from "./_context/sidebar-context";
import { DashboardContent } from "./_components/dashboard-content";
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
        { label: "Example", href: "/dashboard/example", icon: <User /> },
        {
            label: "More",
            icon: <Settings />, // Example icon
            children: [
                { label: "Subitem 1", href: "/dashboard/more/subitem1", icon: <User /> },
                { label: "Subitem 2", href: "/dashboard/more/subitem2", icon: <Settings /> },
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
