"use client";

import { PrintableArea } from "@/lib/types/base-products";
import { useUploadedDesigns } from "@/lib/contexts/designs";
import { ColorPicker } from "./color-picker";
import { DesignPicker } from "./design-picker";
import { DesignTools } from "./design-tools";
import { PrintAreaSelector } from "./print-area-selector";
import type { Design } from "./design-picker-types";

export interface SideMenuProps {
    colors: string[];
    printAreas: PrintableArea[];
    currentPrintAreaIndex: number;
    selectedColor: string;
    onColorChange: (color: string) => void;
    onPrintAreaChange: (index: number) => void;
    onDesignSelect: (design: Design) => void;
}

/**
 * Side menu component for the design editor
 * Contains tools for color selection, print area selection, and design management
 */
export const SideMenu = ({
    colors,
    printAreas,
    currentPrintAreaIndex,
    selectedColor,
    onColorChange,
    onPrintAreaChange,
    onDesignSelect,
}: SideMenuProps) => {
    const { designs: uploadedDesigns } = useUploadedDesigns();

    return (
        <div className="w-full h-full bg-white rounded-lg p-4 overflow-y-auto">
            <div className="mb-6 flex flex-col gap-2">
                <h2 className="text-md font-semibold">Design Editor</h2>
                <DesignTools />
            </div>

            <PrintAreaSelector
                printAreas={printAreas}
                currentPrintAreaIndex={currentPrintAreaIndex}
                onPrintAreaChange={onPrintAreaChange}
            />

            <ColorPicker
                colors={colors}
                selectedColor={selectedColor}
                onColorChange={onColorChange}
            />

            <DesignPicker
                designs={uploadedDesigns}
                onDesignSelect={onDesignSelect}
            />
        </div>
    );
};
