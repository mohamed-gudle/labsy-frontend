import React, { useState } from 'react';

interface ChooseColorsProps {
  colors: string[]; // Array of hex color codes
  onSelectionChange?: (selectedColors: string[]) => void;
}

export const ChooseColors: React.FC<ChooseColorsProps> = ({ colors, onSelectionChange }) => {
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleColorClick = (color: string) => {
    setSelectedColors((prev) => {
      if (prev.includes(color)) {
        const updated = prev.filter((c) => c !== color);
        onSelectionChange?.(updated);
        return updated;
      }
      if (prev.length < 5) {
        const updated = [...prev, color];
        onSelectionChange?.(updated);
        return updated;
      }
      return prev;
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Choose product colors</h3>
      <div className="flex flex-wrap gap-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-10 h-10 rounded-full border-2 ${
              selectedColors.includes(color) ? 'border-black' : 'border-transparent'
            }`}
            style={{ backgroundColor: color }}
            onClick={() => handleColorClick(color)}
            aria-label={`Select color ${color}`}
          />
        ))}
      </div>
      <p className="text-sm text-gray-500">You can select up to 5 colors.</p>
    </div>
  );
};

export default ChooseColors;