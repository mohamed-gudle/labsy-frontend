import { useState, useCallback } from 'react';
import { DesignState, PrintableArea } from '../_types/design';

export const useDesignStates = (printAreas: PrintableArea[] = []) => {
  // Store designs per print area - persists across print area switches
  const [designsByPrintArea, setDesignsByPrintArea] = useState<Record<number, DesignState[]>>({});
  const [currentPrintAreaIndex, setCurrentPrintAreaIndex] = useState<number>(0);

  // Get designs for current print area
  const currentDesigns = designsByPrintArea[currentPrintAreaIndex] || [];

  const addDesign = useCallback((design: DesignState) => {
    setDesignsByPrintArea(prev => ({
      ...prev,
      [currentPrintAreaIndex]: [...(prev[currentPrintAreaIndex] || []), design],
    }));
  }, [currentPrintAreaIndex]);

  const updateDesign = useCallback((index: number, updatedDesign: DesignState) => {
    setDesignsByPrintArea(prev => ({
      ...prev,
      [currentPrintAreaIndex]: prev[currentPrintAreaIndex]?.map((design, i) =>
        i === index ? updatedDesign : design
      ) || [],
    }));
  }, [currentPrintAreaIndex]);

  const removeDesign = useCallback((index: number) => {
    setDesignsByPrintArea(prev => ({
      ...prev,
      [currentPrintAreaIndex]: prev[currentPrintAreaIndex]?.filter((_, i) => i !== index) || [],
    }));
  }, [currentPrintAreaIndex]);

  const switchPrintArea = useCallback((newIndex: number) => {
    // Deselect all designs in current area before switching
    setDesignsByPrintArea(prev => ({
      ...prev,
      [currentPrintAreaIndex]: prev[currentPrintAreaIndex]?.map(design => ({
        ...design,
        isSelected: false
      })) || [],
    }));

    setCurrentPrintAreaIndex(newIndex);
  }, [currentPrintAreaIndex]);

  const clearCurrentArea = useCallback(() => {
    setDesignsByPrintArea(prev => ({
      ...prev,
      [currentPrintAreaIndex]: [],
    }));
  }, [currentPrintAreaIndex]);

  return {
    // Current state
    currentPrintAreaIndex,
    currentDesigns,
    currentPrintArea: printAreas[currentPrintAreaIndex],

    // Actions
    addDesign,
    updateDesign,
    removeDesign,
    switchPrintArea,
    clearCurrentArea,

    // All designs (for advanced use cases)
    allDesigns: designsByPrintArea,
  };
};