"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Design } from "@/lib/types/designs";

/**
 * Context for managing uploaded designs in the design editor
 * Provides state for designs that users have uploaded for use in their projects
 */
interface UploadedDesignsContextProps {
    designs: Design[];
    addDesign: (design: Design) => void;
    removeDesign: (designId: string) => void;
    clearDesigns: () => void;
}

const UploadedDesignsContext = createContext<UploadedDesignsContextProps | undefined>(undefined);

/**
 * Provider component for uploaded designs context
 * Manages the list of designs that users have uploaded for use in the editor
 */
export const UploadedDesignsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [designs, setDesigns] = useState<Design[]>([]);

    const addDesign = (design: Design) => {
        setDesigns((prev) => [...prev, design]);
    };

    const removeDesign = (designId: string) => {
        setDesigns((prev) => prev.filter(design => design.id !== designId));
    };    const clearDesigns = () => {
        setDesigns([]);
    };

    return (
        <UploadedDesignsContext.Provider 
            value={{
                designs,
                addDesign,
                removeDesign,
                clearDesigns
            }}
        >
            {children}
        </UploadedDesignsContext.Provider>
    );
};

/**
 * Hook to access uploaded designs context
 * Must be used within UploadedDesignsProvider
 */
export const useUploadedDesigns = () => {
    const ctx = useContext(UploadedDesignsContext);
    if (!ctx) {
        throw new Error("useUploadedDesigns must be used within UploadedDesignsProvider");
    }
    return ctx;
};
