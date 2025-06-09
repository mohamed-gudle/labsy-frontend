import { BaseItem } from "@/app/(dashboard)/base-products/_types/api";

// Admin-specific types for product creation
export interface AdminBaseProduct extends Omit<BaseItem, 'id' | 'print_areas' | 'created_at' | 'updated_at'> {
  print_areas: PrintableAreaInput[];
}

export interface PrintableAreaInput {
  name: string;
  mockup_file?: File;
  mockup_url?: string; // For existing mockups
  x: number; // coordinates in pixels relative to mockup image
  y: number;
  width: number;
  height: number;
  dpi: number;
  printable: boolean;
  description?: string;
}

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

export interface ProductFormData {
  // Basic product info
  title: string;
  description: string;
  brand: string;
  category: string;
  material: string;
  manufacturer: string;
  country: string;
  fulfillmentTime: string;
  base_cost: number;
  print_cost_per_cm2: number;
  
  // Product options
  colors: string[];
  available_sizes: Record<string, number> | string[];
  
  // Files
  main_image?: File;
  
  // Print areas
  print_areas: PrintableAreaInput[];
}

export interface ProductUploadState {
  productData: Partial<ProductFormData>;
  currentStep: 'basic' | 'print-areas' | 'review';
  currentEditingAreaIndex: number;
  uploadProgress: number;
  validationErrors: Record<string, string>;
  isSubmitting: boolean;
}

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

// Form validation schemas will be defined separately
export interface ProductFormErrors {
  title?: string;
  description?: string;
  brand?: string;
  category?: string;
  base_cost?: string;
  colors?: string;
  available_sizes?: string;
  main_image?: string;
  print_areas?: string;
}

export interface PrintAreaFormErrors {
  name?: string;
  mockup_file?: string;
  coordinates?: string;
  dpi?: string;
}
