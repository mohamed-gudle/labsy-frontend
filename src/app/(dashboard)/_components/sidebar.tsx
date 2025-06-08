"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/auth-context";
import { useSidebar } from "../_context/sidebar-context";

import {
    ChevronRight,
    CreditCard,
    FileText,
    Home,
    LogOut,
    Menu,
    Settings,
    User,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Button } from "../../../components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "../../../components/ui/sheet";
import { cn } from "../../../lib/utils";

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
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: <Home className="h-5 w-5" />,
    },
    {
        label: "Example",
        href: "/dashboard/example",
        icon: <FileText className="h-5 w-5" />,
    },
];

function renderMenuItem(
    item: SidebarMenuItem,
    collapsed: boolean,
    pathname: string
) {
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
                        {!collapsed && (
                            <span className="flex-1 text-left">{item.label}</span>
                        )}
                        {!collapsed && (
                            <ChevronRight className="ml-auto h-4 w-4 opacity-70" />
                        )}
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

export function Sidebar({
    className,
    menuItems = defaultMenuItems,
}: Readonly<SidebarProps>) {
    const { user, signOut } = useAuth();
    const { collapsed, setCollapsed, mobileOpen, setMobileOpen } = useSidebar();
    const pathname = usePathname();

    const userMenu = (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className={cn(
                        "w-full flex items-center gap-3 px-4 py-3 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-900",
                        collapsed ? "justify-center" : "justify-start"
                    )}
                >
                    <Avatar>
                        <AvatarImage
                            src={user?.photoURL || ""}
                            alt={user?.displayName || ""}
                            className="h-10 w-10 border border-zinc-300 dark:border-zinc-700 rounded-full"
                        />
                    </Avatar>
                    {!collapsed && (
                        <div className="flex flex-col items-start min-w-0">
                            <span className="font-medium text-base truncate">
                                {user?.displayName}
                            </span>
                            <span className="text-xs text-zinc-500 truncate">
                                {user?.email}
                            </span>
                        </div>
                    )}
                </Button>
            </DropdownMenuTrigger>
            {!collapsed && (
                <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem asChild>
                        <a href="/dashboard/profile" className="flex items-center gap-2">
                            <User className="h-4 w-4" /> Profile
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="/dashboard/settings" className="flex items-center gap-2">
                            <Settings className="h-4 w-4" /> Settings
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                        <a href="/dashboard/subscription" className="flex items-center gap-2">
                            <CreditCard className="h-4 w-4" /> Subscription
                        </a>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        onClick={signOut}
                        className="text-red-600 focus:text-red-600"
                    >
                        <LogOut className="h-4 w-4" /> Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            )}
        </DropdownMenu>
    );

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
                    "hidden md:flex flex-col fixed left-0 top-0 h-screen bg-white dark:bg-zinc-950 border-r transition-all duration-200 z-10",
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
                        onClick={() => setCollapsed(!collapsed)}
                    >
                        <span className="sr-only">Toggle sidebar</span>
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
                <nav className="flex-1 flex flex-col gap-1 mt-2">
                    {menuItems.map((item) => renderMenuItem(item, collapsed, pathname))}
                </nav>
                {/* User menu anchored at the bottom */}
                <div className="mt-auto p-4 border-t">{userMenu}</div>
            </aside>
        </>
    );
}
