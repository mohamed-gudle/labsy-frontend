import { z } from "zod";

/**
 * Base product filter schema
 * Used for filtering and searching base products
 */
export const baseProductFilterSchema = z.object({
    category: z.string().optional(),
    material: z.string().optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    colors: z.array(z.string()).optional(),
    sizes: z.array(z.string()).optional(),
    search: z.string().optional(),
});

/**
 * Base product creation schema
 * Used when creating new base products in the system
 */
export const baseProductCreationSchema = z.object({
    title: z.string()
        .min(1, "Product title is required")
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title must be less than 100 characters"),

    description: z.string()
        .optional()
        .transform(val => val || undefined)
        .refine(val => !val || val.length >= 10, "Description must be at least 10 characters if provided")
        .refine(val => !val || val.length <= 500, "Description must be less than 500 characters"),

    category: z.string()
        .min(1, "Category is required"),

    material: z.string()
        .min(1, "Material information is required")
        .max(100, "Material description must be less than 100 characters"),

    base_cost: z.number()
        .min(0.01, "Base cost must be greater than 0")
        .max(10000, "Base cost must be reasonable"),

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
        ),

    print_areas: z.array(z.object({
        name: z.string().min(1, "Print area name is required"),
        x: z.number().min(0),
        y: z.number().min(0),
        width: z.number().min(1),
        height: z.number().min(1),
        dpi: z.number().min(150).max(600),
        mockup_url: z.string().url(),
    })).min(1, "At least one print area is required"),
});

/**
 * Base product update schema
 * Used when updating existing base products
 */
export const baseProductUpdateSchema = baseProductCreationSchema.partial();

// Export type inference
export type BaseProductFilterData = z.infer<typeof baseProductFilterSchema>;
export type BaseProductCreationData = z.infer<typeof baseProductCreationSchema>;
export type BaseProductUpdateData = z.infer<typeof baseProductUpdateSchema>;
