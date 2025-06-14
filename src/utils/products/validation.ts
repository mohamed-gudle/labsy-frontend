/**
 * Product validation utilities
 * Helper functions for validating product data and print areas
 */

/**
 * Validates print area coordinates
 * @param x - X coordinate
 * @param y - Y coordinate  
 * @param width - Width of the area
 * @param height - Height of the area
 * @param imageWidth - Image width for bounds checking
 * @param imageHeight - Image height for bounds checking
 * @returns Validation error message or null if valid
 */
export const validatePrintArea = (
    x: number,
    y: number,
    width: number,
    height: number,
    imageWidth: number,
    imageHeight: number
): string | null => {
    if (x < 0 || y < 0) {
        return 'Print area coordinates must be positive';
    }

    if (width <= 0 || height <= 0) {
        return 'Print area dimensions must be positive';
    }

    if (x + width > imageWidth || y + height > imageHeight) {
        return 'Print area extends beyond image bounds';
    }

    return null;
};

/**
 * Checks if two print areas overlap
 * @param area1 - First print area
 * @param area2 - Second print area  
 * @returns True if areas overlap
 */
export const checkPrintAreaOverlap = (
    area1: { x: number; y: number; width: number; height: number },
    area2: { x: number; y: number; width: number; height: number }
): boolean => {
    return !(
        area1.x + area1.width <= area2.x ||
        area2.x + area2.width <= area1.x ||
        area1.y + area1.height <= area2.y ||
        area2.y + area2.height <= area1.y
    );
};
