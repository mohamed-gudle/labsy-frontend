import { useState, useCallback } from 'react';
import { DesignState, PrintableArea } from '../_types/design';


export const useDesignStates = (printAreas: PrintableArea[] = []) => {
  const [designStates, setDesignStates] = useState<Record<number, DesignState[]>>({});
  const [currentPrintAreaIndex, setCurrentPrintAreaIndex] = useState<number>(0);

  const getCurrentDesignState = useCallback((): DesignState[] => {
    const currentPrintArea = printAreas[currentPrintAreaIndex];
    if (!currentPrintArea) return [];
    return designStates[currentPrintAreaIndex] || [];
  }, [printAreas, currentPrintAreaIndex, designStates]);

  const addDesignState = useCallback((newState: DesignState) => {
    setDesignStates(prev => ({
      ...prev,
      [currentPrintAreaIndex]: [...(prev[currentPrintAreaIndex] || []), newState],
    }));
  }, [currentPrintAreaIndex]);

  const updateDesignState = useCallback((index: number, newState: DesignState) => {
    setDesignStates(prev => ({
      ...prev,
      [currentPrintAreaIndex]: prev[currentPrintAreaIndex].map((d, i) => i === index ? newState : d),
    }));
  }, [currentPrintAreaIndex]);

  const handlePrintAreaChange = useCallback((newIndex: number) => {
    // Deselect all designs before switching
    if (designStates[currentPrintAreaIndex]) {
      setDesignStates(prev => ({
        ...prev,
        [currentPrintAreaIndex]: prev[currentPrintAreaIndex].map(d => ({ ...d, isSelected: false })),
      }));
    }
    setCurrentPrintAreaIndex(newIndex);
  }, [currentPrintAreaIndex, designStates]);

  return {
    currentPrintAreaIndex,
    designStates,
    getCurrentDesignState,
    addDesignState,
    updateDesignState,
    handlePrintAreaChange,
  };
};