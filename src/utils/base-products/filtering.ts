/**
 * Base product utility functions
 * Helper functions for base product filtering, sorting, and processing
 */

/**
 * Filters base products by various criteria
 * @param products - Array of base products
 * @param filters - Filter criteria
 * @returns Filtered products array
 */
export const filterBaseProducts = (
    products: any[],
    filters: {
        category?: string;
        brand?: string;
        color?: string;
        minPrice?: number;
        maxPrice?: number;
        search?: string;
    }
): any[] => {
    return products.filter(product => {
        if (filters.category && product.category !== filters.category) {
            return false;
        }

        if (filters.brand && product.brand !== filters.brand) {
            return false;
        }

        if (filters.color && !product.colors.includes(filters.color)) {
            return false;
        }

        if (filters.minPrice && product.base_cost < filters.minPrice) {
            return false;
        }

        if (filters.maxPrice && product.base_cost > filters.maxPrice) {
            return false;
        }

        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            return (
                product.title.toLowerCase().includes(searchLower) ||
                product.brand.toLowerCase().includes(searchLower) ||
                (product.description && product.description.toLowerCase().includes(searchLower))
            );
        }

        return true;
    });
};

/**
 * Sorts base products by specified criteria
 * @param products - Array of base products
 * @param sortBy - Sort criteria
 * @param order - Sort order
 * @returns Sorted products array
 */
export const sortBaseProducts = (
    products: any[],
    sortBy: 'title' | 'brand' | 'base_cost' | 'created_at',
    order: 'asc' | 'desc' = 'asc'
): any[] => {
    return [...products].sort((a, b) => {
        let valueA = a[sortBy];
        let valueB = b[sortBy];

        if (typeof valueA === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }

        if (valueA < valueB) {
            return order === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return order === 'asc' ? 1 : -1;
        }
        return 0;
    });
};

/**
 * Groups base products by category
 * @param products - Array of base products
 * @returns Object with categories as keys and product arrays as values
 */
export const groupProductsByCategory = (products: any[]): Record<string, any[]> => {
    return products.reduce((groups, product) => {
        const category = product.category || 'Uncategorized';
        if (!groups[category]) {
            groups[category] = [];
        }
        groups[category].push(product);
        return groups;
    }, {} as Record<string, any[]>);
};
