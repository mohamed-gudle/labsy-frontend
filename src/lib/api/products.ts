/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * API functions for product management
 * This file consolidates all product-related API calls
 */

/**
 * Interface for product creation/update operations
 */
export interface ProductApiResponse {
    success: boolean;
    productId?: string;
    message?: string;
    errors?: Record<string, string>;
}

/**
 * Creates a new product
 * @param productData - The product data to create
 * @returns Promise that resolves to ProductApiResponse
 */
export const createProduct = async (productData: FormData): Promise<ProductApiResponse> => {
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            body: productData,
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to create product',
        };
    }
};

/**
 * Updates an existing product
 * @param productId - The ID of the product to update
 * @param productData - The updated product data
 * @returns Promise that resolves to ProductApiResponse
 */
export const updateProduct = async (productId: string, productData: FormData): Promise<ProductApiResponse> => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'PUT',
            body: productData,
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to update product',
        };
    }
};

/**
 * Deletes a product
 * @param productId - The ID of the product to delete
 * @returns Promise that resolves to ProductApiResponse
 */
export const deleteProduct = async (productId: string): Promise<ProductApiResponse> => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
        });

        return await response.json();
    } catch (error) {
        return {
            success: false,
            message: 'Failed to delete product',
        };
    }
};
