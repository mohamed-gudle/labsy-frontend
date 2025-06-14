"use client";

import { PrintableArea } from "@/lib/types/base-products";

interface PrintAreaSelectorProps {
    printAreas: PrintableArea[];
    currentPrintAreaIndex: number;
    onPrintAreaChange: (index: number) => void;
    title?: string;
}

/**
 * Print area selector component
 * Allows users to switch between different printable areas on a product
 */
export const PrintAreaSelector = ({
    printAreas,
    currentPrintAreaIndex,
    onPrintAreaChange,
    title = "Select Print Area"
}: PrintAreaSelectorProps) => {
    if (!printAreas || printAreas.length <= 1) {
        return null;
    }

    return (
        <div className="mb-6">
            <h3 className="text-sm font-medium mb-3">{title}</h3>
            <div className="flex gap-2 flex-wrap">
                {printAreas.map((area, index) => (
                    <button
                        key={index}
                        className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${currentPrintAreaIndex === index
                                ? 'bg-black text-white border-black'
                                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                            }`}
                        onClick={() => onPrintAreaChange(index)}
                        aria-label={`Select ${area.name || `Area ${index + 1}`}`}
                    >
                        {area.name || `Area ${index + 1}`}
                    </button>
                ))}
            </div>
        </div>
    );
};
