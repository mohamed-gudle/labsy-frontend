"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

/**
 * Context for managing sidebar state in the dashboard layout
 * Handles both desktop collapsed state and mobile open state
 */
interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  toggleCollapsed: () => void;
  toggleMobileOpen: () => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Provider component for sidebar context
 * Manages sidebar state for both desktop and mobile layouts
 */
export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };
  const toggleMobileOpen = () => {
    setMobileOpen((prev) => !prev);
  };

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        mobileOpen,
        setMobileOpen,
        toggleCollapsed,
        toggleMobileOpen,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
}

/**
 * Hook to access sidebar context
 * Must be used within SidebarProvider
 */
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
}
