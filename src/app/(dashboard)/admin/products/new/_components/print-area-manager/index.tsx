"use client";

import React from "react";
import { ProductFormData, PrintableAreaInput } from "../../_types/admin-new";
import { PrintAreaList } from "./print-area-list";
import { MockupCanvas } from "../mockup-canvas";
import { PrintAreaSidebar } from "../print-area-sidebar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PrintAreaManagerProps {
  productData: Partial<ProductFormData>;
  currentEditingIndex: number;
  onChange: (data: Partial<ProductFormData>) => void;
  onEditingIndexChange: (index: number) => void;
  errors: Record<string, string>;
  onValidationError: (errors: Record<string, string>) => void;
}

export const PrintAreaManager: React.FC<PrintAreaManagerProps> = ({
  productData,
  currentEditingIndex,
  onChange,
  onEditingIndexChange,
  errors,
  onValidationError,
}) => {
  const printAreas = productData.print_areas || [];
  const currentPrintArea = currentEditingIndex >= 0 ? printAreas[currentEditingIndex] : null;
  const addNewPrintArea = () => {
    const newPrintArea: PrintableAreaInput = {
      name: `Print Area ${printAreas.length + 1}`,
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      dpi: 300,
      printable: true,
      description: "",
      mockup_file: new File([], "placeholder.jpg", { type: "image/jpeg" }),
    };    const newPrintAreas = [...printAreas, newPrintArea];
    onChange({ print_areas: newPrintAreas });
    onEditingIndexChange(newPrintAreas.length - 1);
  };

  const updatePrintArea = (index: number, updates: Partial<PrintableAreaInput>) => {
    const newPrintAreas = [...printAreas];
    newPrintAreas[index] = { ...newPrintAreas[index], ...updates };
    onChange({ print_areas: newPrintAreas });
  };

  const deletePrintArea = (index: number) => {
    const newPrintAreas = printAreas.filter((_, i) => i !== index);
    onChange({ print_areas: newPrintAreas });
    
    // Adjust editing index
    if (currentEditingIndex >= index) {
      const newIndex = Math.max(0, currentEditingIndex - 1);
      onEditingIndexChange(newPrintAreas.length > 0 ? newIndex : -1);
    }
  };
  const duplicatePrintArea = (index: number) => {
    const areaToDuplicate = printAreas[index];
    const duplicatedArea: PrintableAreaInput = {
      ...areaToDuplicate,
      name: `${areaToDuplicate.name} (Copy)`,
      mockup_file: new File([], "placeholder.jpg", { type: "image/jpeg" }), // Create new placeholder file
      mockup_url: areaToDuplicate.mockup_url,
    };

    const newPrintAreas = [...printAreas];
    newPrintAreas.splice(index + 1, 0, duplicatedArea);
    onChange({ print_areas: newPrintAreas });
    onEditingIndexChange(index + 1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Print Areas</h2>
          <p className="text-gray-600">Define printable areas on your product mockups</p>
        </div>
        <Button onClick={addNewPrintArea} className="flex items-center gap-2">
          <Plus size={16} />
          Add Print Area
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Print Areas List */}
        <div className="lg:col-span-1">
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-4">Print Areas ({printAreas.length})</h3>
            <PrintAreaList
              printAreas={printAreas}
              currentEditingIndex={currentEditingIndex}
              onSelect={onEditingIndexChange}
              onUpdate={updatePrintArea}
              onDelete={deletePrintArea}
              onDuplicate={duplicatePrintArea}
            />
          </Card>
        </div>

        {/* Main Canvas Area */}
        <div className="lg:col-span-2">
          {currentPrintArea ? (
            <MockupCanvas
              printArea={currentPrintArea}
              onPrintAreaUpdate={(updates) => 
                updatePrintArea(currentEditingIndex, updates)
              }
              errors={errors}
              onValidationError={onValidationError}
            />
          ) : (
            <Card className="p-8 text-center">
              <div className="text-gray-500">
                <Plus size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-semibold mb-2">No Print Area Selected</h3>
                <p className="mb-4">Select a print area from the list or add a new one to get started</p>
                <Button onClick={addNewPrintArea} variant="outline">
                  Add Your First Print Area
                </Button>
              </div>
            </Card>
          )}
        </div>

        {/* Print Area Details Sidebar */}
        <div className="lg:col-span-1">
          {currentPrintArea ? (
            <PrintAreaSidebar
              printArea={currentPrintArea}
              onUpdate={(updates) => updatePrintArea(currentEditingIndex, updates)}
              errors={errors}
              onValidationError={onValidationError}
            />
          ) : (
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Print Area Details</h3>
              <p className="text-gray-500 text-sm">
                Select a print area to view and edit its properties
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
