import { PrintableArea } from "@/app/(dashboard)/base-products/_types/api";

// Design-specific types
export interface DesignState {
  position: { x: number; y: number };
  scale: { x: number; y: number };
  rotation: number;
  isSelected: boolean;
  imageUrl?: string; // Add imageUrl for custom design images
  name?: string;
  id?: string;
}

export interface CanvasSize {
  width: number;
  height: number;
  scale: number;
}

export interface DesignCanvasProps {
  printArea: PrintableArea;
  selectedColor: string;
  designs: DesignState[];
  onDesignUpdate: (index: number, design: DesignState) => void;
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
export type { PrintableArea } from "@/app/(dashboard)/base-products/_types/api";
