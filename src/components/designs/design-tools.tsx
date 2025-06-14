"use client";

import { DesignToolsDialog } from "./design-tools-dialog";

interface DesignToolsProps {
    className?: string;
}

/**
 * Design tools component
 * Container for design-related tools and actions
 */
export const DesignTools = ({ className = "" }: DesignToolsProps) => {
    return (
        <div className={`flex gap-4 mb-8 ${className}`}>
            <DesignToolsDialog />
        </div>
    );
};
