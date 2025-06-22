/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Product-related TypeScript interfaces and types
 * Centralized type definitions for product management and administration
 */

/**
 * Print area selection interface for UI interactions
 * Used when selecting areas on mockup images
 */
export interface PrintAreaSelection {
    /** X coordinate in pixels */
    x: number;
    /** Y coordinate in pixels */
    y: number;
    /** Width in pixels */
    width: number;
    /** Height in pixels */
    height: number;
}

/**
 * Mockup image information interface
 * Contains dimensions and metadata for mockup images
 */
export interface MockupImageInfo {
    /** Display width in pixels */
    width: number;
    /** Display height in pixels */
    height: number;
    /** Natural/actual width of image */
    naturalWidth: number;
    /** Natural/actual height of image */
    naturalHeight: number;
    /** Image URL */
    url: string;
}

/**
 * Printable area input interface for product creation
 * Extends basic print area with file upload capabilities
 */
export interface PrintableAreaInput {
    /** Optional ID for existing areas */
    id?: string;
    /** Name of the print area */
    name: string;
    /** Optional mockup file for upload */
    mockup_file?: File;
    /** URL of existing mockup image */
    mockup_url?: string;
    /** X coordinate in pixels relative to mockup image */
    x: number;
    /** Y coordinate in pixels relative to mockup image */
    y: number;
    /** Width in pixels */
    width: number;
    /** Height in pixels */
    height: number;
    /** DPI for print quality */
    dpi: number;
    /** Whether this area is printable */
    printable: boolean;
    /** Optional description */
    description?: string;
}

/**
 * Main product form data interface
 * Used for product creation and editing forms
 */
export interface ProductFormData {
    // Basic product information
    /** Product title/name */
    title: string;
    /** Product description */
    description: string;
    /** Brand name */
    brand: string;
    /** Product category */
    category: string;
    /** Material composition */
    material: string;
    /** Manufacturer name */
    manufacturer: string;
    /** Country of origin */
    country: string;
    /** Fulfillment time */
    fulfillmentTime: string;
    /** Base cost in currency units */
    base_cost: number;
    /** Print cost per square centimeter */
    print_cost_per_cm2: number;

    // Product options
    /** Available colors (hex codes) */
    colors: string[];
    /** Available sizes with stock or simple size list */
    available_sizes: Record<string, number> | string[];

    // Files
    /** Main product image file */
    main_image?: File;

    // Print areas
    /** Array of printable areas */
    print_areas: PrintableAreaInput[];
}

/**
 * Form step enumeration
 * Defines the steps in the product creation process
 */
export type FormStep = 'basic' | 'print-areas' | 'review';

/**
 * Product upload state interface
 * Manages the state during product creation/upload process
 */
export interface ProductUploadState {
    /** Current product data being edited */
    productData: Partial<ProductFormData>;
    /** Current step in the creation process */
    currentStep: FormStep;
    /** Index of currently editing print area */
    currentEditingAreaIndex: number;
    /** Upload progress percentage (0-100) */
    uploadProgress: number;
    /** Form validation errors */
    validationErrors: Record<string, string>;
    /** Whether form is currently being submitted */
    isSubmitting: boolean;
}

/**
 * Print area canvas state interface
 * Manages canvas interaction state for print area editing
 */
export interface PrintAreaCanvasState {
    /** Current selection on canvas */
    selection: PrintAreaSelection | null;
    /** Whether user is actively selecting */
    isSelecting: boolean;
    /** Whether user is dragging */
    isDragging: boolean;
    /** Starting point of drag operation */
    dragStart: { x: number; y: number } | null;
    /** Current zoom level */
    zoom: number;
    /** Pan offset */
    pan: { x: number; y: number };
    /** Whether grid is visible */
    gridVisible: boolean;
    /** Loaded mockup image element */
    mockupImage: HTMLImageElement | null;
    /** Image dimensions and metadata */
    imageInfo: MockupImageInfo | null;
}

/**
 * Product form validation errors interface
 * Defines possible validation errors for product forms
 */
export interface ProductFormErrors {
    /** Title validation error */
    title?: string;
    /** Description validation error */
    description?: string;
    /** Brand validation error */
    brand?: string;
    /** Category validation error */
    category?: string;
    /** Base cost validation error */
    base_cost?: string;
    /** Colors validation error */
    colors?: string;
    /** Available sizes validation error */
    available_sizes?: string;
    /** Main image validation error */
    main_image?: string;
    /** Print areas validation error */
    print_areas?: string;
}

/**
 * Print area form validation errors interface
 * Defines possible validation errors for print area forms
 */
export interface PrintAreaFormErrors {
    /** Name validation error */
    name?: string;
    /** Mockup file validation error */
    mockup_file?: string;
    /** Coordinates validation error */
    coordinates?: string;
    /** DPI validation error */
    dpi?: string;
}

/**
 * API response interface for product operations
 * Standard response format for product-related API calls
 */
export interface UploadResponse {
    /** Whether the operation was successful */
    success: boolean;
    /** ID of created/updated product */
    productId?: string;
    /** Success or error message */
    message?: string;
    /** Field-specific errors */
    errors?: Record<string, string>;
}

/**
 * Product API response interface
 * Extended response interface for product operations
 */
export interface ProductApiResponse extends UploadResponse {
    /** Product data if applicable */
    product?: ProductFormData;
    /** Additional metadata */
    metadata?: Record<string, any>;
}
