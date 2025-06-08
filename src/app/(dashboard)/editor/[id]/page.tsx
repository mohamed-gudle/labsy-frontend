"use client";

import { useState } from "react";
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

  // Color state
  const [selectedColor, setSelectedColor] = useState<string>(
    product?.colors?.[0] || "#FFFFFF"
  );

  // Design state management
  const {
    currentPrintAreaIndex,
    getCurrentDesignState,
    addDesignState,
    updateDesignState,
    handlePrintAreaChange,
  } = useDesignStates(product?.print_areas);

  // Recenter signal
  const [recenterDesignSignal] = useState<number>(0);

  // Update selected color when product loads
  useState(() => {
    if (product?.colors?.[0] && selectedColor === "#FFFFFF") {
      setSelectedColor(product.colors[0]);
    }
  });

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

  const currentPrintArea = product.print_areas[currentPrintAreaIndex];
  const currentDesignStates = getCurrentDesignState();

  // Handler for when a design is selected from the DesignPicker
  const handleDesignSelect = (design: Design) => {
    // Center the design in the current print area
    const centerX = currentPrintArea.x + currentPrintArea.width / 2 - 50;
    const centerY = currentPrintArea.y + currentPrintArea.height / 2 - 50;
    addDesignState({
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
            onPrintAreaChange={handlePrintAreaChange}
            onDesignSelect={handleDesignSelect}
          />
        </div>

        {/* Design Canvas */}
        <DesignCanvas
          currentPrintArea={currentPrintArea}
          selectedColor={selectedColor}
          designStates={currentDesignStates}
          addDesignState={addDesignState}
          updateDesignState={updateDesignState}
          recenterDesignSignal={recenterDesignSignal}
        />
      </div>
    </UploadedDesignsProvider>
  );
}
