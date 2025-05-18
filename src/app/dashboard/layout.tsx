// src/app/dashboard/layout.tsx

import React from "react";
import type { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";

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

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <Header />
                <main className="flex-1 p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
