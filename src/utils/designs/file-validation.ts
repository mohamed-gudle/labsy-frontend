/**
 * Validates uploaded design files for type and size constraints
 * @param file - The file to validate
 * @returns Error message if validation fails, null if valid
 */
export const validateFile = (file: File): string | null => {
    const allowedTypes = ["image/png", "image/jpeg", "image/svg+xml"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
        return "Unsupported file format. Only PNG, JPEG, and SVG are allowed.";
    }

    if (file.size > maxSize) {
        return "File size too large. Maximum size is 10MB.";
    }

    return null;
};
