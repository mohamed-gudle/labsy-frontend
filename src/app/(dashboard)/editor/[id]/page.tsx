"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useBaseProduct } from "../../base-products/_lib/api";

import { UploadedDesignsProvider } from "./_components/side-menu/_utils/uploaded-designs-context";

import { DesignCanvas } from "./_components/design-canvas/design-canva";
import { SideMenu } from "./_components/side-menu/side-menu";
import { useDesignStates } from "./_hooks/use-design-states";
import type { Design } from "./_components/side-menu/design-picker/types";

export default function DesignPage() {
  const { id } = useParams<{ id: string }>();
  const { product, isLoading, error } = useBaseProduct(id);

  // Design state management with persistence across print areas
  const {
    currentPrintAreaIndex,
    currentDesigns,
    currentPrintArea,
    addDesign,
    updateDesign,
    switchPrintArea,
  } = useDesignStates(product?.print_areas);

  // Color state
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");

  // Initialize color when product loads
  useEffect(() => {
    if (product?.colors?.[0]) {
      setSelectedColor(product.colors[0]);
    }
  }, [product?.colors]);

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <p>Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-red-500">
          <p>Error loading product: {error.message}</p>
        </div>
      </div>
    );
  }

  if (!product || !product.print_areas || product.print_areas.length === 0) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center text-gray-500">
          <p>No product or print areas found</p>
        </div>
      </div>
    );
  }

  // Handler for when a design is selected from the DesignPicker
  const handleDesignSelect = (design: Design) => {
    if (!currentPrintArea) return;

    // Center the design in the current print area
    const centerX = currentPrintArea.x + currentPrintArea.width / 2 - 50;
    const centerY = currentPrintArea.y + currentPrintArea.height / 2 - 50;

    addDesign({
      id: design.id,
      name: design.name,
      imageUrl: design.imageUrl,
      position: { x: centerX, y: centerY },
      scale: { x: 1, y: 1 },
      rotation: 0,
      isSelected: true,
    });
  };

  return (
    <UploadedDesignsProvider>
      <div className="flex flex-col lg:flex-row gap-6 w-full h-screen p-4 bg-gray-50">
        {/* Side Menu */}
        <div className="w-full lg:w-80 lg:max-w-sm">
          <SideMenu
            colors={product.colors || []}
            printAreas={product.print_areas}
            currentPrintAreaIndex={currentPrintAreaIndex}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            onPrintAreaChange={switchPrintArea}
            onDesignSelect={handleDesignSelect}
          />
        </div>

        {/* Design Canvas */}
        <DesignCanvas
          printArea={currentPrintArea}
          selectedColor={selectedColor}
          designs={currentDesigns}
          onDesignUpdate={updateDesign}
        />
      </div>
    </UploadedDesignsProvider>
  );
}
