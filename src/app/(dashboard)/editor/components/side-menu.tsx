import React, { useState } from 'react';
import AddDesigns from './add-designs';
import ChooseColors from './choose-colors';

const SideMenu: React.FC = () => {
    const [selectedColors, setSelectedColors] = useState<string[]>([]);

    const handleColorSelectionChange = (colors: string[]) => {
        setSelectedColors(colors);
    };

    return (
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 space-y-6 h-full">
            <h2 className="text-xl font-semibold">Design Your Product</h2>

            {/* Add Designs Section */}
            <section>
                <AddDesigns />
            </section>

            {/* Choose Colors Section */}
            <section>
                <ChooseColors
                    colors={["#000000", "#FFFbFF", "#FF0000", "#00FF00", "#0000FF"]}
                    onSelectionChange={handleColorSelectionChange}
                />
            </section>

            {/* Selected Colors Display */}
            <section>
                <h3 className="text-lg font-medium mb-2">Selected Colors</h3>
                <div className="flex flex-wrap gap-2">
                    {selectedColors.map((color) => (
                        <div
                            key={color}
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
};

export default SideMenu;