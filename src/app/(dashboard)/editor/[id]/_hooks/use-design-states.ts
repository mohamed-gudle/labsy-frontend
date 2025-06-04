import { useState, useCallback } from 'react';
import { DesignState, PrintableArea } from '../_types/design';


export const useDesignStates = (printAreas: PrintableArea[] = []) => {
  const [designStates, setDesignStates] = useState<Record<number, DesignState>>({});
  const [currentPrintAreaIndex, setCurrentPrintAreaIndex] = useState<number>(0);

  const getCurrentDesignState = useCallback((): DesignState => {
    const currentPrintArea = printAreas[currentPrintAreaIndex];
    
    if (!currentPrintArea) {
      return {
        position: { x: 0, y: 0 },
        scale: { x: 1, y: 1 },
        rotation: 0,
        isSelected: false,
      };
    }

    if (!designStates[currentPrintAreaIndex]) {
      return {
        position: {
          x: currentPrintArea.x + currentPrintArea.width / 2 - 50,
          y: currentPrintArea.y + currentPrintArea.height / 2 - 50,
        },
        scale: { x: 1, y: 1 },
        rotation: 0,
        isSelected: false,
      };
    }

    return designStates[currentPrintAreaIndex];
  }, [printAreas, currentPrintAreaIndex, designStates]);

  const updateDesignState = useCallback((newState: DesignState) => {
    setDesignStates(prev => ({
      ...prev,
      [currentPrintAreaIndex]: newState,
    }));
  }, [currentPrintAreaIndex]);

  const handlePrintAreaChange = useCallback((newIndex: number) => {
    // Deselect current design before switching
    if (designStates[currentPrintAreaIndex]) {
      updateDesignState({
        ...designStates[currentPrintAreaIndex],
        isSelected: false,
      });
    }
    setCurrentPrintAreaIndex(newIndex);
  }, [currentPrintAreaIndex, designStates, updateDesignState]);

  return {
    currentPrintAreaIndex,
    designStates,
    getCurrentDesignState,
    updateDesignState,
    handlePrintAreaChange,
  };
};