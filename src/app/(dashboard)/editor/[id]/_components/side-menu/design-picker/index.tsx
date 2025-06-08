import React from "react";
import { Card } from "@/components/ui/card";
import { Image as ImageIcon } from "lucide-react";
import type { Design } from "./types";

interface DesignPickerProps {
    designs: Design[];
    onDesignSelect?: (design: Design) => void;
}

export const DesignPicker: React.FC<DesignPickerProps> = ({ designs, onDesignSelect }) => {
    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, design: Design) => {
        e.dataTransfer.setData("application/json", JSON.stringify(design));
        e.dataTransfer.effectAllowed = "copy";
    };

    return (
        <div className="mb-8">
            <h3 className="text-sm font-medium mb-3">Select a design</h3>
            <p className="text-xs text-gray-500 mb-3">Drag a design onto the canvas</p>
            {designs.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-24 text-gray-400">
                    <ImageIcon className="w-8 h-8 mb-2" />
                    <span className="text-xs">No designs uploaded</span>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-2">
                    {designs.map((design) => (
                        <Card
                            key={design.id}
                            className="p-1 flex items-center justify-center cursor-grab hover:shadow-lg transition border border-gray-200"
                            draggable
                            onDragStart={(e) => handleDragStart(e, design)}
                            onClick={() => onDesignSelect?.(design)}
                            title={design.name}
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
