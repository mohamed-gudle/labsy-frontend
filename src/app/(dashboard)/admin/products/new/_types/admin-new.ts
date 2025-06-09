import { CompleteProductFormData, PrintAreaFormData } from '../_form-schemas';

// Extend the schema types for UI needs
export interface PrintableAreaInput extends PrintAreaFormData {
  id?: string;
  mockup_url?: string;
  mockup_file: File; // Make required for UI
}

export interface ProductFormData extends Omit<CompleteProductFormData, 'print_areas'> {
  print_areas: PrintableAreaInput[];
}

// Additional UI-specific types
export interface PrintAreaSelection {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MockupImageInfo {
  width: number;
  height: number;
  naturalWidth: number;
  naturalHeight: number;
  url: string;
}

// Form step type
export type FormStep = 'basic' | 'print-areas' | 'review';

// API response types
export interface UploadResponse {
  success: boolean;
  productId?: string;
  message?: string;
  errors?: Record<string, string>;
}

// Canvas state types
export interface PrintAreaCanvasState {
  selection: PrintAreaSelection | null;
  isSelecting: boolean;
  isDragging: boolean;
  dragStart: { x: number; y: number } | null;
  zoom: number;
  pan: { x: number; y: number };
  gridVisible: boolean;
  mockupImage: HTMLImageElement | null;
  imageInfo: MockupImageInfo | null;
}

// Upload state management
export interface ProductUploadState {
  productData: Partial<ProductFormData>;
  currentStep: FormStep;
  currentEditingAreaIndex: number;
  uploadProgress: number;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
}
