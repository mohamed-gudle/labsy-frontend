import { z } from "zod";

/**
 * Design upload schema
 * Validates design files during upload
 */
export const designUploadSchema = z.object({
    file: z
        .instanceof(File)
        .optional()
        .refine(
            (file: File | undefined) => {
                if (!file) return false;

                const maxSize = 10 * 1024 * 1024; // 10MB
                const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];

                return file.size <= maxSize && allowedTypes.includes(file.type);
            },
            {
                message: "File must be a PNG, JPEG, or SVG under 10MB",
            }
        ),

    name: z.string()
        .min(1, "Design name is required")
        .max(100, "Design name must be less than 100 characters")
        .optional(),

    description: z.string()
        .max(500, "Description must be less than 500 characters")
        .optional(),
});

/**
 * Design state schema
 * Validates design positioning and transformation data
 */
export const designStateSchema = z.object({
    position: z.object({
        x: z.number(),
        y: z.number(),
    }),

    scale: z.object({
        x: z.number().min(0.1).max(5),
        y: z.number().min(0.1).max(5),
    }),

    rotation: z.number().min(-360).max(360),
    isSelected: z.boolean(),
    imageUrl: z.string().url().optional(),
    name: z.string().optional(),
    id: z.string().optional(),
});

/**
 * Canvas size schema
 * Validates canvas dimensions and scale
 */
export const canvasSizeSchema = z.object({
    width: z.number().min(1),
    height: z.number().min(1),
    scale: z.number().min(0.1).max(5),
});

/**
 * Design canvas props schema
 * Validates props passed to design canvas component
 */
export const designCanvasPropsSchema = z.object({
    printArea: z.object({
        id: z.string(),
        name: z.string(),
        x: z.number(),
        y: z.number(),
        width: z.number(),
        height: z.number(),
        dpi: z.number(),
        mockup_url: z.string().url(),
    }),
    selectedColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Invalid color format"),
    designs: z.array(designStateSchema),
});

/**
 * Design file validation schema
 * Extended validation for design files including dimension requirements
 */
export const designFileValidationSchema = z.object({
    file: z.instanceof(File)
        .refine(file => file.size <= 10 * 1024 * 1024, "Image must be less than 10MB")
        .refine(
            file => ["image/jpeg", "image/png", "image/svg+xml"].includes(file.type),
            "Only JPEG, PNG, and SVG images are allowed"
        )
        .refine(async (file) => {
            if (file.type === 'image/svg+xml') return true; // SVG files don't have pixel dimensions

            return new Promise<boolean>((resolve) => {
                const img = new Image();
                img.onload = () => {
                    // Require minimum resolution for print quality
                    resolve(img.width >= 300 && img.height >= 300);
                };
                img.onerror = () => resolve(false);
                img.src = URL.createObjectURL(file);
            });
        }, "Image must be at least 300x300 pixels for print quality"),
});

/**
 * Design creation schema
 * Used when creating new design entries
 */
export const designCreationSchema = z.object({
    name: z.string()
        .min(1, "Design name is required")
        .max(100, "Design name must be less than 100 characters"),

    imageUrl: z.string().url("Invalid image URL"),

    tags: z.array(z.string()).optional(),

    description: z.string()
        .max(500, "Description must be less than 500 characters")
        .optional(),

    isPublic: z.boolean().default(false),
});

// Export type inference
export type DesignUploadData = z.infer<typeof designUploadSchema>;
export type DesignStateData = z.infer<typeof designStateSchema>;
export type CanvasSizeData = z.infer<typeof canvasSizeSchema>;
export type DesignCanvasPropsData = z.infer<typeof designCanvasPropsSchema>;
export type DesignFileValidationData = z.infer<typeof designFileValidationSchema>;
export type DesignCreationData = z.infer<typeof designCreationSchema>;
