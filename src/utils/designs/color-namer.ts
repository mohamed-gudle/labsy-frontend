import namer from 'color-namer';

/**
 * Gets a human-readable name for a hex color
 * @param hex - The hex color code (e.g., "#FF0000")
 * @returns The name of the color
 */
export const getColorName = (hex: string): string => {
    return namer(hex).ntc[0].name;
};
