"use client";

import { getColorName } from "@/utils/designs";

interface ColorPickerProps {
    colors: string[];
    selectedColor: string;
    onColorChange: (color: string) => void;
    title?: string;
    subtitle?: string;
    maxColors?: number;
}

/**
 * Color picker component for product customization
 * Allows users to select from available product colors
 */
export const ColorPicker = ({
    colors,
    selectedColor,
    onColorChange,
    title = "Choose product colors",
    subtitle = "Select up to 5 backgrounds for your product",
    maxColors = 5
}: ColorPickerProps) => {
    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">{title}</h3>
            <p className="text-xs text-gray-500 mb-3">
                {subtitle.replace('5', maxColors.toString())}
            </p>
            <div className="flex gap-2 flex-wrap">
                {colors.map((color) => (
                    <button
                        key={getColorName(color)}
                        className={`w-8 h-8 rounded-full border-2 transition-all ${selectedColor === color
                            ? 'border-gray-600 ring-2 ring-gray-300'
                            : 'border-gray-300 hover:border-gray-400'
                            }`}
                        style={{ backgroundColor: color }}
                        onClick={() => onColorChange(color)}
                        title={getColorName(color)}
                        aria-label={`Select ${getColorName(color)} color`}
                    />
                ))}
            </div>
        </div>
    );
};
