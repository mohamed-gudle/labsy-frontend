// src/app/dashboard/layout.tsx

import React, { Suspense } from "react";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { Home, User, Settings, LogOut } from "lucide-react";
import { AuthProvider } from "@/components/context/auth-context";
import { AuthGuard } from "@/components/auth-guard/auth-guard";

interface DashboardLayoutProps {
    children: ReactNode;
}

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-4 py-3 border-b bg-white dark:bg-zinc-950 dark:border-zinc-800">
            <div className="flex items-center">
                {/* Mobile sidebar trigger is inside Sidebar component */}
                <span className="font-semibold text-xl">Dashboard</span>
            </div>
            {/* User menu, can be added here if needed */}
        </header>
    );
};

const menuItems: Array<{
    label: string;
    href?: string;
    icon?: ReactNode;
    children?: Array<{ label: string; href: string; icon?: ReactNode }>;
}> = [
        { label: "Home", href: "/dashboard", icon: <Home /> },
        { label: "Profile", href: "/dashboard/profile", icon: <User /> },
        { label: "Settings", href: "/dashboard/settings", icon: <Settings /> },
        { label: "Logout", href: "/logout", icon: <LogOut /> },
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
                    <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
                        <Sidebar menuItems={menuItems} />
                        <div className="flex-1 flex flex-col">
                            <Header />
                            <main className="flex-1 p-4 overflow-y-auto">
                                {children}
                            </main>
                        </div>
                    </div>
                </AuthGuard>
            </Suspense>
        </AuthProvider>
    );
};

export default DashboardLayout;
