"use client";

import React from "react";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import { Design } from "@/lib/types/designs";

interface DesignPickerProps {
    designs: Design[];
    onDesignSelect?: (design: Design) => void;
    title?: string;
    subtitle?: string;
    emptyMessage?: string;
    gridCols?: 2 | 3 | 4;
    className?: string;
}

/**
 * Design picker component
 * Displays a grid of available designs for selection
 */
export const DesignPicker: React.FC<DesignPickerProps> = ({
    designs,
    onDesignSelect,
    title = "Select a design",
    subtitle = "Click a design to add it to the canvas",
    emptyMessage = "No designs uploaded",
    gridCols = 3,
    className = ""
}) => {
    const gridClassName = {
        2: "grid-cols-2",
        3: "grid-cols-3",
        4: "grid-cols-4"
    }[gridCols];

    return (
        <div className={`mb-8 ${className}`}>
            <h3 className="text-sm font-medium mb-3">{title}</h3>
            <p className="text-xs text-gray-500 mb-3">{subtitle}</p>
            {designs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs">{emptyMessage}</span>
                </div>
            ) : (
                <div className={`grid ${gridClassName} gap-2`}>
                    {designs.map((design) => (
                        <Card
                            key={design.id}
                            className="p-1 flex items-center justify-center cursor-pointer hover:shadow-lg transition border border-gray-200 hover:border-gray-300"
                            onClick={() => onDesignSelect?.(design)}
                            title={design.name}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onDesignSelect?.(design);
                                }
                            }}
                        >
                            <img
                                src={design.imageUrl}
                                alt={design.name}
                                className="w-16 h-16 object-contain rounded"
                                loading="lazy"
                                width={64}
                                height={64}
                            />
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};
