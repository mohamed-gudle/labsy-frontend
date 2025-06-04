'use client';

import { PrintableArea } from "@/app/base-products/_types/api";



interface PrintAreaSelectorProps {
  printAreas: PrintableArea[];
  currentPrintAreaIndex: number;
  onPrintAreaChange: (index: number) => void;
}

export const PrintAreaSelector = ({
  printAreas,
  currentPrintAreaIndex,
  onPrintAreaChange,
}: PrintAreaSelectorProps) => {
  if (!printAreas || printAreas.length <= 1) {
    return null;
  }

  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium mb-3">Select Print Area</h3>
      <div className="flex gap-2 flex-wrap">
        {printAreas.map((area, index) => (
          <button
            key={index}
            className={`px-3 py-2 rounded-full text-sm font-medium border transition-colors ${
              currentPrintAreaIndex === index
                ? 'bg-black text-white border-black'
                : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
            }`}
            onClick={() => onPrintAreaChange(index)}
          >
            {area.name || `Area ${index + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
};