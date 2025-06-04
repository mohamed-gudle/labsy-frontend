import { PrintableArea } from "./design";

// Design-specific types
export interface DesignState {
  position: { x: number; y: number };
  scale: { x: number; y: number };
  rotation: number;
  isSelected: boolean;
}

export interface CanvasSize {
  width: number;
  height: number;
  scale: number;
}

export interface DesignCanvasProps {
  currentPrintArea: PrintableArea;
  selectedColor: string;
  designState: DesignState;
  onDesignStateChange: (state: DesignState) => void;
  recenterDesignSignal: number;
}

export interface SideMenuProps {
  colors: string[];
  printAreas: PrintableArea[];
  currentPrintAreaIndex: number;
  selectedColor: string;
  onColorChange: (color: string) => void;
  onPrintAreaChange: (index: number) => void;
}

// Re-export PrintableArea for convenience
export type { PrintableArea } from "@/app/base-products/_types/api";
