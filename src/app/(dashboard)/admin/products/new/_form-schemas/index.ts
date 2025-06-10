import { z } from "zod";

// Basic product information schema
export const basicProductSchema = z.object({
  title: z.string()
    .min(1, "Product title is required")
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  
  description: z.string()
    .min(1, "Product description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be less than 500 characters"),
  
  brand: z.string()
    .min(1, "Brand is required")
    .max(50, "Brand name must be less than 50 characters"),
  
  category: z.string()
    .min(1, "Category is required"),
  
  material: z.string()
    .min(1, "Material information is required")
    .max(100, "Material description must be less than 100 characters"),
  
  manufacturer: z.string()
    .min(1, "Manufacturer is required")
    .max(50, "Manufacturer name must be less than 50 characters"),
  
  country: z.string()
    .min(1, "Country of origin is required"),
  
  fulfillmentTime: z.string()
    .min(1, "Fulfillment time is required"),
  
  base_cost: z.number()
    .min(0.01, "Base cost must be greater than 0")
    .max(10000, "Base cost must be reasonable"),
  
  print_cost_per_cm2: z.number()
    .min(0.001, "Print cost per cm² must be greater than 0")
    .max(10, "Print cost per cm² must be reasonable"),
  
  colors: z.array(z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"))
    .min(1, "At least one color is required")
    .max(10, "Maximum 10 colors allowed"),
  
  available_sizes: z.union([
    z.record(z.string(), z.number().min(0)),
    z.array(z.string())
  ]).refine(data => {
    if (Array.isArray(data)) {
      return data.length > 0;
    }
    return Object.keys(data).length > 0;
  }, "At least one size must be available"),
  
  main_image: z.instanceof(File, { message: "Main product image is required" })
    .refine(file => file.size <= 10 * 1024 * 1024, "Image must be less than 10MB")
    .refine(
      file => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP images are allowed"
    )
});

// Print area schema
export const printAreaSchema = z.object({
  name: z.string()
    .min(1, "Print area name is required")
    .max(50, "Name must be less than 50 characters"),
  
  mockup_file: z.instanceof(File, { message: "Mockup image is required" })
    .refine(file => file.size <= 10 * 1024 * 1024, "Image must be less than 10MB")
    .refine(
      file => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
      "Only JPEG, PNG, and WebP images are allowed"
    )
    .refine(async (file) => {
      return new Promise<boolean>((resolve) => {
        const img = new Image();
        img.onload = () => {
          // Require minimum resolution for print quality
          resolve(img.width >= 800 && img.height >= 800);
        };
        img.onerror = () => resolve(false);
        img.src = URL.createObjectURL(file);
      });
    }, "Image must be at least 800x800 pixels for print quality"),
  
  x: z.number()
    .min(0, "X coordinate must be positive"),
  
  y: z.number()
    .min(0, "Y coordinate must be positive"),
  
  width: z.number()
    .min(10, "Width must be at least 10 pixels")
    .max(1000, "Width cannot exceed 1000 pixels"),
  
  height: z.number()
    .min(10, "Height must be at least 10 pixels")
    .max(1000, "Height cannot exceed 1000 pixels"),
  
  dpi: z.number()
    .min(150, "DPI must be at least 150 for print quality")
    .max(600, "DPI cannot exceed 600"),
  
  printable: z.boolean().default(true),
  
  description: z.string()
    .max(200, "Description must be less than 200 characters")
    .optional()
});

// Complete product schema (combines basic + print areas)
export const completeProductSchema = z.object({
  ...basicProductSchema.shape,
  print_areas: z.array(printAreaSchema)
    .min(1, "At least one print area is required")
    .max(5, "Maximum 5 print areas allowed")
});

// Schema for updating existing print areas (mockup_file is optional)
export const updatePrintAreaSchema = printAreaSchema.extend({
  mockup_file: z.instanceof(File).optional(),
  mockup_url: z.string().url().optional()
}).refine(
  data => data.mockup_file || data.mockup_url,
  "Either a new mockup file or existing mockup URL is required"
);

// Export type inference
export type BasicProductFormData = z.infer<typeof basicProductSchema>;
export type PrintAreaFormData = z.infer<typeof printAreaSchema>;
export type CompleteProductFormData = z.infer<typeof completeProductSchema>;
export type UpdatePrintAreaFormData = z.infer<typeof updatePrintAreaSchema>;

// Form step validation
export const validateStep = async (step: string, data: unknown) => {
  switch (step) {
    case 'basic':
      return basicProductSchema.safeParse(data);
    case 'print-areas':
      return await z.array(printAreaSchema).safeParseAsync(data);
    case 'complete':
      return await completeProductSchema.safeParseAsync(data);
    default:
      return { success: false, error: { message: 'Invalid step' } };
  }
};
