"use client";

import { useBaseProduct } from "@/lib/hooks/base-products";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { UploadedDesignsProvider } from "@/lib/contexts/designs";

// TODO: Import these components once they're properly exported
// import { DesignCanvas } from "@/components/designs";
// import { SideMenu } from "@/components/designs";
import { useDesignStates } from "@/lib/hooks/designs";
import type { Design } from "@/lib/types/designs";
import { SideMenu } from "@/components/designs/side-menu";
import { DesignCanvas } from "@/components/designs/design-canvas";

export default function DesignPage() {
  const { id } = useParams<{ id: string }>();
  const { baseProduct, loading, error } = useBaseProduct(id);

  // Design state management with persistence across print areas
  const {
    currentPrintAreaIndex,
    currentDesigns,
    currentPrintArea,
    addDesign,
    updateDesign,
    switchPrintArea,
  } = useDesignStates(baseProduct?.print_areas);

  // Color state
  const [selectedColor, setSelectedColor] = useState<string>("#FFFFFF");

  // Initialize color when product loads
  useEffect(() => {
    if (baseProduct?.colors?.[0]) {
      setSelectedColor(baseProduct.colors[0]);
    }
  }, [baseProduct?.colors]);

  if (loading) {
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
          <p>Error loading product: {error}</p>
        </div>
      </div>
    );
  }

  if (
    !baseProduct ||
    !baseProduct.print_areas ||
    baseProduct.print_areas.length === 0
  ) {
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
        <div className="w-full lg:w-80 lg:max-w-sm">
          <div>TODO: SideMenu component</div>
          <SideMenu
            colors={baseProduct.colors || []}
            printAreas={baseProduct.print_areas}
            currentPrintAreaIndex={currentPrintAreaIndex}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
            onPrintAreaChange={switchPrintArea}
            onDesignSelect={handleDesignSelect}
          />
        </div>
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
