// Base product-related custom hooks

import { BaseItem } from '@/lib/types/base-products';
import { useEffect, useState } from 'react';

// Import the mock data
import baseProductsData from '@/mocks/base-products.json';

/**
 * Hook to fetch and manage multiple base products
 */
export const useBaseProducts = () => {
    const [baseProducts, setBaseProducts] = useState<BaseItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 500));                // Load data from the JSON file
                setBaseProducts(baseProductsData as unknown as BaseItem[]);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch base products');
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return { baseProducts, loading, error };
};

/**
 * Hook to fetch a single base product by ID
 */
export const useBaseProduct = (id: string) => {
    const [baseProduct, setBaseProduct] = useState<BaseItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                setError(null);

                // Simulate API delay
                await new Promise(resolve => setTimeout(resolve, 300));                // Find product by ID from the JSON data
                const product = (baseProductsData as unknown as BaseItem[]).find(item => item.id === id); if (!product) {
                    setError(`Product with ID "${id}" not found`);
                    setBaseProduct(null);
                } else {
                    setBaseProduct(product);
                }
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch base product');
                setBaseProduct(null);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        } else {
            setLoading(false);
            setBaseProduct(null);
        }
    }, [id]);

    return { baseProduct, loading, error };
};
