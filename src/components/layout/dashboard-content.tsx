"use client";

import { Sidebar } from "./sidebar";
import { useSidebar } from "@/lib/contexts/layout";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import type { SidebarMenuItem } from "./sidebar";

interface DashboardContentProps {
    children: ReactNode;
    menuItems: SidebarMenuItem[];
}

export function DashboardContent({ children, menuItems }: DashboardContentProps) {
    const { collapsed } = useSidebar();

    return (
        <div className="flex min-h-screen bg-zinc-50 dark:bg-zinc-950">
            <Sidebar menuItems={menuItems} />
            <div
                className={cn(
                    "flex-1 flex flex-col transition-all duration-200",
                    "md:ml-64", // Default width when not collapsed
                    collapsed && "md:ml-20" // Collapsed width
                )}
            >
                <main className="flex-1 p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
