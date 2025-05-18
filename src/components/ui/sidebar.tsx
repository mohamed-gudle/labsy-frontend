"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, FileText } from "lucide-react";

export interface SidebarProps {
    className?: string;
    menuItems?: Array<{
        label: string;
        href: string;
        icon: React.ReactNode;
    }>;
}

const defaultMenuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "Example", href: "/dashboard/example", icon: <FileText className="h-5 w-5" /> },
];

export function Sidebar({ className, menuItems = defaultMenuItems }: SidebarProps) {
    const [collapsed, setCollapsed] = React.useState(false);
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const pathname = usePathname();

    return (
        <>
            {/* Mobile Hamburger */}
            <div className="md:hidden p-2">
                <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Open sidebar"
                            onClick={() => setMobileOpen(true)}
                        >
                            <Menu className="h-6 w-6" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="p-0 w-64">
                        <nav className="h-full flex flex-col bg-white dark:bg-zinc-950 border-r">
                            {menuItems.map((item) => (
                                <Link
                                    key={item.label}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 px-6 py-4 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-base font-medium",
                                        pathname === item.href && "bg-zinc-100 dark:bg-zinc-900 font-bold"
                                    )}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
            {/* Desktop Sidebar */}
            <aside
                className={cn(
                    "hidden md:flex flex-col h-screen bg-white dark:bg-zinc-950 border-r transition-all duration-200",
                    collapsed ? "w-20" : "w-64",
                    className
                )}
            >
                <div className="flex items-center justify-between h-16 px-4 border-b">
                    <span className="font-bold text-lg">{!collapsed && "Labsy"}</span>
                    <Button
                        variant="ghost"
                        size="icon"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                        onClick={() => setCollapsed((c) => !c)}
                    >
                        <span className="sr-only">Toggle sidebar</span>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <nav className="flex-1 flex flex-col gap-1 mt-2">
                    {menuItems.map((item) => (
                        <Link
                            key={item.label}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-base font-medium transition-colors",
                                collapsed && "justify-center px-2",
                                pathname === item.href && "bg-zinc-100 dark:bg-zinc-900 font-bold"
                            )}
                        >
                            {item.icon}
                            {!collapsed && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>
            </aside>
        </>
    );
}
