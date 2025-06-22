/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Product-related utility functions
 * This file contains helper functions for product management and processing
 */

/**
 * Formats product price for display
 * @param price - Price in cents
 * @param currency - Currency code (default: USD)
 * @returns Formatted price string
 */
export const formatPrice = (price: number, currency: string = 'USD'): string => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    });
    return formatter.format(price / 100);
};

/**
 * Validates product form data
 * @param data - Product form data to validate
 * @returns Array of validation errors
 */
export const validateProductData = (data: any): string[] => {
    const errors: string[] = [];

    if (!data.title || data.title.trim() === '') {
        errors.push('Product title is required');
    }

    if (!data.brand || data.brand.trim() === '') {
        errors.push('Brand is required');
    }

    if (!data.base_cost || data.base_cost <= 0) {
        errors.push('Base cost must be greater than 0');
    }

    return errors;
};

/**
 * Generates a product slug from title
 * @param title - Product title
 * @returns URL-friendly slug
 */
export const generateProductSlug = (title: string): string => {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
};
