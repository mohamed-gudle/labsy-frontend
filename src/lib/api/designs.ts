import { v4 as uuidv4 } from 'uuid';
import { Design } from '../types/designs';

/**
 * Hook to handle design upload functionality
 * @returns Function to trigger design upload
 */
export const useUploadDesign = () => {
    /**
     * Uploads a design and returns design data
     * Currently uses a mock implementation with 'google.svg'
     * @returns Promise that resolves to Design object
     */
    const trigger = async (): Promise<Design> => {
        const fileName = 'google.svg';
        const imageUrl = `/mock/${fileName}`;
        const design = {
            id: uuidv4(),
            name: fileName,
            imageUrl,
        };
        return design;
    };
    return trigger;
};

/**
 * Validates uploaded design files
 * @param file - The file to validate
 * @returns Error message if invalid, null if valid
 */
export const validateDesignFile = (file: File): string | null => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];

    if (file.size > maxSize) {
        return 'File size must be less than 10MB';
    }

    if (!allowedTypes.includes(file.type)) {
        return 'Only PNG, JPEG, and SVG files are allowed';
    }

    return null;
};
