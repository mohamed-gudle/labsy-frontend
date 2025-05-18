"use client";

import * as React from "react";
import { Sheet, SheetContent, SheetTrigger } from "./sheet";
import { Button } from "./button";
import { cn } from "../../lib/utils";
import { Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, FileText, ChevronRight } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSub,
    DropdownMenuSubTrigger,
    DropdownMenuSubContent,
} from "./dropdown-menu";

export interface SidebarMenuItem {
    label: string;
    href?: string;
    icon?: React.ReactNode;
    children?: SidebarMenuItem[];
}

export interface SidebarProps {
    className?: string;
    menuItems?: SidebarMenuItem[];
}

const defaultMenuItems = [
    { label: "Dashboard", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
    { label: "Example", href: "/dashboard/example", icon: <FileText className="h-5 w-5" /> },
];

function renderMenuItem(item: SidebarMenuItem, collapsed: boolean, pathname: string) {
    if (item.children && item.children.length > 0) {
        // Dropdown menu item
        return (
            <DropdownMenu key={item.label}>
                <DropdownMenuTrigger asChild>
                    <button
                        className={cn(
                            "flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-base font-medium transition-colors w-full text-left",
                            collapsed && "justify-center px-2"
                        )}
                        type="button"
                    >
                        {item.icon}
                        {!collapsed && <span className="flex-1 text-left">{item.label}</span>}
                        {!collapsed && <ChevronRight className="ml-auto h-4 w-4 opacity-70" />}
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent side="right" align="start">
                    {item.children.map((child) => (
                        <DropdownMenuItem asChild key={child.label}>
                            <Link
                                href={child.href ?? "#"}
                                className={cn(
                                    "flex items-center gap-2 w-full",
                                    pathname === child.href && "font-bold"
                                )}
                            >
                                {child.icon}
                                <span>{child.label}</span>
                            </Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        );
    }
    // Regular menu item
    return (
        <Link
            key={item.label}
            href={item.href ?? "#"}
            className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900 text-base font-medium transition-colors",
                collapsed && "justify-center px-2",
                pathname === item.href && "bg-zinc-100 dark:bg-zinc-900 font-bold"
            )}
        >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
        </Link>
    );
}

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
                            {menuItems.map((item) => renderMenuItem(item, false, pathname))}
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
                    {menuItems.map((item) => renderMenuItem(item, collapsed, pathname))}
                </nav>
            </aside>
        </>
    );
}
