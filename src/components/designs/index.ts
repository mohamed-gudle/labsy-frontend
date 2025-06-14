/**
 * Design Components
 * Centralized exports for design-related components
 */

export { ColorPicker } from './color-picker';
export { PrintAreaSelector } from './print-area-selector';
export { DesignTools } from './design-tools';
export { DesignToolsDialog } from './design-tools-dialog';
export { DesignPicker } from './design-picker';
export { PricingSection } from './pricing-section';

// Re-export design types for convenience
export type {
    Design,
    DesignState,
    DesignCanvasProps,
    DesignToolsDialogState,
    CanvasSize
} from '@/lib/types/designs';
