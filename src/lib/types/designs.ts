/**
 * Design-related TypeScript interfaces and types
 * Centralized type definitions for design management, canvas interactions, and editor functionality
 */

import { PrintableArea } from "./base-products";

/**
 * Design state interface
 * Represents the state of a design element on the canvas
 */
export interface DesignState {
    /** Position coordinates on canvas */
    position: { x: number; y: number };
    /** Scale factors for x and y axes */
    scale: { x: number; y: number };
    /** Rotation angle in degrees */
    rotation: number;
    /** Whether this design is currently selected */
    isSelected: boolean;
    /** URL of the design image */
    imageUrl?: string;
    /** Name/title of the design */
    name?: string;
    /** Unique identifier for the design */
    id?: string;
}

/**
 * Canvas size interface
 * Defines the dimensions and scale of the design canvas
 */
export interface CanvasSize {
    /** Canvas width in pixels */
    width: number;
    /** Canvas height in pixels */
    height: number;
    /** Current zoom/scale level */
    scale: number;
}

/**
 * Design canvas properties interface
 * Props passed to the design canvas component
 */
export interface DesignCanvasProps {
    /** Current print area being designed */
    printArea: PrintableArea;
    /** Currently selected color */
    selectedColor: string;
    /** Array of designs on the canvas */
    designs: DesignState[];
    /** Callback when a design is updated */
    onDesignUpdate: (index: number, design: DesignState) => void;
}

/**
 * Side menu properties interface
 * Props for the design editor side menu
 */
export interface SideMenuProps {
    /** Available colors for the product */
    colors: string[];
    /** Available print areas */
    printAreas: PrintableArea[];
    /** Index of currently selected print area */
    currentPrintAreaIndex: number;
    /** Currently selected color */
    selectedColor: string;
    /** Callback when color changes */
    onColorChange: (color: string) => void;
    /** Callback when print area changes */
    onPrintAreaChange: (index: number) => void;
}

/**
 * Design interface
 * Represents a design that can be used in the editor
 */
export interface Design {
    /** Unique design identifier */
    id: string;
    /** Design name/title */
    name: string;
    /** URL of the design image */
    imageUrl: string;
    /** Optional description */
    description?: string;
    /** Design tags for categorization */
    tags?: string[];
    /** Whether design is publicly available */
    isPublic?: boolean;
    /** Creation timestamp */
    createdAt?: Date;
    /** Last update timestamp */
    updatedAt?: Date;
    /** User ID of design creator */
    createdBy?: string;
}

/**
 * Design upload status enumeration
 * Represents the current state of a design upload
 */
export type UploadStatus = "idle" | "uploading" | "success" | "error";

/**
 * Design tools dialog state interface
 * Manages the state of the design upload dialog
 */
export interface DesignToolsDialogState {
    /** Whether the dialog is open */
    isOpen: boolean;
    /** Preview URL of selected file */
    preview: string | null;
    /** Whether user is dragging a file over the drop zone */
    isDragging: boolean;
    /** Current upload status */
    uploadStatus: UploadStatus;
    /** Error message if upload fails */
    error: string;
}

/**
 * Design canvas interaction state interface
 * Manages user interactions with the design canvas
 */
export interface DesignCanvasInteractionState {
    /** Currently selected design index */
    selectedDesignIndex: number | null;
    /** Whether user is dragging a design */
    isDragging: boolean;
    /** Starting position of drag operation */
    dragStart: { x: number; y: number } | null;
    /** Current drag offset */
    dragOffset: { x: number; y: number } | null;
    /** Whether user is resizing a design */
    isResizing: boolean;
    /** Resize handle being used */
    resizeHandle: string | null;
    /** Whether user is rotating a design */
    isRotating: boolean;
}

/**
 * Design editor state interface
 * Overall state of the design editor
 */
export interface DesignEditorState {
    /** Designs organized by print area */
    designsByPrintArea: Record<number, DesignState[]>;
    /** Currently active print area index */
    currentPrintAreaIndex: number;
    /** Available print areas */
    printAreas: PrintableArea[];
    /** Canvas interaction state */
    interaction: DesignCanvasInteractionState;
    /** Canvas size and zoom */
    canvas: CanvasSize;
    /** Whether editor is in preview mode */
    isPreviewMode: boolean;
    /** Undo/redo history */
    history: {
        past: DesignState[][];
        present: DesignState[];
        future: DesignState[][];
    };
}

/**
 * Design file validation result interface
 * Result of validating a design file upload
 */
export interface DesignFileValidationResult {
    /** Whether the file is valid */
    isValid: boolean;
    /** Error message if invalid */
    error?: string;
    /** File metadata if valid */
    metadata?: {
        width: number;
        height: number;
        fileSize: number;
        mimeType: string;
    };
}

/**
 * Design export options interface
 * Options for exporting designs
 */
export interface DesignExportOptions {
    /** Export format */
    format: 'png' | 'jpg' | 'svg' | 'pdf';
    /** Export quality (0-100) */
    quality?: number;
    /** Export dimensions */
    dimensions?: {
        width: number;
        height: number;
    };
    /** Whether to include background */
    includeBackground?: boolean;
    /** Background color if included */
    backgroundColor?: string;
    /** DPI for print exports */
    dpi?: number;
}

/**
 * Design template interface
 * Represents a pre-made design template
 */
export interface DesignTemplate {
    /** Unique template identifier */
    id: string;
    /** Template name */
    name: string;
    /** Template description */
    description?: string;
    /** Preview image URL */
    previewUrl: string;
    /** Template category */
    category: string;
    /** Design elements in the template */
    elements: DesignState[];
    /** Compatible print areas */
    compatiblePrintAreas?: string[];
    /** Whether template is premium */
    isPremium?: boolean;
    /** Template tags */
    tags?: string[];
}

/**
 * Color overlay state interface
 * Manages color overlay effects on designs
 */
export interface ColorOverlayState {
    /** Whether color overlay is enabled */
    enabled: boolean;
    /** Overlay color (hex format) */
    color: string;
    /** Overlay opacity (0-1) */
    opacity: number;
    /** Blend mode for overlay */
    blendMode: 'multiply' | 'overlay' | 'soft-light' | 'hard-light' | 'color-burn' | 'color-dodge';
}
