"use client";

import { PrintableArea } from "@/app/base-products/_types/api";
import { ColorPicker } from "./color-picker";
import { DesignTools } from "./design-tools";
import { PricingSection } from "./pricing-section";
import { PrintAreaSelector } from "./print-area-selector";

export interface SideMenuProps {
  colors: string[];
  printAreas: PrintableArea[];
  currentPrintAreaIndex: number;
  selectedColor: string;
  onColorChange: (color: string) => void;
  onPrintAreaChange: (index: number) => void;
}

export const SideMenu = ({
  colors,
  printAreas,
  currentPrintAreaIndex,
  selectedColor,
  onColorChange,
  onPrintAreaChange,
}: SideMenuProps) => {
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

      <PricingSection />

      {/* Advanced section */}
      <details className="mb-4">
        <summary className="cursor-pointer text-sm font-medium">
          Advanced
        </summary>
        <div className="mt-4 p-4 bg-gray-50 rounded">
          {/* Advanced options would go here */}
          <p className="text-xs text-gray-500">
            Advanced settings coming soon...
          </p>
        </div>
      </details>
    </div>
  );
};
