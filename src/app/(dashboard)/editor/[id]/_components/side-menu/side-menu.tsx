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
      <h2 className="text-lg font-semibold mb-4">Design your product</h2>
      <p className="text-sm text-gray-500 mb-6">Max file size of 50MB</p>

      <PrintAreaSelector
        printAreas={printAreas}
        currentPrintAreaIndex={currentPrintAreaIndex}
        onPrintAreaChange={onPrintAreaChange}
      />

      <DesignTools />

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
