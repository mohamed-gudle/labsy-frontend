"use client";

import React from "react";
import { PrintableAreaInput } from "@/lib/types/products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
    Edit2,
    Trash2,
    Copy,
    Image as ImageIcon,
    MapPin
} from "lucide-react";

interface PrintAreaListProps {
    printAreas: PrintableAreaInput[];
    currentEditingIndex: number;
    onSelect: (index: number) => void;
    onUpdate: (index: number, updates: Partial<PrintableAreaInput>) => void;
    onDelete: (index: number) => void;
    onDuplicate: (index: number) => void;
}

/**
 * Print area list component for managing multiple print areas
 * Displays a list of print areas with editing capabilities
 */
export const PrintAreaList: React.FC<PrintAreaListProps> = ({
    printAreas,
    currentEditingIndex,
    onSelect,
    onUpdate,
    onDelete,
    onDuplicate,
}) => {
    const handleNameChange = (index: number, name: string) => {
        onUpdate(index, { name });
    };

    if (printAreas.length === 0) {
        return (
            <div className="text-center py-8">
                <ImageIcon size={32} className="mx-auto text-gray-300 mb-3" />
                <p className="text-sm text-gray-500">No print areas yet</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {printAreas.map((area, index) => {
                const isActive = index === currentEditingIndex;
                const hasMockup = area.mockup_file || area.mockup_url;

                return (
                    <Card
                        key={index}
                        className={`p-3 cursor-pointer transition-all border-2 ${isActive
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                        onClick={() => onSelect(index)}
                    >
                        <div className="space-y-3">
                            {/* Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <MapPin size={16} className={isActive ? 'text-blue-600' : 'text-gray-400'} />
                                    <span className="text-sm font-medium text-gray-600">
                                        Area {index + 1}
                                    </span>
                                </div>
                                <div className="flex items-center gap-1">
                                    {hasMockup && (
                                        <div className="w-2 h-2 bg-green-500 rounded-full" title="Has mockup" />
                                    )}
                                </div>
                            </div>

                            {/* Name Input */}
                            <Input
                                value={area.name}
                                onChange={(e) => handleNameChange(index, e.target.value)}
                                onClick={(e) => e.stopPropagation()}
                                placeholder="Print area name"
                                className="text-sm"
                            />

                            {/* Mockup Status */}
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                <ImageIcon size={12} />
                                {hasMockup ? (
                                    <span className="text-green-600">Mockup uploaded</span>
                                ) : (
                                    <span className="text-orange-600">No mockup</span>
                                )}
                            </div>

                            {/* Coordinates Display */}
                            <div className="text-xs text-gray-500 space-y-1">
                                <div className="grid grid-cols-2 gap-2">
                                    <span>X: {Math.round(area.x)}px</span>
                                    <span>Y: {Math.round(area.y)}px</span>
                                    <span>W: {Math.round(area.width)}px</span>
                                    <span>H: {Math.round(area.height)}px</span>
                                </div>
                                <div>DPI: {area.dpi}</div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center gap-1">
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onSelect(index);
                                    }}
                                    className="flex-1 text-xs h-7"
                                >
                                    <Edit2 size={12} className="mr-1" />
                                    Edit
                                </Button>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDuplicate(index);
                                    }}
                                    className="h-7 px-2"
                                    title="Duplicate"
                                >
                                    <Copy size={12} />
                                </Button>

                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        if (confirm('Are you sure you want to delete this print area?')) {
                                            onDelete(index);
                                        }
                                    }}
                                    className="h-7 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                    title="Delete"
                                >
                                    <Trash2 size={12} />
                                </Button>
                            </div>
                        </div>
                    </Card>
                );
            })}
        </div>
    );
};
